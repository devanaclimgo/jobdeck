import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useTranslation } from "../../hooks/useTranslation";
import { BoardPreview } from "./board-preview";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-10rem] -z-10 mx-auto h-[28rem] max-w-3xl rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-20 pb-16 text-center sm:pt-28">
        <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          {t.landing.heroTitle}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.landing.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            <Link to="/sign-up">{t.common.getStarted}</Link>
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/sign-in">{t.common.signIn}</Link>
          </Button>
        </div>

        <div className="mt-16 w-full">
          <BoardPreview />
        </div>
      </div>
    </section>
  );
}
