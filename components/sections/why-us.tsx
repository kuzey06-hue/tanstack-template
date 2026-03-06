import { Award, Truck, Recycle, Users, Wrench, ShieldCheck } from "lucide-react"

const features = [
  {
    title: "Ürün Kalitesi",
    description: "Premium malzemeler ve titiz üretim süreçleri ile uzun ömürlü, dayanıklı ürünler sunuyoruz.",
    icon: Award,
  },
  {
    title: "Yenilikçi Tasarım",
    description: "Sürekli Ar-Ge çalışmaları ile sektördeki en yeni trendleri ve teknolojileri takip ediyoruz.",
    icon: Wrench,
  },
  {
    title: "Özel Üretim",
    description: "Markanıza özel tasarım ve üretim hizmeti. Her ihtiyaca uygun çözümler geliştiriyoruz.",
    icon: ShieldCheck,
  },
  {
    title: "Modüler Sistemler",
    description: "Farklı kombinasyonlarla kullanılabilen modüler yapı. Her etkinliğe uyum sağlar.",
    icon: Recycle,
  },
  {
    title: "Hızlı Teslimat",
    description: "Türkiye genelinde hızlı teslimat ağı. Kurulum desteği ve teknik servis hizmeti.",
    icon: Truck,
  },
  {
    title: "Müşteri Memnuniyeti",
    description: "500+ mutlu müşteri ve 1000+ başarılı proje ile güvenilir iş ortağınız.",
    icon: Users,
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Neden ModulerStand?
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Sizi Öne Çıkaran Değerler
          </h2>
          <p className="text-lg text-muted-foreground">
            Yılların deneyimi ve müşteri odaklı yaklaşımımız ile fark yaratıyoruz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
