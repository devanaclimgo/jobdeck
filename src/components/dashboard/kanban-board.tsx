'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { SearchX } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useJobs, type JobInput } from '@/contexts/JobsContext'
import { useTranslation } from '@/hooks/useTranslation'
import { STATUS_ORDER, type Job, type JobStatus } from '@/lib/types'
import { computeStats } from '@/lib/stats'
import { StatsCards } from './stats-cards'
import { FilterBar, type Filters } from './filter-bar'
import { KanbanColumn } from './kanban-column'
import { JobModal } from './job-modal'

export function KanbanBoard() {
  const { t } = useTranslation()
  const { jobs, loading, addJob, updateJob, deleteJob, moveJob } = useJobs()

  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'all',
    company: 'all',
    sort: 'newest',
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deletingJob, setDeletingJob] = useState<Job | null>(null)
  const [draggingJob, setDraggingJob] = useState<Job | null>(null)
  const [dropTarget, setDropTarget] = useState<JobStatus | null>(null)

  const stats = useMemo(() => computeStats(jobs), [jobs])

  const companies = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.company))).sort(),
    [jobs],
  )

  const filteredJobs = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    return jobs
      .filter((job) => {
        if (filters.status !== 'all' && job.status !== filters.status)
          return false
        if (filters.company !== 'all' && job.company !== filters.company)
          return false
        if (term) {
          const haystack =
            `${job.company} ${job.position} ${job.location ?? ''} ${
              job.stack?.join(' ') ?? ''
            }`.toLowerCase()
          if (!haystack.includes(term)) return false
        }
        return true
      })
      .sort((a, b) => {
        const da = new Date(a.createdAt).getTime()
        const db = new Date(b.createdAt).getTime()
        return filters.sort === 'newest' ? db - da : da - db
      })
  }, [jobs, filters])

  const jobsByStatus = useMemo(() => {
    const map: Record<JobStatus, Job[]> = {
      wishlist: [],
      applied: [],
      interview: [],
      offer: [],
      rejected: [],
    }
    for (const job of filteredJobs) map[job.status].push(job)
    return map
  }, [filteredJobs])

  function openCreate() {
    setEditingJob(null)
    setModalOpen(true)
  }

  function openEdit(job: Job) {
    setEditingJob(job)
    setModalOpen(true)
  }

  function handleSubmit(input: JobInput) {
    if (editingJob) {
      updateJob(editingJob.id, input)
      toast.success(t.toast.jobUpdated)
    } else {
      addJob(input)
      toast.success(t.toast.jobCreated)
    }
  }

  function confirmDelete() {
    if (deletingJob) {
      deleteJob(deletingJob.id)
      toast.success(t.toast.jobDeleted)
      setDeletingJob(null)
    }
  }

  function handleDrop(status: JobStatus) {
    setDropTarget(null)
    if (draggingJob && draggingJob.status !== status) {
      moveJob(draggingJob.id, status)
      toast.success(t.toast.jobMoved.replace('{status}', t.status[status]))
    }
    setDraggingJob(null)
  }

  const hasResults = filteredJobs.length > 0
  const isFiltering =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.company !== 'all'

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t.dashboard.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.dashboard.welcome}
        </p>
      </div>

      <StatsCards stats={stats} loading={loading} />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        companies={companies}
        onAddJob={openCreate}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATUS_ORDER.map((status) => (
            <div
              key={status}
              className="h-48 animate-pulse rounded-xl border border-border/60 bg-muted/30"
            />
          ))}
        </div>
      ) : !hasResults && isFiltering ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <SearchX className="size-8 text-muted-foreground/60" />
          <p className="text-sm font-medium text-foreground">
            {t.empty.noResults}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.empty.noResultsDesc}
          </p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {STATUS_ORDER.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              jobs={jobsByStatus[status]}
              draggingId={draggingJob?.id ?? null}
              isDropTarget={dropTarget === status}
              onEdit={openEdit}
              onDelete={setDeletingJob}
              onDragStart={setDraggingJob}
              onDragEnd={() => {
                setDraggingJob(null)
                setDropTarget(null)
              }}
              onDropJob={handleDrop}
              onDragOverColumn={setDropTarget}
              onDragLeaveColumn={() => setDropTarget(null)}
            />
          ))}
        </div>
      )}

      <JobModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        job={editingJob}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={deletingJob !== null}
        onOpenChange={(open) => !open && setDeletingJob(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.modal.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.modal.deleteDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              {t.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
