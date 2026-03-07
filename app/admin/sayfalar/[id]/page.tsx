"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Save, Search } from "lucide-react"
import Link from "next/link"
import { MediaPicker } from "@/components/admin/media-picker"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

interface PageData {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  status: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  og_image: string
}

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("draft")
  
  // SEO fields
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [ogImage, setOgImage] = useState("")

  useEffect(() => {
    const fetchPage = async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", pageId)
        .single()

      if (error) {
        setError("Sayfa bulunamadı")
      } else if (data) {
        setTitle(data.title)
        setSlug(data.slug)
        setContent(data.content || "")
        setExcerpt(data.excerpt || "")
        setFeaturedImage(data.featured_image || "")
        setStatus(data.status)
        setSeoTitle(data.seo_title || "")
        setSeoDescription(data.seo_description || "")
        setSeoKeywords(data.seo_keywords || "")
        setOgImage(data.og_image || "")
      }
      setFetching(false)
    }

    fetchPage()
  }, [pageId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { error } = await supabase
        .from("pages")
        .update({
          title,
          slug,
          content,
          excerpt,
          featured_image: featuredImage,
          status,
          seo_title: seoTitle || title,
          seo_description: seoDescription || excerpt,
          seo_keywords: seoKeywords,
          og_image: ogImage || featuredImage,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pageId)

      if (error) throw error
      
      router.push("/admin/sayfalar")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/sayfalar">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sayfayı Düzenle</h1>
          <p className="text-muted-foreground mt-1">
            {title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="seo">
              <Search className="h-4 w-4 mr-2" />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sayfa Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Sayfa Başlığı</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Sayfa başlığını girin"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">/</span>
                        <Input
                          id="slug"
                          value={slug}
                          onChange={(e) => setSlug(slugify(e.target.value))}
                          placeholder="sayfa-url"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Özet</Label>
                      <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Kısa bir özet yazın"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">İçerik</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Sayfa içeriğini yazın (HTML desteklenir)"
                        rows={12}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Yayın Durumu</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Durum</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Taslak</SelectItem>
                          <SelectItem value="published">Yayında</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="h-4 w-4 mr-2" />
                      Güncelle
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Öne Çıkan Görsel</CardTitle>
                    <CardDescription>Sayfa için ana görsel seçin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MediaPicker
                      value={featuredImage}
                      onChange={setFeaturedImage}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Ayarları</CardTitle>
                <CardDescription>
                  Arama motoru optimizasyonu için meta etiketleri düzenleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Başlığı</Label>
                  <Input
                    id="seoTitle"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title || "Sayfa başlığı kullanılacak"}
                  />
                  <p className="text-xs text-muted-foreground">
                    {(seoTitle || title).length}/60 karakter (önerilen: 50-60)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta Açıklama</Label>
                  <Textarea
                    id="seoDescription"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder={excerpt || "Sayfa özeti kullanılacak"}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {(seoDescription || excerpt).length}/160 karakter (önerilen: 150-160)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoKeywords">Anahtar Kelimeler</Label>
                  <Input
                    id="seoKeywords"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="anahtar, kelime, örnek"
                  />
                  <p className="text-xs text-muted-foreground">
                    Virgülle ayırarak yazın
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Open Graph Görseli</Label>
                  <MediaPicker
                    value={ogImage}
                    onChange={setOgImage}
                  />
                  <p className="text-xs text-muted-foreground">
                    Sosyal medyada paylaşıldığında görünecek görsel (önerilen: 1200x630)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
