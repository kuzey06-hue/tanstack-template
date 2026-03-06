import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Lightbulb, Layers, Maximize, Printer, Flag, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Ürünler",
  description: "ModulerStand ürün kataloğu - LED ışıklı kutular, modüler standlar, pop-up sistemler, tekstil germe sistemleri ve roll-up bannerlar. Profesyonel fuar ve sergi ekipmanları.",
  keywords: ["LED ışıklı kutu", "modüler stand", "pop-up stand", "tekstil germe", "roll-up banner", "fuar standı"],
}

const categories = [
  {
    title: "LED Işıklı Kutular",
    slug: "led-isikli-kutular",
    description: "Modüler LED ışıklı kutu sistemleri. Duvar tipi, ayaklı ve asılı modeller. Yüksek parlaklık ve enerji verimliliği.",
    icon: Lightbulb,
    features: [
      "120mm, 85mm ve 60mm profil seçenekleri",
      "Alüminyum ve PVC çerçeve",
      "Duvar montajı ve ayaklı modeller",
      "Kolay grafik değişimi",
      "LED şerit aydınlatma",
      "Özel boyut üretimi",
    ],
    products: ["Duvar Tipi Işıklı Kutu", "Ayaklı Işıklı Kutu", "Çift Taraflı Işıklı Kutu", "Asılı Işıklı Kutu"],
  },
  {
    title: "Modüler Standlar",
    slug: "moduler-standlar",
    description: "Taşınabilir ve kurulumu kolay modüler fuar standları. Farklı boyut ve konfigürasyon seçenekleri.",
    icon: Layers,
    features: [
      "Aletsiz kolay kurulum",
      "Modüler bağlantı sistemi",
      "Farklı boyut kombinasyonları",
      "Tekrar kullanılabilir yapı",
      "Taşıma çantası dahil",
      "10+ yıl kullanım ömrü",
    ],
    products: ["3x3m Stand Kit", "3x2m Stand Kit", "L Tipi Stand", "U Tipi Stand"],
  },
  {
    title: "Pop-Up Sistemler",
    slug: "pop-up-sistemler",
    description: "Hızlı kurulum pop-up stand ve backdrop çözümleri. 5 dakikada kurulum, manyetik bağlantı sistemi.",
    icon: Maximize,
    features: [
      "5 dakikada kurulum",
      "Manyetik grafik bağlantısı",
      "Cırtlı ve kancalı modeller",
      "Alüminyum çerçeve",
      "Taşıma çantası dahil",
      "Işıklı ve ışıksız seçenekler",
    ],
    products: ["Manyetik Pop-Up", "Cırtlı Pop-Up", "Kancalı Pop-Up", "Işıklı Pop-Up"],
  },
  {
    title: "Tekstil Germe Sistemleri",
    slug: "tekstil-germe",
    description: "SEG (Silikon Edge Graphics) tekstil germe çerçeve sistemleri. Premium görünüm, kolay değişim.",
    icon: Box,
    features: [
      "SEG silikon kenar teknolojisi",
      "Yıkanabilir tekstil grafikler",
      "Gergin ve düz yüzey",
      "Alüminyum profil sistemi",
      "Duvar ve ayaklı modeller",
      "Hızlı grafik değişimi",
    ],
    products: ["Duvar Germe Çerçevesi", "Ayaklı Germe Sistemi", "Tavan Asma Sistemi", "Köşe Germe Sistemi"],
  },
  {
    title: "Roll-Up Banner",
    slug: "roll-up-banner",
    description: "Taşınabilir roll-up ve banner standları. Ekonomik ve pratik çözümler, hızlı baskı ve teslimat.",
    icon: Flag,
    features: [
      "85cm ve 100cm genişlik",
      "Alüminyum ayak sistemi",
      "Taşıma çantası dahil",
      "Değiştirilebilir baskı",
      "Çift taraflı modeller",
      "Ekonomik fiyatlar",
    ],
    products: ["Ekonomik Roll-Up", "Premium Roll-Up", "Çift Taraflı Roll-Up", "Outdoor Roll-Up"],
  },
  {
    title: "Baskı Hizmetleri",
    slug: "baski-hizmetleri",
    description: "Tekstil ve dijital baskı çözümleri. Yüksek çözünürlük, canlı renkler, hızlı teslimat.",
    icon: Printer,
    features: [
      "Yüksek çözünürlük baskı",
      "Tekstil ve vinil seçenekleri",
      "UV dayanıklı mürekkepler",
      "Hızlı üretim ve teslimat",
      "Renk kalibrasyonu",
      "Özel kesim hizmeti",
    ],
    products: ["Tekstil Baskı", "Vinil Baskı", "Backlit Baskı", "Mesh Baskı"],
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Ürün Kataloğu
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Profesyonel Sergi Çözümleri
            </h1>
            <p className="text-lg text-muted-foreground">
              Fuar, etkinlik ve perakende alanları için geniş ürün yelpazemiz ile 
              markanızı en iyi şekilde temsil ediyoruz. Tüm ürünlerimiz yüksek kalite 
              standartlarında üretilmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {categories.map((category, index) => (
              <div 
                key={category.slug}
                id={category.slug}
                className="scroll-mt-24"
              >
                <div className={`flex flex-col gap-8 lg:flex-row lg:gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-center">
                          <category.icon className="mx-auto mb-4 h-16 w-16 text-primary" />
                          <p className="text-xl font-semibold text-foreground">{category.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full space-y-6 lg:w-1/2">
                    <div>
                      <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold text-foreground">Özellikler</h3>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {category.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold text-foreground">Ürünler</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.products.map((product) => (
                          <span 
                            key={product}
                            className="rounded-full border border-border bg-card px-3 py-1 text-sm"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button asChild className="gap-2">
                        <Link href={`/urunler/${category.slug}`}>
                          Detaylı İncele
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/iletisim">
                          Teklif Al
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {index < categories.length - 1 && (
                  <hr className="mt-16 border-border/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">
            Aradığınızı Bulamadınız mı?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Özel üretim ve tasarım hizmetlerimiz hakkında bilgi almak için bizimle iletişime geçin.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/iletisim">
              Bizimle İletişime Geçin
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
