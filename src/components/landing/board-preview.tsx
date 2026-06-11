'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { STATUS_COLORS, STATUS_ORDER, type JobStatus } from '@/lib/types'

const previewCards: Record<JobStatus, { company: string; role: string }[]> = {
  wishlist: [
    { company: 'Stripe', role: 'Full Stack Engineer' },
    { company: 'Raycast', role: 'Frontend Engineer' },
  ],
  applied: [
    { company: 'Linear', role: 'Product Engineer' },
    { company: 'Supabase', role: 'Developer Advocate' },
  ],
  interview: [{ company: 'Vercel', role: 'Senior Frontend Engineer' }],
  offer: [{ company: 'Notion', role: 'Frontend Engineer' }],
  rejected: [{ company: 'Figma', role: 'Design Engineer' }],
}

export function BoardPreview() {
  const { t } = useTranslation()
  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/40 p-4 shadow-2xl shadow-primary/5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATUS_ORDER.map((status) => (
          <div key={status} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[status] }}
              />
              <span className="text-xs font-medium text-foreground">
                {t.status[status]}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {previewCards[status].length}
              </span>
            </div>
            {previewCards[status].map((card) => (
              <div
                key={card.company}
                className="rounded-lg border border-border bg-background/60 p-3 text-left"
              >
                <p className="truncate text-xs font-semibold text-foreground">
                  {card.company}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {card.role}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent"
      />
    </div>
  )
}
