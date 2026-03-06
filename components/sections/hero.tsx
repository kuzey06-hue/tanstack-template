import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  "Modüler ve taşınabilir sistemler",
  "Hızlı kurulum ve söküm",
  "Profesyonel tasarım desteği",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
              Türkiye Geneli Hizmet
            </div>

            <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Modüler Fuar Standları ve{" "}
              <span className="text-primary">LED Işıklı Kutular</span>
            </h1>

            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              ModulerStand olarak, profesyonel fuar standları, LED ışıklı kutular ve 
              taşınabilir sergi çözümleri ile markanızı öne çıkarıyoruz. Kaliteli malzeme, 
              yenilikçi tasarım ve uygun fiyat garantisi.
            </p>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/urunler">
                  Ürünleri İncele
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/iletisim">
                  Teklif Alın
                </Link>
              </Button>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="space-y-4">
                    <div className="h-32 rounded-lg bg-primary/20 backdrop-blur" />
                    <div className="h-20 rounded-lg bg-accent/20 backdrop-blur" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-20 rounded-lg bg-accent/20 backdrop-blur" />
                    <div className="h-32 rounded-lg bg-primary/20 backdrop-blur" />
                  </div>
                </div>
              </div>
              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-4 backdrop-blur">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-xs text-muted-foreground">Mutlu Müşteri</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">1000+</p>
                    <p className="text-xs text-muted-foreground">Tamamlanan Proje</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">10+</p>
                    <p className="text-xs text-muted-foreground">Yıllık Deneyim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
