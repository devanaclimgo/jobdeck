import {
  Briefcase,
  CalendarClock,
  PercentCircle,
  ThumbsUp,
  XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { useTranslation } from '../../hooks/useTranslation'
import type { JobStats } from '../../lib/stats'
import { cn } from '../../lib/utils'

type StatItem = {
  labelKey: keyof ReturnType<typeof useTranslation>['t']['stats']
  value: string
  icon: LucideIcon
  accent: string
}

export function StatsCards({
  stats,
  loading,
}: {
  stats: JobStats
  loading: boolean
}) {
  const { t } = useTranslation()

  const items: StatItem[] = [
    {
      labelKey: 'totalApplications',
      value: String(stats.total),
      icon: Briefcase,
      accent: 'text-chart-1',
    },
    {
      labelKey: 'activeInterviews',
      value: String(stats.activeInterviews),
      icon: CalendarClock,
      accent: 'text-chart-2',
    },
    {
      labelKey: 'offersReceived',
      value: String(stats.offers),
      icon: ThumbsUp,
      accent: 'text-chart-4',
    },
    {
      labelKey: 'rejections',
      value: String(stats.rejections),
      icon: XCircle,
      accent: 'text-chart-5',
    },
    {
      labelKey: 'responseRate',
      value: `${stats.responseRate}%`,
      icon: PercentCircle,
      accent: 'text-chart-3',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map(({ labelKey, value, icon: Icon, accent }) => (
        <Card key={labelKey} className="gap-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t.stats[labelKey]}
            </span>
            <Icon className={cn('size-4', accent)} />
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-12 animate-pulse rounded-md bg-muted" />
          ) : (
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
          )}
        </Card>
      ))}
    </div>
  )
}
