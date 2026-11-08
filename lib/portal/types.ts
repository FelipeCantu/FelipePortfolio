export type Role = 'client' | 'admin'

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  /** scrypt hash of the client's access code */
  codeHash: string
  /** bumped when the code is reset, which signs out existing sessions */
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
