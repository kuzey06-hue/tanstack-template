import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-accent/20 blur-[80px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
              Projenizi Birlikte Hayata Geçirelim
            </h2>
            <p className="mb-8 text-lg text-background/80">
              Fuar, etkinlik veya perakende alanınız için profesyonel çözümler sunuyoruz. 
              Ücretsiz danışmanlık ve teklif almak için hemen iletişime geçin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/iletisim">
                  Teklif Alın
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="gap-2 border-background/30 bg-transparent text-background hover:bg-background/10"
              >
                <a href="tel:+905315713333">
                  <Phone className="h-4 w-4" />
                  0531 571 33 33
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
