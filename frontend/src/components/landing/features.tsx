import {
  BarChart3,
  Globe,
  KanbanSquare,
  Layers,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Features() {
  const { t } = useTranslation();

  const items = [
    { key: "kanban", icon: KanbanSquare },
    { key: "stats", icon: BarChart3 },
    { key: "pipeline", icon: Layers },
    { key: "centralized", icon: Globe },
    { key: "crossDevice", icon: Smartphone },
  ] as const;

  return (
    <section id="features" className="border-t border-border/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.landing.featuresTitle}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t.landing.featuresSubtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {t.landing.features[key].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.landing.features[key].desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
