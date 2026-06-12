import { LandingHeader } from '../src/components/landing/landing-header'
import { Hero } from '../src/components/landing/hero'
import { Features } from '../src/components/landing/features'
import { HowItWorks } from '../src/components/landing/how-it-works'
import { CtaSection } from '../src/components/landing/cta-section'
import { LandingFooter } from '../src/components/landing/landing-footer'

export default function Page() {
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