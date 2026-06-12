import {
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { useTranslation } from '../../hooks/useTranslation'
import { formatDate } from '../../lib/format'
import type { Job } from '../../lib/types'

export function JobCard({
  job,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  job: Job
  onEdit: (job: Job) => void
  onDelete: (job: Job) => void
  onDragStart: (job: Job) => void
  onDragEnd: () => void
  isDragging: boolean
}) {
  const { t, language } = useTranslation()

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move'
        onDragStart(job)
      }}
      onDragEnd={onDragEnd}
      className={`group cursor-grab rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-md active:cursor-grabbing ${
        isDragging ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {job.position}
          </h4>
          <p className="truncate text-xs text-muted-foreground">
            {job.company}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          {job.jobUrl && (
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={t.job.openLink}
              render={
                <a href={job.jobUrl} target="_blank" rel="noreferrer" />
              }
            >
              <ExternalLink className="size-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={t.common.edit}
            onClick={() => onEdit(job)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={t.common.delete}
            onClick={() => onDelete(job)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {(job.location || job.salary || job.appliedDate) && (
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{job.location}</span>
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <DollarSign className="size-3.5 shrink-0" />
              <span className="truncate">{job.salary}</span>
            </span>
          )}
          {job.appliedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" />
              <span className="truncate">
                {formatDate(job.appliedDate, language)}
              </span>
            </span>
          )}
        </div>
      )}

      {job.stack && job.stack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </article>
  )
}
