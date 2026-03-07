import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { DeletePageButton } from "./delete-button"

async function getPages() {
  const supabase = await createClient()
  const { data: pages, error } = await supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching pages:", error)
    return []
  }
  return pages || []
}

export default async function PagesListPage() {
  const pages = await getPages()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sayfalar</h1>
          <p className="text-muted-foreground mt-1">
            Site sayfalarını yönetin
          </p>
        </div>
        <Link href="/admin/sayfalar/yeni">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Sayfa
          </Button>
        </Link>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Henüz sayfa oluşturulmamış</p>
            <Link href="/admin/sayfalar/yeni">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                İlk Sayfanızı Oluşturun
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription className="mt-1">
                      /{page.slug}
                    </CardDescription>
                  </div>
                  <Badge variant={page.status === "published" ? "default" : "secondary"}>
                    {page.status === "published" ? "Yayında" : "Taslak"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/sayfalar/${page.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Button>
                  </Link>
                  {page.status === "published" && (
                    <Link href={`/${page.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Görüntüle
                      </Button>
                    </Link>
                  )}
                  <DeletePageButton pageId={page.id} pageTitle={page.title} />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Oluşturulma: {new Date(page.created_at).toLocaleDateString("tr-TR")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
