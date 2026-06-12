import { LandingHeader } from '../../components/landing/landing-header'
import { Hero } from '../../components/landing/hero'
import { Features } from '../../components/landing/features'
import { HowItWorks } from '../../components/landing/how-it-works'
import { CtaSection } from '../../components/landing/cta-section'
import { LandingFooter } from '../../components/landing/landing-footer'

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}