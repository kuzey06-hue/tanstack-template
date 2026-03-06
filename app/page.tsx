import { HeroSection } from "@/components/sections/hero"
import { ProductsSection } from "@/components/sections/products"
import { WhyUsSection } from "@/components/sections/why-us"
import { StatsSection } from "@/components/sections/stats"
import { SolutionsSection } from "@/components/sections/solutions"
import { CTASection } from "@/components/sections/cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <StatsSection />
      <WhyUsSection />
      <SolutionsSection />
      <CTASection />
    </>
  )
}
