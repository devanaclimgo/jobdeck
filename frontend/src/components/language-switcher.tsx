import { cn } from '../lib/utils'
import { useTranslation } from '../hooks/useTranslation'
import { languageMeta, type Language } from '../translations'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useTranslation()
  const langs = Object.keys(languageMeta) as Language[]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-border bg-card/50 p-1',
        className,
      )}
      role="group"
      aria-label="Language switcher"
    >
      {langs.map((lang) => {
        const active = language === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <span aria-hidden="true" className="text-sm leading-none">
              {languageMeta[lang].flag}
            </span>
            <span className="hidden sm:inline">{languageMeta[lang].label}</span>
          </button>
        )
      })}
    </div>
  )
}
