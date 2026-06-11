export type JobStatus =
  | 'wishlist'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected'

export type Job = {
  id: string
  company: string
  position: string
  jobUrl: string
  status: JobStatus
  salary?: string
  location?: string
  stack?: string[]
  appliedDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export const STATUS_ORDER: JobStatus[] = [
  'wishlist',
  'applied',
  'interview',
  'offer',
  'rejected',
]

export const STATUS_COLORS: Record<JobStatus, string> = {
  wishlist: 'oklch(0.62 0.2 264)', // blue
  applied: 'oklch(0.8 0.16 85)', // yellow
  interview: 'oklch(0.6 0.22 295)', // purple
  offer: 'oklch(0.72 0.18 145)', // green
  rejected: 'oklch(0.62 0.21 22)', // red
}
