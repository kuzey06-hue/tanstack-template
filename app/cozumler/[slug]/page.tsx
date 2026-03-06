import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const solutions: Record<string, {
  title: string
  subtitle: string
  description: string
  features: string[]
  benefits: { title: string; description: string }[]
  products: { name: string; href: string }[]
  process: { step: number; title: string; description: string }[]
}> = {
  "fuar": {
    title: "Fuar Çözümleri",
    subtitle: "Profesyonel Fuar Standı Tasarım ve Kurulum",
    description: "Ulusal ve uluslararası fuarlarda markanızı en iyi şekilde temsil edecek profesyonel stand çözümleri sunuyoruz. Tasarımdan kuruluma, grafikten lojistiğe kadar tüm süreçleri yönetiyoruz.",
    features: [
      "Özel stand tasarımı",
      "Modüler stand sistemleri",
      "Grafik tasarım ve üretim",
      "Kurulum ve söküm hizmeti",
      "Lojistik destek",
      "Teknik danışmanlık",
      "LED aydınlatma çözümleri",
      "Mobilya ve aksesuar tedarik",
    ],
    benefits: [
      {
        title: "Anahtar Teslim Hizmet",
        description: "Tasarımdan kuruluma tüm süreçleri tek elden yönetiyoruz.",
      },
      {
        title: "Deneyimli Ekip",
        description: "Yüzlerce başarılı fuar projesinin deneyimini sunuyoruz.",
      },
      {
        title: "Modüler Sistemler",
        description: "Tekrar kullanılabilir modüler standlarla maliyet avantajı.",
      },
      {
        title: "Hızlı Kurulum",
        description: "Profesyonel ekibimizle hızlı ve sorunsuz kurulum.",
      },
    ],
    products: [
      { name: "Modüler Standlar", href: "/urunler/moduler-standlar" },
      { name: "LED Işıklı Kutular", href: "/urunler/led-isikli-kutular" },
      { name: "Pop-Up Sistemler", href: "/urunler/pop-up-sistemler" },
      { name: "Tekstil Germe Sistemleri", href: "/urunler/tekstil-germe" },
    ],
    process: [
      { step: 1, title: "İhtiyaç Analizi", description: "Fuar alanı, bütçe ve hedeflerinizi değerlendiriyoruz." },
      { step: 2, title: "Tasarım", description: "Markanıza özel 3D stand tasarımı hazırlıyoruz." },
      { step: 3, title: "Üretim", description: "Onaylanan tasarıma göre üretim gerçekleştiriyoruz." },
      { step: 4, title: "Kurulum", description: "Fuar alanında profesyonel kurulum yapıyoruz." },
    ],
  },
  "etkinlik": {
    title: "Etkinlik Çözümleri",
    subtitle: "Lansman, Konferans ve Özel Etkinlikler",
    description: "Ürün lansmanları, konferanslar, basın toplantıları ve özel etkinlikler için etkileyici dekorasyon ve stand çözümleri sunuyoruz.",
    features: [
      "Sahne ve backdrop tasarımı",
      "Basın duvarı sistemleri",
      "LED ekran entegrasyonu",
      "Özel üretim dekorasyon",
      "Mobilya kiralama",
      "Aydınlatma çözümleri",
      "Kurulum ve söküm",
      "Teknik destek",
    ],
    benefits: [
      {
        title: "Etkileyici Tasarımlar",
        description: "Markanızı ön plana çıkaran yaratıcı tasarımlar.",
      },
      {
        title: "Hızlı Teslimat",
        description: "Sıkı etkinlik takvimlerine uygun hızlı üretim.",
      },
      {
        title: "Tam Destek",
        description: "Etkinlik öncesi, sırası ve sonrası teknik destek.",
      },
      {
        title: "Özel Çözümler",
        description: "Her etkinliğe özel tasarım ve uygulama.",
      },
    ],
    products: [
      { name: "Pop-Up Sistemler", href: "/urunler/pop-up-sistemler" },
      { name: "LED Işıklı Kutular", href: "/urunler/led-isikli-kutular" },
      { name: "Tekstil Germe Sistemleri", href: "/urunler/tekstil-germe" },
      { name: "Roll-Up Banner", href: "/urunler/roll-up-banner" },
    ],
    process: [
      { step: 1, title: "Konsept Belirleme", description: "Etkinlik teması ve hedeflerinizi belirliyoruz." },
      { step: 2, title: "Tasarım & Planlama", description: "Mekan planı ve görsel tasarımlar hazırlıyoruz." },
      { step: 3, title: "Üretim", description: "Tüm materyalleri üretiyoruz." },
      { step: 4, title: "Kurulum & Destek", description: "Etkinlik öncesi kurulum ve canlı destek." },
    ],
  },
  "perakende": {
    title: "Perakende Çözümleri",
    subtitle: "Mağaza İçi Görsellik ve POP Materyalleri",
    description: "Mağaza içi görsellik, vitrin düzenlemesi ve satış noktası materyalleri ile perakende satışlarınızı artırın.",
    features: [
      "Mağaza standları",
      "Ürün teşhir üniteleri",
      "Işıklı tabelalar",
      "Vitrin sistemleri",
      "POP materyalleri",
      "Yönlendirme tabelaları",
      "Promosyon standları",
      "Özel tasarım çözümler",
    ],
    benefits: [
      {
        title: "Satış Artışı",
        description: "Dikkat çekici görsellerle satışlarınızı artırın.",
      },
      {
        title: "Marka Bilinirliği",
        description: "Tutarlı görsel kimlik ile marka algısını güçlendirin.",
      },
      {
        title: "Esnek Çözümler",
        description: "Kampanyalara göre hızlıca değiştirilebilir sistemler.",
      },
      {
        title: "Dayanıklı Malzeme",
        description: "Uzun ömürlü, günlük kullanıma uygun ürünler.",
      },
    ],
    products: [
      { name: "LED Işıklı Kutular", href: "/urunler/led-isikli-kutular" },
      { name: "Tekstil Germe Sistemleri", href: "/urunler/tekstil-germe" },
      { name: "Roll-Up Banner", href: "/urunler/roll-up-banner" },
      { name: "Baskı Hizmetleri", href: "/urunler/baski-hizmetleri" },
    ],
    process: [
      { step: 1, title: "Mekan İnceleme", description: "Mağaza alanını ve ihtiyaçları analiz ediyoruz." },
      { step: 2, title: "Çözüm Önerisi", description: "İhtiyaca uygun ürün ve yerleşim öneriyoruz." },
      { step: 3, title: "Üretim", description: "Onaylanan çözümleri üretiyoruz." },
      { step: 4, title: "Montaj", description: "Mağazada montaj ve eğitim veriyoruz." },
    ],
  },
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = solutions[slug]
  
  if (!solution) {
    return { title: "Çözüm Bulunamadı" }
  }

  return {
    title: solution.title,
    description: solution.description,
    keywords: [solution.title, "fuar çözümleri", "etkinlik", "perakende", "ModulerStand"],
  }
}

export async function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }))
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params
  const solution = solutions[slug]

  if (!solution) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              {solution.subtitle}
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              {solution.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {solution.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/iletisim">
                  Teklif Al
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="tel:+905315713333">
                  <Phone className="h-4 w-4" />
                  0531 571 33 33
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">
                Neler Sunuyoruz?
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <p className="text-xl font-semibold text-foreground">{solution.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-foreground">
            Avantajlar
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solution.benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-foreground">
            Çalışma Sürecimiz
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 md:grid-cols-2">
              {solution.process.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
            İlgili Ürünler
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {solution.products.map((product) => (
              <Button key={product.name} asChild variant="outline">
                <Link href={product.href}>{product.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">
            Projenizi Konuşalım
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            {solution.title} için ücretsiz danışmanlık ve teklif alın.
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
