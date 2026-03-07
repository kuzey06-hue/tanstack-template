"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Globe, Phone, MapPin, Mail, Search } from "lucide-react"
import { MediaPicker } from "@/components/admin/media-picker"

interface Settings {
  site_title: string
  site_description: string
  site_logo: string
  site_favicon: string
  phone: string
  whatsapp: string
  email: string
  address: string
  google_maps_embed: string
  facebook_url: string
  instagram_url: string
  twitter_url: string
  linkedin_url: string
  youtube_url: string
  // SEO
  default_seo_title: string
  default_seo_description: string
  default_seo_keywords: string
  og_image: string
  google_analytics_id: string
  // Footer
  footer_text: string
  copyright_text: string
}

const defaultSettings: Settings = {
  site_title: "ModulerStand",
  site_description: "Modüler Fuar Standları ve LED Işıklı Kutular",
  site_logo: "",
  site_favicon: "",
  phone: "0531 571 33 33",
  whatsapp: "905315713333",
  email: "info@modulerstand.com.tr",
  address: "Zübeyde Hanım Mah., Kazım Karabekir Cad. No:91/80 Altındağ / Ankara",
  google_maps_embed: "",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
  linkedin_url: "",
  youtube_url: "",
  default_seo_title: "ModulerStand | Modüler Fuar Standları ve LED Işıklı Kutular",
  default_seo_description: "Türkiye'nin lider modüler fuar standı, LED ışıklı kutu ve tekstil germe sistemleri üreticisi.",
  default_seo_keywords: "modüler stand, fuar standı, LED ışıklı kutu, tekstil germe sistemi",
  og_image: "",
  google_analytics_id: "",
  footer_text: "",
  copyright_text: "© 2024 ModulerStand. Tüm hakları saklıdır.",
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")

    if (!error && data) {
      const settingsObj = { ...defaultSettings }
      data.forEach((item: { setting_key: string; setting_value: string }) => {
        if (item.setting_key in settingsObj) {
          (settingsObj as Record<string, string>)[item.setting_key] = item.setting_value
        }
      })
      setSettings(settingsObj)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    try {
      // Upsert each setting
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from("site_settings")
          .upsert(
            { setting_key: key, setting_value: value, updated_at: new Date().toISOString() },
            { onConflict: "setting_key" }
          )
      }
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Error saving settings:", err)
      alert("Ayarlar kaydedilirken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Site Ayarları</h1>
          <p className="text-muted-foreground mt-1">
            Genel site ayarlarını düzenleyin
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Kaydet
        </Button>
      </div>

      {success && (
        <Alert>
          <AlertDescription>Ayarlar başarıyla kaydedildi.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="h-4 w-4 mr-2" />
            İletişim
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social">
            Sosyal Medya
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Bilgileri</CardTitle>
              <CardDescription>Temel site bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Adı</Label>
                <Input
                  id="site_title"
                  value={settings.site_title}
                  onChange={(e) => updateSetting("site_title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Açıklaması</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => updateSetting("site_description", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Site Logosu</Label>
                  <MediaPicker
                    value={settings.site_logo}
                    onChange={(url) => updateSetting("site_logo", url)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <MediaPicker
                    value={settings.site_favicon}
                    onChange={(url) => updateSetting("site_favicon", url)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyright_text">Telif Hakkı Metni</Label>
                <Input
                  id="copyright_text"
                  value={settings.copyright_text}
                  onChange={(e) => updateSetting("copyright_text", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Ek Metin</Label>
                <Textarea
                  id="footer_text"
                  value={settings.footer_text}
                  onChange={(e) => updateSetting("footer_text", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
              <CardDescription>Firma iletişim bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => updateSetting("phone", e.target.value)}
                    placeholder="0531 571 33 33"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (Ülke kodu ile)</Label>
                  <Input
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => updateSetting("whatsapp", e.target.value)}
                    placeholder="905315713333"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Adres
                </Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => updateSetting("address", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_maps_embed">Google Maps Embed Kodu</Label>
                <Textarea
                  id="google_maps_embed"
                  value={settings.google_maps_embed}
                  onChange={(e) => updateSetting("google_maps_embed", e.target.value)}
                  placeholder='<iframe src="..." ...></iframe>'
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>Varsayılan SEO meta etiketlerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default_seo_title">Varsayılan SEO Başlığı</Label>
                <Input
                  id="default_seo_title"
                  value={settings.default_seo_title}
                  onChange={(e) => updateSetting("default_seo_title", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.default_seo_title.length}/60 karakter
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_seo_description">Varsayılan Meta Açıklama</Label>
                <Textarea
                  id="default_seo_description"
                  value={settings.default_seo_description}
                  onChange={(e) => updateSetting("default_seo_description", e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.default_seo_description.length}/160 karakter
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_seo_keywords">Varsayılan Anahtar Kelimeler</Label>
                <Input
                  id="default_seo_keywords"
                  value={settings.default_seo_keywords}
                  onChange={(e) => updateSetting("default_seo_keywords", e.target.value)}
                  placeholder="anahtar, kelime, örnek"
                />
              </div>

              <div className="space-y-2">
                <Label>Varsayılan Open Graph Görseli</Label>
                <MediaPicker
                  value={settings.og_image}
                  onChange={(url) => updateSetting("og_image", url)}
                />
                <p className="text-xs text-muted-foreground">
                  Sosyal medyada paylaşıldığında görünecek görsel (önerilen: 1200x630)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  value={settings.google_analytics_id}
                  onChange={(e) => updateSetting("google_analytics_id", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Linkleri</CardTitle>
              <CardDescription>Sosyal medya hesap linklerinizi ekleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook</Label>
                <Input
                  id="facebook_url"
                  value={settings.facebook_url}
                  onChange={(e) => updateSetting("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram</Label>
                <Input
                  id="instagram_url"
                  value={settings.instagram_url}
                  onChange={(e) => updateSetting("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_url">Twitter / X</Label>
                <Input
                  id="twitter_url"
                  value={settings.twitter_url}
                  onChange={(e) => updateSetting("twitter_url", e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn</Label>
                <Input
                  id="linkedin_url"
                  value={settings.linkedin_url}
                  onChange={(e) => updateSetting("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube_url">YouTube</Label>
                <Input
                  id="youtube_url"
                  value={settings.youtube_url}
                  onChange={(e) => updateSetting("youtube_url", e.target.value)}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
