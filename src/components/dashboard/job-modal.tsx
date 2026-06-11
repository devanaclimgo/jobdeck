'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/hooks/useTranslation'
import type { JobInput } from '@/contexts/JobsContext'
import { STATUS_ORDER, type Job, type JobStatus } from '@/lib/types'

type FormState = {
  company: string
  position: string
  jobUrl: string
  status: JobStatus
  salary: string
  location: string
  stack: string
  appliedDate: string
  notes: string
}

const emptyForm: FormState = {
  company: '',
  position: '',
  jobUrl: '',
  status: 'wishlist',
  salary: '',
  location: '',
  stack: '',
  appliedDate: '',
  notes: '',
}

function toFormState(job: Job): FormState {
  return {
    company: job.company,
    position: job.position,
    jobUrl: job.jobUrl,
    status: job.status,
    salary: job.salary ?? '',
    location: job.location ?? '',
    stack: job.stack?.join(', ') ?? '',
    appliedDate: job.appliedDate ? job.appliedDate.slice(0, 10) : '',
    notes: job.notes ?? '',
  }
}

export function JobModal({
  open,
  onOpenChange,
  job,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  job: Job | null
  onSubmit: (input: JobInput) => void
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(emptyForm)

  useEffect(() => {
    if (open) {
      setForm(job ? toFormState(job) : emptyForm)
    }
  }, [open, job])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const input: JobInput = {
      company: form.company.trim(),
      position: form.position.trim(),
      jobUrl: form.jobUrl.trim(),
      status: form.status,
      salary: form.salary.trim() || undefined,
      location: form.location.trim() || undefined,
      stack: form.stack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      appliedDate: form.appliedDate
        ? new Date(form.appliedDate).toISOString()
        : undefined,
      notes: form.notes.trim() || undefined,
    }
    onSubmit(input)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {job ? t.modal.editTitle : t.modal.createTitle}
          </DialogTitle>
          <DialogDescription>
            {job ? t.modal.editSubtitle : t.modal.createSubtitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">
                {t.job.company} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                required
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder={t.job.companyPlaceholder}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="position">
                {t.job.position} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                required
                value={form.position}
                onChange={(e) => update('position', e.target.value)}
                placeholder={t.job.positionPlaceholder}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobUrl">
                {t.job.jobUrl} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobUrl"
                type="url"
                required
                value={form.jobUrl}
                onChange={(e) => update('jobUrl', e.target.value)}
                placeholder={t.job.urlPlaceholder}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">
                {t.job.status} <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) => update('status', v as JobStatus)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_ORDER.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t.status[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="salary">
                {t.job.salary}{' '}
                <span className="text-xs text-muted-foreground">
                  ({t.common.optional})
                </span>
              </Label>
              <Input
                id="salary"
                value={form.salary}
                onChange={(e) => update('salary', e.target.value)}
                placeholder={t.job.salaryPlaceholder}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">
                {t.job.location}{' '}
                <span className="text-xs text-muted-foreground">
                  ({t.common.optional})
                </span>
              </Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder={t.job.locationPlaceholder}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="stack">
                {t.job.stack}{' '}
                <span className="text-xs text-muted-foreground">
                  ({t.common.optional})
                </span>
              </Label>
              <Input
                id="stack"
                value={form.stack}
                onChange={(e) => update('stack', e.target.value)}
                placeholder={t.job.stackPlaceholder}
              />
              <p className="text-xs text-muted-foreground">
                {t.job.stackHint}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="appliedDate">
                {t.job.appliedDate}{' '}
                <span className="text-xs text-muted-foreground">
                  ({t.common.optional})
                </span>
              </Label>
              <Input
                id="appliedDate"
                type="date"
                value={form.appliedDate}
                onChange={(e) => update('appliedDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">
              {t.job.notes}{' '}
              <span className="text-xs text-muted-foreground">
                ({t.common.optional})
              </span>
            </Label>
            <Textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder={t.job.notesPlaceholder}
            />
          </div>

          <div className="-mx-4 -mb-4 mt-2 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t.common.cancel}
            </Button>
            <Button type="submit">
              {job ? t.common.save : t.common.create}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
