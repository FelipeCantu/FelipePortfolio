import 'server-only'
import {
  changeOrders, getSettings, invoiceTotal, listClients, listContracts, listFiles, listInvoices, listProjects, nextMilestone,
  previews, projectProgress, proposalExpired, proposals, saveProject, todayIso,
} from './db'
import { emailPeople } from './people'
import { fmtDate, money } from './format'
import type { Project } from './types'

const WEEK = 7 * 86400000
const ACTIVE = new Set(['planning', 'in_progress', 'review'])

/**
 * The weekly progress summary for one project: what got done in the last
 * 7 days, what's happening now, what's next and what Felipe is waiting on.
 * `hasNews` is false when there is nothing worth emailing about.
 */
export async function buildWeeklyUpdate(project: Project, now = new Date()) {
  const since = new Date(now.getTime() - WEEK).toISOString()
  const [files, shown, quotes, changes, contracts, invoices] = await Promise.all([
    listFiles(project.id),
    previews.list(project.id),
    proposals.list(project.id),
    changeOrders.list(project.id),
    listContracts(project.id),
    listInvoices(project.clientId),
  ])

  const done = [
    ...project.milestones.filter((m) => m.status === 'done' && m.doneAt && m.doneAt > since).map((m) => `Finished: ${m.title}`),
    ...shown.filter((p) => p.createdAt > since).map((p) => `Shared a new preview: ${p.title}`),
    ...files.filter((f) => f.uploadedBy === 'admin' && f.createdAt > since).map((f) => `Shared: ${f.name}`),
  ]
  const doing = project.milestones.filter((m) => m.status === 'in_progress').map((m) => m.title)
  const next = project.milestones.find((m) => m.status === 'todo') ?? (doing.length ? undefined : nextMilestone(project))

  const waiting = [
    ...quotes.filter((q) => q.status === 'sent' && !proposalExpired(q)).map((q) => `Review the proposal: ${q.title}`),
    ...contracts.filter((c) => c.status === 'sent').map((c) => `Sign: ${c.title}`),
    ...invoices.filter((i) => i.projectId === project.id && i.status === 'open').map((i) => `Pay invoice ${i.number} (${money(invoiceTotal(i))})${i.dueDate ? `, due ${fmtDate(i.dueDate)}` : ''}`),
    ...changes.filter((c) => c.status === 'sent').map((c) => `Approve or decline the change request: ${c.title}`),
    ...shown.filter((p) => p.status === 'pending').map((p) => `Look at the preview: ${p.title}`),
    ...files.filter((f) => f.approval?.status === 'pending').map((f) => `Review: ${f.name}`),
    ...(project.access ?? []).filter((a) => a.status === 'todo').map((a) => `Give Felipe access to ${a.name}`),
    ...project.clientTasks.filter((t) => !t.done).map((t) => t.title),
  ]

  const list = (items: string[]) => items.map((i) => `• ${i}`).join('\n')
  const parts = [
    `Here's where ${project.name} stands this week. Overall progress: ${projectProgress(project)}%.`,
    done.length ? `Done this week\n${list(done)}` : 'No big milestones wrapped up this week, but work is moving along.',
    doing.length ? `In progress now\n${list(doing)}` : '',
    next ? `Up next\n• ${next.title}${next.dueDate ? ` (target ${fmtDate(next.dueDate)})` : ''}` : '',
    waiting.length ? `Waiting on you\n${list(waiting.slice(0, 12))}${waiting.length > 12 ? `\n• …and ${waiting.length - 12} more in your portal` : ''}` : 'Nothing is needed from you right now.',
    project.dueDate ? `Target launch: ${fmtDate(project.dueDate)}.` : '',
    'Questions? Reply in the portal any time.',
  ].filter(Boolean)

  return {
    subject: `${project.name}: weekly progress update`,
    text: parts.join('\n\n'),
    hasNews: done.length > 0 || waiting.length > 0 || doing.length > 0,
  }
}

/** Emails the update to everyone on the account who gets progress emails. Returns how many people it went to. */
export async function sendWeeklyUpdate(project: Project, origin: string, now = new Date()) {
  const update = await buildWeeklyUpdate(project, now)
  const sent = await emailPeople(project.clientId, 'updates', update.subject, update.text, `${origin}/portal/projects/${project.id}`, 'Open your project')
  await saveProject({ ...project, weeklySentOn: todayIso(now) })
  return sent
}

/** Called by the daily cron job; only does anything on Mondays (Felipe's time zone). */
export async function runWeeklyUpdates(origin: string, now = new Date()) {
  const weekday = now.toLocaleDateString('en-US', { timeZone: 'America/Chicago', weekday: 'long' })
  if (weekday !== 'Monday' || (await getSettings()).weeklyUpdates === false) return []
  const sent: string[] = []
  for (const c of await listClients()) {
    for (const p of await listProjects(c.id)) {
      if (!ACTIVE.has(p.status) || p.weeklyUpdates === false || p.weeklySentOn === todayIso(now)) continue
      if (!(await buildWeeklyUpdate(p, now)).hasNews) continue
      if (await sendWeeklyUpdate(p, origin, now)) sent.push(p.name)
    }
  }
  return sent
}
