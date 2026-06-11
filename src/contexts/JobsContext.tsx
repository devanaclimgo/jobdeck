'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Job, JobStatus } from '@/lib/types'
import { sampleJobs } from '@/lib/sample-data'

const STORAGE_KEY = 'jobdeck-jobs'

export type JobInput = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>

type JobsContextValue = {
  jobs: Job[]
  loading: boolean
  addJob: (input: JobInput) => Job
  updateJob: (id: string, input: JobInput) => void
  deleteJob: (id: string) => void
  moveJob: (id: string, status: JobStatus) => void
}

const JobsContext = createContext<JobsContextValue | null>(null)

function nowIso() {
  return new Date().toISOString()
}

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate an initial load and hydrate from localStorage.
    const timer = setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
          setJobs(JSON.parse(stored) as Job[])
        } else {
          setJobs(sampleJobs)
        }
      } catch {
        setJobs(sampleJobs)
      }
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch {
      // ignore write errors
    }
  }, [jobs, loading])

  const addJob = useCallback((input: JobInput) => {
    const job: Job = {
      ...input,
      id: `job-${crypto.randomUUID()}`,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    }
    setJobs((prev) => [job, ...prev])
    return job
  }, [])

  const updateJob = useCallback((id: string, input: JobInput) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, ...input, updatedAt: nowIso() } : job,
      ),
    )
  }, [])

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }, [])

  const moveJob = useCallback((id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status, updatedAt: nowIso() } : job,
      ),
    )
  }, [])

  const value = useMemo<JobsContextValue>(
    () => ({ jobs, loading, addJob, updateJob, deleteJob, moveJob }),
    [jobs, loading, addJob, updateJob, deleteJob, moveJob],
  )

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobs must be used within a JobsProvider')
  return ctx
}
