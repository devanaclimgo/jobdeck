import { useState } from 'react'
import { Inbox } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { STATUS_COLORS, type Job, type JobStatus } from '../../lib/types'
import { JobCard } from './job-card'

export function KanbanColumn({
  status,
  jobs,
  draggingId,
  isDropTarget,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  onDropJob,
  onDragOverColumn,
  onDragLeaveColumn,
}: {
  status: JobStatus
  jobs: Job[]
  draggingId: string | null
  isDropTarget: boolean
  onEdit: (job: Job) => void
  onDelete: (job: Job) => void
  onDragStart: (job: Job) => void
  onDragEnd: () => void
  onDropJob: (status: JobStatus) => void
  onDragOverColumn: (status: JobStatus) => void
  onDragLeaveColumn: () => void
}) {
  const { t } = useTranslation()
  const [isOver, setIsOver] = useState(false)

  return (
    <div className="flex w-72 shrink-0 flex-col lg:w-auto lg:min-w-0 lg:flex-1">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: STATUS_COLORS[status] }}
        />
        <h3 className="text-sm font-semibold text-foreground">
          {t.status[status]}
        </h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {jobs.length}
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          if (!isOver) setIsOver(true)
          onDragOverColumn(status)
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsOver(false)
            onDragLeaveColumn()
          }
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsOver(false)
          onDropJob(status)
        }}
        className={`flex min-h-[12rem] flex-1 flex-col gap-2 rounded-xl border border-dashed p-2 transition-colors ${
          isOver || isDropTarget
            ? 'border-primary/60 bg-primary/5'
            : 'border-border/60 bg-muted/20'
        }`}
      >
        {jobs.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg p-6 text-center">
            <Inbox className="size-6 text-muted-foreground/60" />
            <p className="text-xs font-medium text-muted-foreground">
              {t.empty.columnTitle}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {t.empty.columnDesc}
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={draggingId === job.id}
            />
          ))
        )}
      </div>
    </div>
  )
}
