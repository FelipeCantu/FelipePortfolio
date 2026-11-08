import type { IntakeData } from './intake'

export type Role = 'client' | 'admin'

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  /** scrypt hash of the one-time setup code (cleared once a password is set) */
  codeHash?: string
  /** scrypt hash of the password the client chose */
  passwordHash?: string
  /** bumped on code reset or password change, which signs out other sessions */
  sessionVersion: number
  createdAt: string
  lastLoginAt?: string
}

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
export type MilestoneStatus = 'todo' | 'in_progress' | 'done'

export interface Milestone {
  id: string
  title: string
  description?: string
  dueDate?: string
  status: MilestoneStatus
}

/** Something Felipe needs from the client (logo files, hosting login, copy...) */
export interface ClientTask {
  id: string
  title: string
  done: boolean
  doneAt?: string
}

export interface Project {
  id: string
  clientId: string
  name: string
  summary?: string
  status: ProjectStatus
  startDate?: string
  dueDate?: string
  stagingUrl?: string
  liveUrl?: string
  milestones: Milestone[]
  clientTasks: ClientTask[]
  /** agreed project price in cents (drives deposit / remaining-balance invoices) */
  price?: number
  /** set when the client has been asked for a review (avoids asking twice) */
  reviewRequestedAt?: string
  /** services the client gives Felipe access to (no passwords) */
  access?: AccessItem[]
  /** when Felipe emailed the "you own all your accounts" handoff summary */
  handoffSentAt?: string
  carePlan?: CarePlan
  /** the Get Started answers this project was created from */
  brief?: IntakeData & { submittedAt: string }
  createdAt: string
  updatedAt: string
}

export type ApprovalStatus = 'pending' | 'approved' | 'changes_requested'

export interface FileItem {
  id: string
  projectId: string
  name: string
  url: string
  kind: 'upload' | 'link'
  size?: number
  contentType?: string
  uploadedBy: Role
  note?: string
  requiresApproval: boolean
  approval?: { status: ApprovalStatus; note?: string; at?: string }
  createdAt: string
}

export interface Message {
  id: string
  projectId: string
  from: Role
  body: string
  at: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  /** cents */
  unitAmount: number
}

export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'void'

/** Monthly maintenance ("care plan"): an invoice is created and emailed automatically each month. */
export interface CarePlan {
  active: boolean
  /** cents per month */
  amount: number
  /** 1–28: day of the month the invoice goes out */
  billingDay: number
  /** what's included, one per line (client sees this) */
  includes: string[]
  /** YYYY-MM: automatic billing starts this month (so turning a plan on mid-month doesn't bill that day) */
  startsFrom?: string
  /** YYYY-MM of the last month billed */
  lastBilled?: string
  startedAt: string
}

export interface Invoice {
  id: string
  number: string
  clientId: string
  projectId?: string
  title: string
  items: InvoiceItem[]
  dueDate?: string
  notes?: string
  status: InvoiceStatus
  createdAt: string
  sentAt?: string
  paidAt?: string
  stripeSessionId?: string
  /** reminder stages already emailed: 'before' | 'due' | 'late3' | 'late7' | 'manual:<iso>' */
  reminders?: string[]
}

export interface Activity {
  id: string
  clientId: string
  projectId?: string
  actor: Role
  text: string
  href?: string
  at: string
}

export type ContractStatus = 'draft' | 'sent' | 'signed' | 'void'

export interface Contract {
  id: string
  clientId: string
  projectId: string
  title: string
  body: string
  status: ContractStatus
  createdAt: string
  sentAt?: string
  signedAt?: string
  signature?: {
    name: string
    email: string
    ip: string
    userAgent: string
    /** sha256 of title + body at the moment of signing */
    contentHash: string
  }
}

export interface Review {
  id: string
  clientId: string
  projectId: string
  rating: number
  text: string
  /** what to show publicly, e.g. "Maria G., Sunrise Yoga" */
  displayName: string
  role?: string
  company?: string
  /** client agreed it may be shown on the website */
  allowPublish: boolean
  /** Felipe chose to show it on the website */
  published: boolean
  createdAt: string
}

export type AccessStatus = 'todo' | 'invited' | 'confirmed' | 'removed'

export interface AccessItem {
  id: string
  /** key into ACCESS_SERVICES, or 'custom' */
  key: string
  name: string
  status: AccessStatus
  /** domain items: DNS records for the client to add instead of inviting Felipe */
  records?: { type: string; name: string; value: string }[]
  /** a short note from Felipe shown with the guide (e.g. which role exactly) */
  note?: string
  invitedAt?: string
  confirmedAt?: string
  removedAt?: string
}

export interface PortalSettings {
  /** email clients should invite (defaults to Felipe's admin email) */
  accessEmail?: string
  bookingUrl?: string
  /** default deposit percentage for one-click deposit invoices */
  depositPercent?: number
}

export type LeadStatus = 'new' | 'converted' | 'archived'

/** A Get Started wizard submission waiting for Felipe. */
export interface Lead {
  id: string
  status: LeadStatus
  data: IntakeData
  createdAt: string
  ip?: string
  clientId?: string
  projectId?: string
  convertedAt?: string
}
