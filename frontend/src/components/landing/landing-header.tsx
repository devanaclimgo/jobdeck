import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Logo } from '../../components/logo'
import { LanguageSwitcher } from '../../components/language-switcher'
import { useTranslation } from '../../hooks/useTranslation'

export function LandingHeader() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" className="rounded-full" size="sm">
            <Link to="/signin">{t.common.signIn}</Link>
          </Button>
          <Button size="sm" className="rounded-full">
            <Link to="/signup">{t.common.getStarted}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
