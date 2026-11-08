import type { InvoiceStatus, ProjectStatus, ApprovalStatus, MilestoneStatus } from './types'

export const money = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

/** Dates are stored as YYYY-MM-DD (date-only) or full ISO timestamps. */
export function fmtDate(value?: string, opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!value) return '—'
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', { timeZone: 'America/Chicago', ...opts })
}

export function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (s < 60) return 'just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 30) return `${d}d ago`
  return fmtDate(iso)
}

export function isOverdue(date?: string) {
  if (!date) return false
  return new Date(`${date.slice(0, 10)}T23:59:59`).getTime() < Date.now()
}

export function fileSize(bytes?: number) {
  if (!bytes) return ''
  const u = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < u.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`
}

export const PROJECT_STATUS: Record<ProjectStatus, { label: string; tone: Tone }> = {
  planning: { label: 'Planning', tone: 'neutral' },
  in_progress: { label: 'In progress', tone: 'accent' },
  review: { label: 'In review', tone: 'warning' },
  completed: { label: 'Completed', tone: 'success' },
  on_hold: { label: 'On hold', tone: 'muted' },
}

export const MILESTONE_STATUS: Record<MilestoneStatus, { label: string; tone: Tone }> = {
  todo: { label: 'Up next', tone: 'neutral' },
  in_progress: { label: 'In progress', tone: 'accent' },
  done: { label: 'Done', tone: 'success' },
}

export const INVOICE_STATUS: Record<InvoiceStatus, { label: string; tone: Tone }> = {
  draft: { label: 'Draft', tone: 'muted' },
  open: { label: 'Due', tone: 'warning' },
  paid: { label: 'Paid', tone: 'success' },
  void: { label: 'Void', tone: 'muted' },
}

export const APPROVAL_STATUS: Record<ApprovalStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Awaiting your review', tone: 'warning' },
  approved: { label: 'Approved', tone: 'success' },
  changes_requested: { label: 'Changes requested', tone: 'danger' },
}

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'muted'
