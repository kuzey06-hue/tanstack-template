"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image as ImageIcon, Upload, X, Loader2, Check } from "lucide-react"
import Image from "next/image"

interface MediaPickerProps {
  value: string
  onChange: (url: string) => void
}

interface MediaItem {
  id: string
  filename: string
  url: string
  alt_text: string
  created_at: string
}

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState(value)
  const supabase = createClient()

  useEffect(() => {
    if (open) {
      fetchMedia()
    }
  }, [open])

  const fetchMedia = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (!error && data) {
      setMedia(data)
    }
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum açmanız gerekiyor")

      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath)

      // Save to media table
      const { error: dbError } = await supabase.from("media").insert({
        filename: file.name,
        url: publicUrl,
        alt_text: file.name.split(".")[0],
        mime_type: file.type,
        size_bytes: file.size,
        user_id: user.id,
      })

      if (dbError) throw dbError

      // Refresh media list
      await fetchMedia()
      
      // Select the newly uploaded file
      setSelectedUrl(publicUrl)
    } catch (err) {
      console.error("Upload error:", err)
      alert("Yükleme sırasında bir hata oluştu")
    } finally {
      setUploading(false)
    }
  }

  const handleSelect = () => {
    onChange(selectedUrl)
    setOpen(false)
  }

  const handleRemove = () => {
    onChange("")
    setSelectedUrl("")
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <div className="relative aspect-video w-full overflow-hidden rounded-md border">
            <Image
              src={value}
              alt="Seçili görsel"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="aspect-video w-full rounded-md border-2 border-dashed border-border flex items-center justify-center bg-secondary/50">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Görsel seçilmedi</p>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="w-full">
            <ImageIcon className="h-4 w-4 mr-2" />
            {value ? "Görseli Değiştir" : "Görsel Seç"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Medya Kütüphanesi</DialogTitle>
            <DialogDescription>
              Mevcut görseller arasından seçin veya yeni görsel yükleyin
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
            <TabsList>
              <TabsTrigger value="library">Kütüphane</TabsTrigger>
              <TabsTrigger value="upload">Yükle</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : media.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-2" />
                  <p>Henüz görsel yüklenmemiş</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {media.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedUrl(item.url)}
                      className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                        selectedUrl === item.url
                          ? "border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={item.url}
                        alt={item.alt_text}
                        fill
                        className="object-cover"
                      />
                      {selectedUrl === item.url && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="flex-1">
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-md">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                  id="media-upload"
                />
                <Label
                  htmlFor="media-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  {uploading ? (
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-2" />
                  ) : (
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Yükleniyor..." : "Görsel yüklemek için tıklayın"}
                  </span>
                </Label>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button type="button" onClick={handleSelect} disabled={!selectedUrl}>
              Seç
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
