import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    title: "Fuar Çözümleri",
    description: "Profesyonel fuar standı tasarım ve kurulum hizmetleri. Uluslararası fuarlardan yerel etkinliklere kadar her ölçekte çözümler.",
    href: "/cozumler/fuar",
    features: ["Stand tasarımı", "Kurulum hizmeti", "Grafik üretim", "Lojistik destek"],
    image: "/images/fuar-cozumleri.jpg",
  },
  {
    title: "Etkinlik Çözümleri",
    description: "Lansman, konferans ve özel etkinlikler için dekorasyon ve stand çözümleri. Markanızı etkileyici şekilde sunun.",
    href: "/cozumler/etkinlik",
    features: ["Sahne tasarımı", "Backdrop sistemleri", "LED ekranlar", "Özel üretim"],
    image: "/images/etkinlik-cozumleri.jpg",
  },
  {
    title: "Perakende Çözümleri",
    description: "Mağaza içi görsel çözümler ve POP materyalleri. Satış noktası görselliğinizi güçlendirin.",
    href: "/cozumler/perakende",
    features: ["Mağaza standları", "Ürün teşhir", "Işıklı tabelalar", "Pencere görsellik"],
    image: "/images/perakende-cozumleri.jpg",
  },
]

export function SolutionsSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Sektörel Çözümler
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Her İhtiyaca Özel Çözümler
          </h2>
          <p className="text-lg text-muted-foreground">
            Fuar, etkinlik ve perakende sektörüne yönelik kapsamlı çözümler sunuyoruz.
          </p>
        </div>

        {/* Solutions */}
        <div className="space-y-8 lg:space-y-12">
          {solutions.map((solution, index) => (
            <div 
              key={solution.title}
              className={`flex flex-col items-center gap-8 rounded-2xl border border-border/50 bg-card p-6 lg:flex-row lg:p-8 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20" />
                      <p className="text-lg font-semibold text-foreground">{solution.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full space-y-4 lg:w-1/2">
                <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">
                  {solution.description}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="gap-2">
                  <Link href={solution.href}>
                    Daha Fazla Bilgi
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
