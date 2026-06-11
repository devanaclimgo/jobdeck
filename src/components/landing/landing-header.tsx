"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/hooks/useTranslation";

export function LandingHeader() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button asChild variant="ghost" className="rounded-full" size="sm">
            <Link href="/sign-in">{t.common.signIn}</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/sign-up">{t.common.getStarted}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
