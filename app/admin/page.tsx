"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Image, Menu, Settings } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    media: 0,
    menus: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const [pagesRes, mediaRes, menusRes] = await Promise.all([
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("media").select("id", { count: "exact", head: true }),
        supabase.from("menus").select("id", { count: "exact", head: true }),
      ])

      setStats({
        pages: pagesRes.count || 0,
        media: mediaRes.count || 0,
        menus: menusRes.count || 0,
      })
    }

    fetchStats()
  }, [supabase])

  const cards = [
    { title: "Sayfalar", value: stats.pages, icon: FileText, href: "/admin/sayfalar", color: "bg-blue-500" },
    { title: "Medya", value: stats.media, icon: Image, href: "/admin/medya", color: "bg-green-500" },
    { title: "Menuler", value: stats.menus, icon: Menu, href: "/admin/menuler", color: "bg-orange-500" },
    { title: "Ayarlar", value: "-", icon: Settings, href: "/admin/ayarlar", color: "bg-purple-500" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">ModulerStand yonetim paneline hos geldiniz</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hizli Erisim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link 
              href="/admin/sayfalar/yeni" 
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              + Yeni Sayfa Olustur
            </Link>
            <Link 
              href="/admin/medya" 
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              + Resim Yukle
            </Link>
            <Link 
              href="/admin/menuler" 
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              + Menu Duzenle
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Site Adi:</span>
              <span className="font-medium">ModulerStand</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Domain:</span>
              <span className="font-medium">modulerstand.com.tr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefon:</span>
              <span className="font-medium">0531 571 33 33</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
