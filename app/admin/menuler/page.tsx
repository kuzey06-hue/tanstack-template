"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus, Loader2, Trash2, GripVertical, Edit, Save } from "lucide-react"

interface MenuItem {
  id: string
  menu_id: string
  label: string
  url: string
  sort_order: number
}

interface Menu {
  id: string
  name: string
  location: string
  menu_items?: MenuItem[]
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [newMenuName, setNewMenuName] = useState("")
  const [newMenuLocation, setNewMenuLocation] = useState("header")
  const [showNewMenu, setShowNewMenu] = useState(false)
  const [deleteMenu, setDeleteMenu] = useState<Menu | null>(null)
  const [newItemLabel, setNewItemLabel] = useState("")
  const [newItemUrl, setNewItemUrl] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("menus")
      .select("*, menu_items(*)")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setMenus(data)
      if (data.length > 0 && !selectedMenu) {
        setSelectedMenu(data[0])
        setMenuItems(data[0].menu_items?.sort((a: MenuItem, b: MenuItem) => a.sort_order - b.sort_order) || [])
      }
    }
    setLoading(false)
  }

  const handleSelectMenu = (menu: Menu) => {
    setSelectedMenu(menu)
    setMenuItems(menu.menu_items?.sort((a, b) => a.sort_order - b.sort_order) || [])
  }

  const handleCreateMenu = async () => {
    if (!newMenuName.trim()) return

    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum açmanız gerekiyor")

      const { error } = await supabase.from("menus").insert({
        name: newMenuName,
        location: newMenuLocation,
        user_id: user.id,
      })

      if (error) throw error

      setNewMenuName("")
      setNewMenuLocation("header")
      setShowNewMenu(false)
      await fetchMenus()
    } catch (err) {
      console.error("Error creating menu:", err)
      alert("Menü oluşturulurken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteMenu = async () => {
    if (!deleteMenu) return

    try {
      await supabase.from("menus").delete().eq("id", deleteMenu.id)
      if (selectedMenu?.id === deleteMenu.id) {
        setSelectedMenu(null)
        setMenuItems([])
      }
      setDeleteMenu(null)
      await fetchMenus()
    } catch (err) {
      console.error("Error deleting menu:", err)
      alert("Menü silinirken bir hata oluştu")
    }
  }

  const handleAddItem = async () => {
    if (!selectedMenu || !newItemLabel.trim() || !newItemUrl.trim()) return

    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Oturum açmanız gerekiyor")

      const newOrder = menuItems.length > 0 
        ? Math.max(...menuItems.map(i => i.sort_order)) + 1 
        : 0

      const { error } = await supabase.from("menu_items").insert({
        menu_id: selectedMenu.id,
        label: newItemLabel,
        url: newItemUrl,
        sort_order: newOrder,
        user_id: user.id,
      })

      if (error) throw error

      setNewItemLabel("")
      setNewItemUrl("")
      await fetchMenus()
      
      // Refresh selected menu items
      const updatedMenu = menus.find(m => m.id === selectedMenu.id)
      if (updatedMenu) {
        handleSelectMenu(updatedMenu)
      }
    } catch (err) {
      console.error("Error adding menu item:", err)
      alert("Menü öğesi eklenirken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    try {
      await supabase.from("menu_items").delete().eq("id", itemId)
      setMenuItems(prev => prev.filter(item => item.id !== itemId))
    } catch (err) {
      console.error("Error deleting menu item:", err)
      alert("Menü öğesi silinirken bir hata oluştu")
    }
  }

  const handleUpdateItem = async (itemId: string, label: string, url: string) => {
    try {
      await supabase.from("menu_items").update({ label, url }).eq("id", itemId)
      setMenuItems(prev => 
        prev.map(item => item.id === itemId ? { ...item, label, url } : item)
      )
    } catch (err) {
      console.error("Error updating menu item:", err)
    }
  }

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newItems = [...menuItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)

    // Update sort_order for all items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      sort_order: index,
    }))

    setMenuItems(updatedItems)

    // Update in database
    for (const item of updatedItems) {
      await supabase
        .from("menu_items")
        .update({ sort_order: item.sort_order })
        .eq("id", item.id)
    }
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
          <h1 className="text-3xl font-bold text-foreground">Menü Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Site menülerini düzenleyin
          </p>
        </div>
        <Dialog open={showNewMenu} onOpenChange={setShowNewMenu}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Menü
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Menü Oluştur</DialogTitle>
              <DialogDescription>
                Yeni bir navigasyon menüsü oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="menuName">Menü Adı</Label>
                <Input
                  id="menuName"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="Ana Menü"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menuLocation">Konum</Label>
                <Select value={newMenuLocation} onValueChange={setNewMenuLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header (Üst)</SelectItem>
                    <SelectItem value="footer">Footer (Alt)</SelectItem>
                    <SelectItem value="sidebar">Sidebar (Yan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateMenu} className="w-full" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Oluştur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Menu List */}
        <Card>
          <CardHeader>
            <CardTitle>Menüler</CardTitle>
            <CardDescription>Düzenlemek için bir menü seçin</CardDescription>
          </CardHeader>
          <CardContent>
            {menus.length === 0 ? (
              <p className="text-muted-foreground text-sm">Henüz menü oluşturulmamış</p>
            ) : (
              <div className="space-y-2">
                {menus.map((menu) => (
                  <div
                    key={menu.id}
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                      selectedMenu?.id === menu.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                    onClick={() => handleSelectMenu(menu)}
                  >
                    <div>
                      <p className="font-medium">{menu.name}</p>
                      <p className={`text-xs ${
                        selectedMenu?.id === menu.id 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {menu.location === "header" ? "Üst" : menu.location === "footer" ? "Alt" : "Yan"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteMenu(menu)
                      }}
                      className={selectedMenu?.id === menu.id ? "hover:bg-primary-foreground/10" : ""}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedMenu ? `${selectedMenu.name} Öğeleri` : "Menü Öğeleri"}
            </CardTitle>
            <CardDescription>
              Menü öğelerini ekleyin ve düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedMenu ? (
              <p className="text-muted-foreground text-sm">
                Düzenlemek için sol taraftan bir menü seçin
              </p>
            ) : (
              <div className="space-y-4">
                {/* Add new item */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Etiket"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                  />
                  <Input
                    placeholder="URL (örn: /hakkimizda)"
                    value={newItemUrl}
                    onChange={(e) => setNewItemUrl(e.target.value)}
                  />
                  <Button onClick={handleAddItem} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Menu items list */}
                {menuItems.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">
                    Bu menüde henüz öğe yok
                  </p>
                ) : (
                  <div className="space-y-2">
                    {menuItems.map((item, index) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onDelete={() => handleDeleteItem(item.id)}
                        onUpdate={(label, url) => handleUpdateItem(item.id, label, url)}
                        onMoveUp={index > 0 ? () => handleReorder(index, index - 1) : undefined}
                        onMoveDown={index < menuItems.length - 1 ? () => handleReorder(index, index + 1) : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Menu Confirmation */}
      <AlertDialog open={!!deleteMenu} onOpenChange={() => setDeleteMenu(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Menüyü Sil</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteMenu?.name}&quot; menüsünü ve tüm öğelerini silmek istediğinizden emin misiniz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMenu}
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

interface MenuItemRowProps {
  item: MenuItem
  onDelete: () => void
  onUpdate: (label: string, url: string) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

function MenuItemRow({ item, onDelete, onUpdate, onMoveUp, onMoveDown }: MenuItemRowProps) {
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(item.label)
  const [url, setUrl] = useState(item.url)

  const handleSave = () => {
    onUpdate(label, url)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 p-2 bg-secondary rounded-md">
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="flex-1"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSave}>
          <Save className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-secondary rounded-md">
      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
      <div className="flex-1">
        <p className="font-medium">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.url}</p>
      </div>
      <div className="flex gap-1">
        {onMoveUp && (
          <Button variant="ghost" size="icon" onClick={onMoveUp}>
            <span className="text-xs">↑</span>
          </Button>
        )}
        {onMoveDown && (
          <Button variant="ghost" size="icon" onClick={onMoveDown}>
            <span className="text-xs">↓</span>
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
