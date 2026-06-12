import { ArrowDownUp, Plus, Search } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { useTranslation } from '../../hooks/useTranslation'
import { STATUS_ORDER, type JobStatus } from '../../lib/types'

export type SortOrder = 'newest' | 'oldest'

export type Filters = {
  search: string
  status: JobStatus | 'all'
  company: string | 'all'
  sort: SortOrder
}

export function FilterBar({
  filters,
  onChange,
  companies,
  onAddJob,
}: {
  filters: Filters
  onChange: (filters: Filters) => void
  companies: string[]
  onAddJob: () => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t.common.search}
          className="h-9 pl-9"
          aria-label={t.common.search}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.status}
          onValueChange={(v) =>
            onChange({ ...filters, status: v as Filters['status'] })
          }
        >
          <SelectTrigger className="h-9 w-[150px]" aria-label={t.filters.filterByStatus}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.allStatuses}</SelectItem>
            {STATUS_ORDER.map((status) => (
              <SelectItem key={status} value={status}>
                {t.status[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.company}
          onValueChange={(v) => onChange({ ...filters, company: v ?? 'all' })}
        >
          <SelectTrigger className="h-9 w-[160px]" aria-label={t.filters.filterByCompany}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.allCompanies}</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(v) =>
            onChange({ ...filters, sort: v as SortOrder })
          }
        >
          <SelectTrigger className="h-9 w-[150px]" aria-label={t.filters.sortBy}>
            <ArrowDownUp className="size-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t.filters.newest}</SelectItem>
            <SelectItem value="oldest">{t.filters.oldest}</SelectItem>
          </SelectContent>
        </Select>

        <Button size="lg" className="h-9" onClick={onAddJob}>
          <Plus className="size-4" />
          {t.dashboard.addJob}
        </Button>
      </div>
    </div>
  )
}
