import Link from "next/link"
import { ArrowRight, Lightbulb, Layers, Maximize, Printer, Flag, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
  {
    title: "LED Işıklı Kutular",
    description: "Modüler LED ışıklı kutu sistemleri. Duvar tipi, ayaklı ve asılı modeller.",
    href: "/urunler/led-isikli-kutular",
    icon: Lightbulb,
    features: ["Yüksek parlaklık", "Enerji tasarrufu", "Kolay grafik değişimi"],
  },
  {
    title: "Modüler Standlar",
    description: "Taşınabilir ve kurulumu kolay modüler fuar standları. Farklı boyut seçenekleri.",
    href: "/urunler/moduler-standlar",
    icon: Layers,
    features: ["Aletsis kurulum", "Modüler yapı", "Tekrar kullanılabilir"],
  },
  {
    title: "Pop-Up Sistemler",
    description: "Hızlı kurulum pop-up stand ve backdrop çözümleri. 5 dakikada kurulum.",
    href: "/urunler/pop-up-sistemler",
    icon: Maximize,
    features: ["5 dk kurulum", "Taşıma çantası dahil", "Manyetik bağlantı"],
  },
  {
    title: "Tekstil Germe Sistemleri",
    description: "SEG tekstil germe çerçeve sistemleri. Premium görünüm, kolay değişim.",
    href: "/urunler/tekstil-germe",
    icon: Box,
    features: ["SEG teknolojisi", "Yıkanabilir kumaş", "Profesyonel görünüm"],
  },
  {
    title: "Roll-Up Banner",
    description: "Taşınabilir roll-up ve banner standları. Ekonomik ve pratik çözümler.",
    href: "/urunler/roll-up-banner",
    icon: Flag,
    features: ["Kolay taşıma", "Dayanıklı yapı", "Hızlı baskı"],
  },
  {
    title: "Baskı Hizmetleri",
    description: "Tekstil ve dijital baskı çözümleri. Yüksek çözünürlük, canlı renkler.",
    href: "/urunler/baski-hizmetleri",
    icon: Printer,
    features: ["Yüksek çözünürlük", "Hızlı teslimat", "Uygun fiyat"],
  },
]

export function ProductsSection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Ürün Yelpazemiz
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Profesyonel Sergi Çözümleri
          </h2>
          <p className="text-lg text-muted-foreground">
            Fuar, etkinlik ve perakende alanları için geniş ürün yelpazemiz ile 
            markanızı en iyi şekilde temsil ediyoruz.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.title} 
              className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <product.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={product.href}>
                    Detayları Gör
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/urunler">
              Tüm Ürünleri Görüntüle
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
