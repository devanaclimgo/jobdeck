'use client'

import { BarChart3, KanbanSquare, LayoutDashboard, Settings } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { t } = useTranslation()

  const items = [
    { key: 'dashboard' as const, icon: LayoutDashboard, active: true },
    { key: 'board' as const, icon: KanbanSquare, active: false },
    { key: 'statistics' as const, icon: BarChart3, active: false },
    { key: 'settings' as const, icon: Settings, active: false },
  ]

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {items.map(({ key, icon: Icon, active }) => (
          <button
            key={key}
            type="button"
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
            )}
          >
            <Icon className="size-4" />
            {t.nav[key]}
          </button>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <p className="text-xs text-muted-foreground">{t.common.tagline}</p>
      </div>
    </aside>
  )
}
