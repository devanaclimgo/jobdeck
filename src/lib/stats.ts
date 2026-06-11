import type { Job } from './types'

export type JobStats = {
  total: number
  activeInterviews: number
  offers: number
  rejections: number
  responseRate: number
  interviewRate: number
}

export function computeStats(jobs: Job[]): JobStats {
  const total = jobs.length
  const applied = jobs.filter((j) => j.status !== 'wishlist').length
  const activeInterviews = jobs.filter((j) => j.status === 'interview').length
  const offers = jobs.filter((j) => j.status === 'offer').length
  const rejections = jobs.filter((j) => j.status === 'rejected').length
  // Responses = anything that progressed past "applied" (interview/offer/rejected)
  const responses = jobs.filter((j) =>
    ['interview', 'offer', 'rejected'].includes(j.status),
  ).length
  const interviewed = jobs.filter((j) =>
    ['interview', 'offer'].includes(j.status),
  ).length

  return {
    total,
    activeInterviews,
    offers,
    rejections,
    responseRate: applied > 0 ? Math.round((responses / applied) * 100) : 0,
    interviewRate: applied > 0 ? Math.round((interviewed / applied) * 100) : 0,
  }
}
