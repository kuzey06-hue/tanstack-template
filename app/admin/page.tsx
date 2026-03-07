import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Menu, Image, Settings } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const supabase = await createClient()
  
  const [pagesResult, menusResult, mediaResult] = await Promise.all([
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase.from("menus").select("id", { count: "exact", head: true }),
    supabase.from("media").select("id", { count: "exact", head: true }),
  ])

  return {
    pages: pagesResult.count || 0,
    menus: menusResult.count || 0,
    media: mediaResult.count || 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: "Sayfalar",
      value: stats.pages,
      description: "Toplam sayfa sayısı",
      icon: FileText,
      href: "/admin/sayfalar",
      color: "text-blue-500",
    },
    {
      title: "Menüler",
      value: stats.menus,
      description: "Toplam menü sayısı",
      icon: Menu,
      href: "/admin/menuler",
      color: "text-green-500",
    },
    {
      title: "Medya",
      value: stats.media,
      description: "Yüklenen dosya sayısı",
      icon: Image,
      href: "/admin/medya",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hoş Geldiniz</h1>
        <p className="text-muted-foreground mt-1">
          ModulerStand yönetim paneline hoş geldiniz. Buradan sitenizi yönetebilirsiniz.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <CardDescription>{stat.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Sık kullanılan işlemlere hızlı erişim</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/sayfalar/yeni"
              className="flex items-center gap-2 p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span>Yeni Sayfa Oluştur</span>
            </Link>
            <Link
              href="/admin/medya"
              className="flex items-center gap-2 p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Image className="h-5 w-5 text-primary" />
              <span>Görsel Yükle</span>
            </Link>
            <Link
              href="/admin/ayarlar"
              className="flex items-center gap-2 p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Settings className="h-5 w-5 text-primary" />
              <span>Site Ayarları</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Önizleme</CardTitle>
            <CardDescription>Sitenizin canlı halini görüntüleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 p-4 rounded-md border-2 border-dashed border-border hover:border-primary transition-colors"
            >
              <span className="text-muted-foreground">Siteyi Görüntüle</span>
              <span className="text-primary">→</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
