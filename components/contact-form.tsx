"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const subjects = [
  { value: "teklif", label: "Fiyat Teklifi" },
  { value: "bilgi", label: "Ürün Bilgisi" },
  { value: "siparis", label: "Sipariş" },
  { value: "destek", label: "Teknik Destek" },
  { value: "diger", label: "Diğer" },
]

const productCategories = [
  { value: "led-isikli-kutu", label: "LED Işıklı Kutular" },
  { value: "moduler-stand", label: "Modüler Standlar" },
  { value: "pop-up", label: "Pop-Up Sistemler" },
  { value: "tekstil-germe", label: "Tekstil Germe Sistemleri" },
  { value: "roll-up", label: "Roll-Up Banner" },
  { value: "baski", label: "Baskı Hizmetleri" },
  { value: "diger", label: "Diğer" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-primary/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Send className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Mesajınız İletildi
        </h3>
        <p className="text-muted-foreground">
          En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz!
        </p>
        <Button 
          className="mt-6" 
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad *</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Adınız Soyadınız" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Firma Adı</Label>
          <Input 
            id="company" 
            name="company" 
            placeholder="Firma Adınız" 
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta *</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="ornek@firma.com" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon *</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="0531 571 33 33" 
            required 
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Konu *</Label>
          <Select name="subject" required>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Konu seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="product">İlgilendiğiniz Ürün</Label>
          <Select name="product">
            <SelectTrigger id="product">
              <SelectValue placeholder="Ürün seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mesajınız *</Label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder="Projeniz hakkında detaylı bilgi verin. Boyut, adet, kullanım alanı gibi bilgiler teklif hazırlamamıza yardımcı olacaktır."
          rows={5}
          required 
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>*</span>
        <span>Zorunlu alanlar</span>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Mesaj Gönder
          </>
        )}
      </Button>
    </form>
  )
}
