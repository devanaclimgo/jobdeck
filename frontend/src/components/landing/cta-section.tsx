import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useTranslation } from "../../hooks/useTranslation";

export function CtaSection() {
  const { t } = useTranslation();
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[-6rem] mx-auto h-48 max-w-md rounded-full bg-primary/25 blur-[100px]"
          />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.landing.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            {t.landing.ctaSubtitle}
          </p>
          <Button size="lg" className="mt-8">
            <Link to="/sign-up"> {t.common.getStarted}</Link>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
