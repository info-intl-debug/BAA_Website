import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { InfoCardsSection } from "@/components/home/info-cards-section"
import { EventsSection } from "@/components/home/events-section"
import { DynamicBenefitsSection } from "@/components/home/dynamic-benefits-section"
import { DynamicSectorsSection } from "@/components/home/dynamic-sectors-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <InfoCardsSection />
        <EventsSection />
        <DynamicBenefitsSection />
        <DynamicSectorsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
