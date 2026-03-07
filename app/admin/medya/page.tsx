"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Upload, Loader2, Trash2, Copy, Check, ImageIcon } from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: string
  filename: string
  url: string
  alt_text: string
  mime_type: string
  size_bytes: number
  created_at: string
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [deleteMedia, setDeleteMedia] = useState<MediaItem | null>(null)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setMedia(data)
    }
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum açmanız gerekiyor")

      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `uploads/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file)

        if (uploadError) {
          console.error("Upload error:", uploadError)
          continue
        }

        const { data: { publicUrl } } = supabase.storage
          .from("media")
          .getPublicUrl(filePath)

        await supabase.from("media").insert({
          filename: file.name,
          url: publicUrl,
          alt_text: file.name.split(".")[0],
          mime_type: file.type,
          size_bytes: file.size,
          user_id: user.id,
        })
      }

      await fetchMedia()
    } catch (err) {
      console.error("Upload error:", err)
      alert("Yükleme sırasında bir hata oluştu")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteMedia) return

    try {
      // Extract file path from URL
      const urlParts = deleteMedia.url.split("/storage/v1/object/public/media/")
      if (urlParts.length > 1) {
        await supabase.storage.from("media").remove([urlParts[1]])
      }

      await supabase.from("media").delete().eq("id", deleteMedia.id)
      await fetchMedia()
      setDeleteMedia(null)
      setSelectedMedia(null)
    } catch (err) {
      console.error("Delete error:", err)
      alert("Silme sırasında bir hata oluştu")
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medya Kütüphanesi</h1>
          <p className="text-muted-foreground mt-1">
            Görsellerinizi yönetin
          </p>
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="media-upload-input"
          />
          <Label htmlFor="media-upload-input">
            <Button asChild disabled={uploading}>
              <span>
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Görsel Yükle
              </span>
            </Button>
          </Label>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : media.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Henüz görsel yüklenmemiş</p>
            <Label htmlFor="media-upload-input">
              <Button asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  İlk Görselinizi Yükleyin
                </span>
              </Button>
            </Label>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="relative aspect-square overflow-hidden rounded-md border hover:border-primary transition-colors group"
            >
              <Image
                src={item.url}
                alt={item.alt_text}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs truncate px-2">
                  {item.filename}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Görsel Detayları</DialogTitle>
            <DialogDescription>
              Görsel bilgilerini görüntüleyin ve yönetin
            </DialogDescription>
          </DialogHeader>

          {selectedMedia && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-md border">
                <Image
                  src={selectedMedia.url}
                  alt={selectedMedia.alt_text}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Dosya Adı</Label>
                  <p className="font-medium truncate">{selectedMedia.filename}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Boyut</Label>
                  <p className="font-medium">{formatFileSize(selectedMedia.size_bytes)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tür</Label>
                  <p className="font-medium">{selectedMedia.mime_type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Yüklenme Tarihi</Label>
                  <p className="font-medium">
                    {new Date(selectedMedia.created_at).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={selectedMedia.url} readOnly className="text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(selectedMedia.url)}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setDeleteMedia(selectedMedia)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Görseli Sil
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteMedia} onOpenChange={() => setDeleteMedia(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Görseli Sil</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteMedia?.filename}&quot; görselini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
