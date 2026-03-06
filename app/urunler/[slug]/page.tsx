import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Product data
const products: Record<string, {
  title: string
  description: string
  longDescription: string
  features: string[]
  specs: { label: string; value: string }[]
  variants: { name: string; description: string }[]
  applications: string[]
}> = {
  "led-isikli-kutular": {
    title: "LED Işıklı Kutular",
    description: "Modüler LED ışıklı kutu sistemleri ile markanızı parlak ve dikkat çekici şekilde sergileyin.",
    longDescription: "LED ışıklı kutularımız, modern alüminyum profil sistemleri ve yüksek verimli LED şerit aydınlatma ile üretilmektedir. Duvar montajı, ayaklı ve asılı modeller ile her mekana uygun çözümler sunuyoruz. Kolay grafik değişimi sayesinde kampanyalarınızı hızlıca güncelleyebilirsiniz.",
    features: [
      "Yüksek parlaklık LED aydınlatma",
      "Alüminyum ve PVC profil seçenekleri",
      "120mm, 85mm ve 60mm kalınlık",
      "Duvar montajı ve ayaklı modeller",
      "Kolay grafik değişimi",
      "Enerji tasarrufu",
      "10.000+ saat LED ömrü",
      "CE ve RoHS sertifikalı",
    ],
    specs: [
      { label: "Profil Kalınlığı", value: "60mm / 85mm / 120mm" },
      { label: "Malzeme", value: "Alüminyum / PVC" },
      { label: "Aydınlatma", value: "LED Şerit (6000K-6500K)" },
      { label: "Güç Tüketimi", value: "12W/m²" },
      { label: "Grafik Türü", value: "Tekstil / Backlit Film" },
      { label: "Maksimum Boyut", value: "3000x2000mm" },
    ],
    variants: [
      { name: "Duvar Tipi Işıklı Kutu", description: "Duvara monte edilen tek taraflı model" },
      { name: "Ayaklı Işıklı Kutu", description: "Ayaklı, bağımsız durabilen model" },
      { name: "Çift Taraflı Işıklı Kutu", description: "İki yüzlü aydınlatmalı model" },
      { name: "Asılı Işıklı Kutu", description: "Tavandan asılarak kullanılan model" },
    ],
    applications: ["Fuar standları", "Mağaza içi görsellik", "Resepsiyon alanları", "Showroom", "Alışveriş merkezleri"],
  },
  "moduler-standlar": {
    title: "Modüler Standlar",
    description: "Taşınabilir ve kurulumu kolay modüler fuar standları ile profesyonel bir görünüm elde edin.",
    longDescription: "Modüler stand sistemlerimiz, aletsiz kolay kurulum ve farklı konfigürasyon seçenekleri sunar. Alüminyum profil yapısı sayesinde hafif ve dayanıklıdır. Fuardan fuara taşınabilir ve farklı boyutlarda yeniden kurulabilir.",
    features: [
      "Aletsiz 15 dakikada kurulum",
      "Modüler bağlantı sistemi",
      "Farklı boyut kombinasyonları",
      "Tekrar kullanılabilir yapı",
      "Taşıma çantası dahil",
      "Alüminyum profil sistemi",
      "10+ yıl kullanım ömrü",
      "Grafik değişimi kolay",
    ],
    specs: [
      { label: "Profil Malzemesi", value: "Alüminyum Alaşım" },
      { label: "Bağlantı Sistemi", value: "Twist-Lock" },
      { label: "Panel Boyutu", value: "1000x2400mm standart" },
      { label: "Maksimum Yükseklik", value: "3000mm" },
      { label: "Taşıma", value: "Hardcase dahil" },
      { label: "Ağırlık", value: "3-5 kg/m²" },
    ],
    variants: [
      { name: "3x3m Stand Kit", description: "Standart fuar alanı için ideal" },
      { name: "3x2m Stand Kit", description: "Kompakt fuar alanları için" },
      { name: "L Tipi Stand", description: "Köşe konumları için ideal" },
      { name: "U Tipi Stand", description: "Üç taraflı sergiler için" },
    ],
    applications: ["Fuar katılımları", "Ürün lansmanları", "Kongre ve konferanslar", "Showroom", "Mağaza içi sergiler"],
  },
  "pop-up-sistemler": {
    title: "Pop-Up Sistemler",
    description: "5 dakikada kurulum imkanı sunan pop-up stand ve backdrop çözümleri.",
    longDescription: "Pop-up sistemlerimiz, manyetik, cırtlı ve kancalı bağlantı seçenekleri ile en hızlı kurulum süresini sunar. Tek kişi tarafından 5 dakikada kurulabilen sistemler, taşıma çantası ile birlikte gelir.",
    features: [
      "5 dakikada tek kişi kurulumu",
      "Manyetik grafik bağlantısı",
      "Accordeon açılış sistemi",
      "Alüminyum çerçeve",
      "Taşıma çantası dahil",
      "Işıklı ve ışıksız seçenekler",
      "Dayanıklı yapı",
      "Kompakt taşıma",
    ],
    specs: [
      { label: "Açılış Sistemi", value: "Accordeon / Katlanır" },
      { label: "Grafik Bağlantı", value: "Manyetik / Cırtlı / Kancalı" },
      { label: "Standart Boyutlar", value: "3x3, 3x4, 4x3, 4x4" },
      { label: "Malzeme", value: "Alüminyum Alaşım" },
      { label: "Aydınlatma", value: "Opsiyonel LED Spot" },
      { label: "Taşıma", value: "Tekerlekli Çanta" },
    ],
    variants: [
      { name: "Manyetik Pop-Up", description: "Manyetik bağlantılı grafik sistemi" },
      { name: "Cırtlı Pop-Up", description: "Velcro bağlantılı ekonomik model" },
      { name: "Kancalı Pop-Up", description: "Kancalı grafik sistemi" },
      { name: "Işıklı Pop-Up", description: "LED aydınlatmalı model" },
    ],
    applications: ["Roadshow etkinlikleri", "Ürün tanıtımları", "Basın toplantıları", "Fuar katılımları", "Mağaza içi kampanyalar"],
  },
  "tekstil-germe": {
    title: "Tekstil Germe Sistemleri",
    description: "SEG teknolojisi ile premium görünümlü tekstil germe sistemleri.",
    longDescription: "SEG (Silikon Edge Graphics) tekstil germe sistemlerimiz, silikon kenarlı tekstil grafikler ile mükemmel gerginlik ve düz yüzey sağlar. Yıkanabilir grafikler ve kolay değişim imkanı sunar.",
    features: [
      "SEG silikon kenar teknolojisi",
      "Yıkanabilir tekstil grafikler",
      "Gergin ve düz yüzey",
      "Alüminyum profil sistemi",
      "Duvar ve ayaklı modeller",
      "Hızlı grafik değişimi",
      "Işıklı seçenekler mevcut",
      "Premium görünüm",
    ],
    specs: [
      { label: "Profil Sistemi", value: "Alüminyum SEG Profil" },
      { label: "Grafik Türü", value: "Silikon Kenarlı Tekstil" },
      { label: "Baskı Çözünürlüğü", value: "720 dpi" },
      { label: "Kumaş Türü", value: "Polyester Streç" },
      { label: "Yıkanabilirlik", value: "30°C Makine Yıkama" },
      { label: "Maksimum Boyut", value: "5000x3000mm" },
    ],
    variants: [
      { name: "Duvar Germe Çerçevesi", description: "Duvara monte edilen model" },
      { name: "Ayaklı Germe Sistemi", description: "Bağımsız ayaklı model" },
      { name: "Tavan Asma Sistemi", description: "Tavandan asılan model" },
      { name: "Işıklı Germe Sistemi", description: "LED aydınlatmalı model" },
    ],
    applications: ["Fuar standları", "Mağaza dekorasyonu", "Ofis duvar kaplama", "Restoran ve kafeler", "Etkinlik backdrop"],
  },
  "roll-up-banner": {
    title: "Roll-Up Banner",
    description: "Taşınabilir ve ekonomik roll-up banner standları.",
    longDescription: "Roll-up banner standlarımız, ekonomik fiyatı ve kolay taşınabilirliği ile en popüler tanıtım materyallerindendir. Alüminyum ayak sistemi ve dayanıklı mekanizma ile uzun ömürlü kullanım sunar.",
    features: [
      "Ekonomik fiyat",
      "Kolay taşıma",
      "10 saniyede kurulum",
      "Alüminyum ayak sistemi",
      "Taşıma çantası dahil",
      "Değiştirilebilir grafik",
      "Çift taraflı modeller",
      "Outdoor seçenekler",
    ],
    specs: [
      { label: "Genişlik Seçenekleri", value: "80cm / 85cm / 100cm / 120cm" },
      { label: "Yükseklik", value: "200cm / 220cm" },
      { label: "Ayak Malzemesi", value: "Alüminyum" },
      { label: "Grafik Malzemesi", value: "PVC / PP Film" },
      { label: "Ağırlık", value: "2-4 kg" },
      { label: "Taşıma", value: "Kumaş veya Plastik Çanta" },
    ],
    variants: [
      { name: "Ekonomik Roll-Up", description: "Uygun fiyatlı standart model" },
      { name: "Premium Roll-Up", description: "Dayanıklı profesyonel model" },
      { name: "Çift Taraflı Roll-Up", description: "İki yönlü görsellik" },
      { name: "Outdoor Roll-Up", description: "Dış mekan kullanımına uygun" },
    ],
    applications: ["Mağaza girişleri", "Fuar alanları", "Resepsiyon", "Seminer ve konferanslar", "AVM etkinlikleri"],
  },
  "baski-hizmetleri": {
    title: "Baskı Hizmetleri",
    description: "Yüksek kaliteli tekstil ve dijital baskı hizmetleri.",
    longDescription: "Profesyonel baskı hizmetlerimiz ile grafiklerinizi en yüksek kalitede üretiyoruz. Tekstil, vinil ve backlit baskı seçenekleri ile her türlü ihtiyaca cevap veriyoruz.",
    features: [
      "720 dpi yüksek çözünürlük",
      "Tekstil ve vinil seçenekleri",
      "UV dayanıklı mürekkepler",
      "Hızlı üretim ve teslimat",
      "Renk kalibrasyonu",
      "Özel kesim hizmeti",
      "Backlit baskı",
      "Mesh baskı seçeneği",
    ],
    specs: [
      { label: "Baskı Çözünürlüğü", value: "720 dpi" },
      { label: "Maksimum Genişlik", value: "5000mm" },
      { label: "Tekstil Türleri", value: "Polyester, Streç, Blockout" },
      { label: "Vinil Türleri", value: "Mat, Parlak, Şeffaf" },
      { label: "Mürekkep", value: "UV / Solvent / Latex" },
      { label: "Üretim Süresi", value: "1-3 iş günü" },
    ],
    variants: [
      { name: "Tekstil Baskı", description: "Kumaş ve tekstil materyallere baskı" },
      { name: "Vinil Baskı", description: "PVC ve vinil materyallere baskı" },
      { name: "Backlit Baskı", description: "Işıklı kutular için şeffaf baskı" },
      { name: "Mesh Baskı", description: "Delikli baskı, rüzgar geçirgen" },
    ],
    applications: ["Fuar grafikleri", "Mağaza görselleri", "Dış mekan reklamları", "Araç giydirme", "Bina kaplama"],
  },
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products[slug]
  
  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    }
  }

  return {
    title: product.title,
    description: product.description,
    keywords: [product.title, "fuar standı", "sergi ekipmanı", "ModulerStand"],
  }
}

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products[slug]

  if (!product) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-foreground">Ürünler</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/20" />
                  <p className="text-2xl font-semibold text-foreground">{product.title}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  ModulerStand
                </p>
                <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {product.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.longDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Özellikler</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/iletisim">
                    Teklif Al
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="tel:+905315713333">
                    <Phone className="h-4 w-4" />
                    Hemen Ara
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
            Teknik Özellikler
          </h2>
          <div className="mx-auto max-w-2xl">
            <div className="divide-y rounded-xl border bg-card">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-6 py-4">
                  <span className="font-medium text-foreground">{spec.label}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
            Ürün Çeşitleri
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {product.variants.map((variant) => (
              <Card key={variant.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                  <CardDescription>{variant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/iletisim">Detay Al</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
            Kullanım Alanları
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {product.applications.map((app) => (
              <span 
                key={app}
                className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">
            {product.title} için Teklif Alın
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Ücretsiz danışmanlık ve fiyat teklifi almak için bizimle iletişime geçin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/iletisim">
                İletişime Geç
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/urunler">
                <ArrowLeft className="h-4 w-4" />
                Tüm Ürünler
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
