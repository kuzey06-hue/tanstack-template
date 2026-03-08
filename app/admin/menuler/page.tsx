"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Loader2, GripVertical, Save } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Menu {
  id: string
  name: string
  location: string
}

interface MenuItem {
  id: string
  menu_id: string
  label: string
  url: string
  sort_order: number
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newMenuName, setNewMenuName] = useState("")
  const [newMenuLocation, setNewMenuLocation] = useState("header")
  const supabase = createClient()

  const fetchMenus = async () => {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .order("created_at", { ascending: true })

    if (!error && data) {
      setMenus(data)
      if (data.length > 0 && !selectedMenu) {
        setSelectedMenu(data[0].id)
      }
    }
    setLoading(false)
  }

  const fetchMenuItems = async (menuId: string) => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("menu_id", menuId)
      .order("sort_order", { ascending: true })

    if (!error && data) {
      setMenuItems(data)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  useEffect(() => {
    if (selectedMenu) {
      fetchMenuItems(selectedMenu)
    }
  }, [selectedMenu])

  const createMenu = async () => {
    if (!newMenuName.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("menus")
      .insert({
        name: newMenuName,
        location: newMenuLocation,
        user_id: user.id,
      })
      .select()
      .single()

    if (!error && data) {
      setMenus([...menus, data])
      setSelectedMenu(data.id)
      setNewMenuName("")
    }
  }

  const deleteMenu = async (id: string) => {
    await supabase.from("menus").delete().eq("id", id)
    setMenus(menus.filter((m) => m.id !== id))
    if (selectedMenu === id) {
      setSelectedMenu(menus[0]?.id || null)
    }
  }

  const addMenuItem = async () => {
    if (!selectedMenu) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const newItem = {
      menu_id: selectedMenu,
      label: "Yeni Menu Ogesi",
      url: "/",
      sort_order: menuItems.length,
      user_id: user.id,
    }

    const { data, error } = await supabase
      .from("menu_items")
      .insert(newItem)
      .select()
      .single()

    if (!error && data) {
      setMenuItems([...menuItems, data])
    }
  }

  const updateMenuItem = (id: string, field: string, value: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const deleteMenuItem = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id)
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const saveMenuItems = async () => {
    setSaving(true)

    for (const item of menuItems) {
      await supabase
        .from("menu_items")
        .update({
          label: item.label,
          url: item.url,
          sort_order: item.sort_order,
        })
        .eq("id", item.id)
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Menuler</h1>
        <p className="text-muted-foreground mt-1">Site menulerinizi yonetin</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Menu Listesi */}
        <Card>
          <CardHeader>
            <CardTitle>Menuler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMenu === menu.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setSelectedMenu(menu.id)}
              >
                <div>
                  <p className="font-medium">{menu.name}</p>
                  <p className={`text-xs ${selectedMenu === menu.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {menu.location === "header" ? "Header" : "Footer"}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className={`h-4 w-4 ${selectedMenu === menu.id ? "text-primary-foreground" : "text-destructive"}`} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Menuyu Sil</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu menuyu ve tum ogelerini silmek istediginize emin misiniz?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Iptal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMenu(menu.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}

            <div className="pt-4 border-t space-y-3">
              <div className="space-y-2">
                <Label>Yeni Menu</Label>
                <Input
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="Menu adi"
                />
              </div>
              <div className="space-y-2">
                <Label>Konum</Label>
                <Select value={newMenuLocation} onValueChange={setNewMenuLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={createMenu} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Menu Olustur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Ogeleri */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Menu Ogeleri</CardTitle>
              {selectedMenu && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addMenuItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Oge Ekle
                  </Button>
                  <Button onClick={saveMenuItems} disabled={saving}>
                    {saving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Kaydet
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!selectedMenu ? (
                <p className="text-center text-muted-foreground py-8">
                  Duzenlemek icin bir menu secin
                </p>
              ) : menuItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Bu menude henuz oge yok
                </p>
              ) : (
                <div className="space-y-3">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="flex-1 grid gap-3 sm:grid-cols-2">
                        <Input
                          value={item.label}
                          onChange={(e) => updateMenuItem(item.id, "label", e.target.value)}
                          placeholder="Etiket"
                        />
                        <Input
                          value={item.url}
                          onChange={(e) => updateMenuItem(item.id, "url", e.target.value)}
                          placeholder="URL"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMenuItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
