import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Users, Target, Heart, Lightbulb, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "ModulerStand hakkında bilgi edinin. Modüler fuar standları ve LED ışıklı kutular alanında Türkiye'nin güvenilir çözüm ortağı.",
  keywords: ["ModulerStand", "fuar standı üreticisi", "Ankara", "hakkımızda"],
}

const values = [
  {
    title: "Kalite",
    description: "Premium malzemeler ve titiz üretim süreçleri ile uzun ömürlü, dayanıklı ürünler sunuyoruz.",
    icon: Award,
  },
  {
    title: "Yenilikçilik",
    description: "Sürekli Ar-Ge çalışmaları ile sektördeki en yeni trendleri ve teknolojileri takip ediyoruz.",
    icon: Lightbulb,
  },
  {
    title: "Güvenilirlik",
    description: "Zamanında teslimat ve kaliteli hizmet anlayışı ile güvenilir iş ortağınız olmayı hedefliyoruz.",
    icon: Shield,
  },
  {
    title: "Müşteri Odaklılık",
    description: "Müşterilerimizin ihtiyaçlarını anlamak ve en uygun çözümleri sunmak önceliğimizdir.",
    icon: Heart,
  },
]

const milestones = [
  { year: "2014", title: "Kuruluş", description: "ModulerStand, Ankara'da faaliyetlerine başladı." },
  { year: "2016", title: "İlk Büyük Proje", description: "Ulusal çapta ilk büyük fuar projemizi tamamladık." },
  { year: "2018", title: "Üretim Tesisi", description: "Modern üretim tesisimizi faaliyete geçirdik." },
  { year: "2020", title: "LED Işıklı Kutular", description: "LED ışıklı kutu ürün grubunu portföyümüze ekledik." },
  { year: "2022", title: "Türkiye Geneli Hizmet", description: "Türkiye'nin 81 iline hizmet vermeye başladık." },
  { year: "2024", title: "500+ Müşteri", description: "500'ün üzerinde mutlu müşteriyle çalışma başarısına ulaştık." },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Hakkımızda
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              ModulerStand
            </h1>
            <p className="text-lg text-muted-foreground">
              Modüler fuar standları ve LED ışıklı kutular alanında Türkiye'nin güvenilir çözüm ortağı.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="space-y-4">
                    <div className="h-24 rounded-lg bg-primary/20 backdrop-blur" />
                    <div className="h-16 rounded-lg bg-accent/20 backdrop-blur" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-16 rounded-lg bg-accent/20 backdrop-blur" />
                    <div className="h-24 rounded-lg bg-primary/20 backdrop-blur" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Biz Kimiz?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ModulerStand, 2014 yılından bu yana modüler fuar standları, LED ışıklı kutular ve 
                  taşınabilir sergi çözümleri alanında faaliyet gösteren, Ankara merkezli bir firmadır.
                </p>
                <p>
                  Kurulduğumuz günden bu yana, kaliteli malzeme kullanımı, yenilikçi tasarım anlayışı ve 
                  müşteri memnuniyeti odaklı hizmet prensiplerimizle sektörde güvenilir bir konum elde ettik.
                </p>
                <p>
                  Deneyimli ekibimiz ve modern üretim tesislerimiz ile Türkiye genelinde fuar, etkinlik ve 
                  perakende sektörüne profesyonel çözümler sunuyoruz. 500'ü aşkın mutlu müşterimiz ve 
                  1000'in üzerinde başarıyla tamamladığımız proje ile büyümeye devam ediyoruz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground">Yıllık Deneyim</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Mutlu Müşteri</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Proje</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">81</p>
                  <p className="text-sm text-muted-foreground">İl Hizmeti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">Misyonumuz</h3>
              <p className="text-muted-foreground">
                Müşterilerimizin marka değerini artırmak için yenilikçi, kaliteli ve uygun maliyetli 
                sergi çözümleri sunmak. Her projede müşteri memnuniyetini ön planda tutarak, 
                güvenilir iş ortaklıkları kurmak.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">Vizyonumuz</h3>
              <p className="text-muted-foreground">
                Türkiye'nin modüler sergi çözümleri alanında lider firması olmak. Sürdürülebilir 
                büyüme ile uluslararası pazarlarda da yer edinmek. Sektörde yenilikçiliğin ve 
                kalitenin referans noktası olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Değerlerimiz
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              İlkelerimiz ve Değerlerimiz
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Yolculuğumuz
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Kilometre Taşları
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="mb-1 font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">
            Birlikte Çalışalım
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Projeniz için profesyonel çözümler sunmaya hazırız. Hemen iletişime geçin.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/iletisim">
              İletişime Geçin
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
