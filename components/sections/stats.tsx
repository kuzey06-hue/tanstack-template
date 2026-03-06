const stats = [
  {
    value: "500+",
    label: "Mutlu Müşteri",
    description: "Türkiye genelinde hizmet verdiğimiz müşteri sayısı",
  },
  {
    value: "1000+",
    label: "Tamamlanan Proje",
    description: "Başarıyla teslim edilen fuar ve etkinlik projesi",
  },
  {
    value: "50+",
    label: "Ürün Çeşidi",
    description: "Farklı ihtiyaçlara yönelik geniş ürün yelpazesi",
  },
  {
    value: "10+",
    label: "Yıllık Deneyim",
    description: "Sektördeki uzmanlık ve tecrübe",
  },
]

export function StatsSection() {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-2 text-4xl font-bold text-primary-foreground lg:text-5xl">
                {stat.value}
              </p>
              <p className="mb-1 text-lg font-semibold text-primary-foreground/90">
                {stat.label}
              </p>
              <p className="text-sm text-primary-foreground/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
