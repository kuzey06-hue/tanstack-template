import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "İletişim",
  description: "ModulerStand ile iletişime geçin. Fuar standları, LED ışıklı kutular ve sergi çözümleri için teklif alın. Telefon: 0531 571 33 33",
  keywords: ["iletişim", "teklif al", "fuar standı teklif", "Ankara"],
}

const contactInfo = [
  {
    title: "Telefon & WhatsApp",
    value: "0531 571 33 33",
    href: "tel:+905315713333",
    icon: Phone,
    description: "Hafta içi 09:00 - 18:00",
  },
  {
    title: "E-posta",
    value: "info@modulerstand.com.tr",
    href: "mailto:info@modulerstand.com.tr",
    icon: Mail,
    description: "24 saat içinde yanıt",
  },
  {
    title: "Adres",
    value: "Zübeyde Hanım Mah., Kazım Karabekir Cad. No:91/80 Altındağ / Ankara",
    href: "https://maps.google.com/?q=Zübeyde Hanım Mah., Kazım Karabekir cad. No:91/80 Altındağ, Ankara",
    icon: MapPin,
    description: "Ziyaret için randevu alınız",
  },
  {
    title: "Çalışma Saatleri",
    value: "Pazartesi - Cumartesi: 09:00 - 18:00",
    href: null,
    icon: Clock,
    description: "Pazar günü kapalı",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              İletişim
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-lg text-muted-foreground">
              Projeleriniz için teklif almak veya sorularınızı iletmek için aşağıdaki 
              formu doldurun veya iletişim bilgilerimizden bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                  İletişim Bilgileri
                </h2>
                <p className="text-muted-foreground">
                  Size en uygun iletişim kanalını seçerek bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div 
                    key={item.title}
                    className="rounded-xl border bg-card p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                        {item.href ? (
                          <a 
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-primary hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground">{item.value}</p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/905315713333?text=Merhaba,%20ModulerStand%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp ile Hızlı İletişim
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border bg-card p-6 lg:p-8">
                <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">
                  Teklif Formu
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Formu doldurun, en kısa sürede size dönüş yapalım.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
              Konum
            </h2>
            <div className="aspect-video overflow-hidden rounded-2xl border bg-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5!2d32.85!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwNTEnMDAuMCJF!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ModulerStand Konum"
              />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Zübeyde Hanım Mah., Kazım Karabekir Cad. No:91/80 Altındağ / Ankara
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
