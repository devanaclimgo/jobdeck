'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = ['one', 'two', 'three'] as const

  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.landing.howItWorksTitle}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t.landing.howItWorksSubtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {t.landing.steps[step].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.landing.steps[step].desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
