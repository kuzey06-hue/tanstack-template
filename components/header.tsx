"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const products = [
  {
    title: "LED Işıklı Kutular",
    href: "/urunler/led-isikli-kutular",
    description: "Modüler LED ışıklı kutu sistemleri, duvar tipi ve ayaklı modeller",
  },
  {
    title: "Modüler Standlar",
    href: "/urunler/moduler-standlar",
    description: "Taşınabilir ve kurulumu kolay modüler fuar standları",
  },
  {
    title: "Pop-Up Sistemler",
    href: "/urunler/pop-up-sistemler",
    description: "Hızlı kurulum pop-up stand ve backdrop çözümleri",
  },
  {
    title: "Tekstil Germe Sistemleri",
    href: "/urunler/tekstil-germe",
    description: "SEG tekstil germe çerçeve sistemleri",
  },
  {
    title: "Roll-Up Banner",
    href: "/urunler/roll-up-banner",
    description: "Taşınabilir roll-up ve banner standları",
  },
  {
    title: "Baskı Hizmetleri",
    href: "/urunler/baski-hizmetleri",
    description: "Tekstil ve dijital baskı çözümleri",
  },
]

const solutions = [
  {
    title: "Fuar Çözümleri",
    href: "/cozumler/fuar",
    description: "Profesyonel fuar standı tasarım ve kurulum",
  },
  {
    title: "Etkinlik Çözümleri",
    href: "/cozumler/etkinlik",
    description: "Lansman, konferans ve etkinlik dekorasyonu",
  },
  {
    title: "Perakende Çözümleri",
    href: "/cozumler/perakende",
    description: "Mağaza içi görsel çözümler ve POP materyalleri",
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+905315713333" 
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Phone className="h-4 w-4" />
              <span>0531 571 33 33</span>
            </a>
            <span className="hidden lg:inline">
              Zübeyde Hanım Mah., Kazım Karabekir Cad. No:91/80 Altındağ / Ankara
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Türkiye Geneli Hizmet</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">
                ModulerStand
              </span>
              <span className="hidden text-xs text-muted-foreground lg:block">
                Profesyonel Fuar Çözümleri
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Ana Sayfa
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ürünler</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                    {products.map((product) => (
                      <li key={product.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={product.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {product.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {product.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Çözümler</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {solutions.map((solution) => (
                      <li key={solution.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={solution.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {solution.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {solution.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/hakkimizda" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Hakkımızda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/iletisim" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    İletişim
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button asChild>
              <Link href="/iletisim">
                Teklif Alın
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <Link 
                  href="/" 
                  className="text-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </Link>
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">Ürünler</p>
                  {products.map((product) => (
                    <Link
                      key={product.title}
                      href={product.href}
                      className="block text-sm hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">Çözümler</p>
                  {solutions.map((solution) => (
                    <Link
                      key={solution.title}
                      href={solution.href}
                      className="block text-sm hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {solution.title}
                    </Link>
                  ))}
                </div>

                <Link 
                  href="/hakkimizda" 
                  className="text-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hakkımızda
                </Link>

                <Link 
                  href="/iletisim" 
                  className="text-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  İletişim
                </Link>

                <div className="mt-4 space-y-4 border-t pt-4">
                  <a 
                    href="tel:+905315713333" 
                    className="flex items-center gap-2 text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    0531 571 33 33
                  </a>
                  <Button asChild className="w-full">
                    <Link href="/iletisim">Teklif Alın</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
