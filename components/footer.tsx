import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const products = [
  { title: "LED Işıklı Kutular", href: "/urunler/led-isikli-kutular" },
  { title: "Modüler Standlar", href: "/urunler/moduler-standlar" },
  { title: "Pop-Up Sistemler", href: "/urunler/pop-up-sistemler" },
  { title: "Tekstil Germe Sistemleri", href: "/urunler/tekstil-germe" },
  { title: "Roll-Up Banner", href: "/urunler/roll-up-banner" },
  { title: "Baskı Hizmetleri", href: "/urunler/baski-hizmetleri" },
]

const solutions = [
  { title: "Fuar Çözümleri", href: "/cozumler/fuar" },
  { title: "Etkinlik Çözümleri", href: "/cozumler/etkinlik" },
  { title: "Perakende Çözümleri", href: "/cozumler/perakende" },
]

const company = [
  { title: "Hakkımızda", href: "/hakkimizda" },
  { title: "İletişim", href: "/iletisim" },
  { title: "Gizlilik Politikası", href: "/gizlilik" },
  { title: "Kullanım Koşulları", href: "/kullanim-kosullari" },
]

export function Footer() {
  return (
    <footer className="border-t bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">ModulerStand</h3>
                <p className="text-sm text-background/70">Profesyonel Fuar Çözümleri</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/80">
              ModulerStand olarak, modüler fuar standları, LED ışıklı kutular ve taşınabilir 
              sergi çözümleri ile Türkiye genelinde hizmet vermekteyiz.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+905315713333" 
                className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>0531 571 33 33</span>
              </a>
              <a 
                href="mailto:info@modulerstand.com.tr" 
                className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>info@modulerstand.com.tr</span>
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Zübeyde Hanım Mah., Kazım Karabekir Cad. No:91/80 Altındağ / Ankara</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Ürünler</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.title}>
                  <Link 
                    href={product.href}
                    className="text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Çözümler</h4>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.title}>
                  <Link 
                    href={solution.href}
                    className="text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="mb-4 mt-6 text-lg font-semibold">Kurumsal</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.title}>
                  <Link 
                    href={item.href}
                    className="text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Neden Biz?</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Profesyonel tasarım ve üretim</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Hızlı teslimat ve kurulum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Modüler ve yeniden kullanılabilir sistemler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Türkiye geneli hizmet ağı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Uygun fiyat garantisi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-background/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} ModulerStand. Tüm hakları saklıdır.
          </p>
          <p>
            Tasarım ve Geliştirme: ModulerStand
          </p>
        </div>
      </div>
    </footer>
  )
}
