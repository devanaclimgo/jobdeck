'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/logo'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslation } from '@/hooks/useTranslation'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 11v2.8h6.5c-.3 1.7-2 5-6.5 5-3.9 0-7-3.2-7-7.1S8.1 4.5 12 4.5c2.2 0 3.7.9 4.6 1.8l3-2.9C17.7 1.6 15.1.5 12 .5 5.9.5 1 5.4 1 11.5S5.9 22.5 12 22.5c6.3 0 10.5-4.4 10.5-10.6 0-.7-.1-1.3-.2-1.9H12z"
      />
    </svg>
  )
}

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const isSignIn = mode === 'sign-in'

  function goToDashboard(method: string) {
    setLoading(method)
    setTimeout(() => router.push('/dashboard'), 700)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    goToDashboard('email')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t.auth.backToHome}
        </Link>
        <LanguageSwitcher />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <Logo showText={false} className="scale-110" />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              {isSignIn ? t.auth.signInTitle : t.auth.signUpTitle}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignIn ? t.auth.signInSubtitle : t.auth.signUpSubtitle}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              disabled={loading !== null}
              onClick={() => goToDashboard('google')}
            >
              {loading === 'google' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GoogleIcon className="size-4" />
              )}
              {t.auth.continueWithGoogle}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              disabled={loading !== null}
              onClick={() => goToDashboard('github')}
            >
              {loading === 'github' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <GitHubIcon className="size-4" />
              )}
              {t.auth.continueWithGitHub}
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {t.auth.orContinueWith}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder={t.auth.emailPlaceholder}
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder={t.auth.passwordPlaceholder}
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={loading !== null}
            >
              {loading === 'email' && (
                <Loader2 className="size-4 animate-spin" />
              )}
              {isSignIn ? t.common.signIn : t.common.signUp}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignIn ? t.auth.noAccount : t.auth.haveAccount}{' '}
            <Link
              href={isSignIn ? '/sign-up' : '/sign-in'}
              className="font-medium text-primary hover:underline"
            >
              {isSignIn ? t.common.signUp : t.common.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
