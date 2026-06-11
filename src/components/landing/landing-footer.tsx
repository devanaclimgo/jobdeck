'use client'

import { Logo } from '@/components/logo'
import { useTranslation } from '@/hooks/useTranslation'

export function LandingFooter() {
  const { t } = useTranslation()
  const fl = t.landing.footerLinks

  const columns = [
    { title: fl.product, links: [fl.features, fl.pricing] },
    { title: fl.company, links: [fl.about, fl.contact] },
    { title: fl.legal, links: [fl.privacy, fl.terms] },
  ]

  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.common.tagline}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} JobDeck. ${t.landing.copyright}`}
        </div>
      </div>
    </footer>
  )
}
