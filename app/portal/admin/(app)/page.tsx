import Link from 'next/link'
import { FiArrowRight, FiUserPlus, FiUsers } from 'react-icons/fi'
import {
  invoiceTotal, listClients, listFiles, listGlobalActivity, listInvoices, listLeads, listProjects, projectProgress, unreadCount,
} from '@/lib/portal/db'
import { PROJECT_STATUS, fmtDate, isOverdue, money, timeAgo } from '@/lib/portal/format'
import { Badge, Empty, PageHeader, Panel, ProgressBar, Stat } from '@/components/portal/ui'
import CredentialForm from '@/components/portal/admin/CredentialForm'
import { emailEnabled } from '@/lib/portal/notify'
import { createClientAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Admin' }

export default async function AdminHome() {
  const clients = await listClients()
  const perClient = await Promise.all(
    clients.map(async (c) => {
      const [projects, invoices] = await Promise.all([listProjects(c.id), listInvoices(c.id)])
      const projectDetails = await Promise.all(
        projects.map(async (p) => ({ p, unread: await unreadCount(p.id, 'admin'), files: await listFiles(p.id) }))
      )
      return { c, projects: projectDetails, invoices }
    })
  )
  const activity = (await listGlobalActivity(25)).filter((a) => a.actor === 'client')

  const allInvoices = perClient.flatMap((x) => x.invoices)
  const outstanding = allInvoices.filter((i) => i.status === 'open')
  const year = new Date().getFullYear().toString()
  const paidThisYear = allInvoices.filter((i) => i.status === 'paid' && i.paidAt?.startsWith(year))
  const active = perClient.flatMap((x) => x.projects).filter(({ p }) => p.status !== 'completed' && p.status !== 'on_hold')

  type Item = { key: string; text: string; sub: string; href: string; tone: 'warning' | 'danger' | 'accent' }
  const attention: Item[] = []
  for (const l of (await listLeads()).filter((l) => l.status === 'new')) {
    attention.push({ key: `l${l.id}`, text: `New project request from ${l.data.name}`, sub: [l.data.company, l.data.budget].filter(Boolean).join(' · ') || l.data.email, href: `/portal/admin/requests/${l.id}`, tone: 'accent' })
  }
  for (const { c, projects } of perClient) {
    for (const { p, unread, files } of projects) {
      if (unread) attention.push({ key: `m${p.id}`, text: `${unread} unread message${unread > 1 ? 's' : ''}`, sub: `${c.name} · ${p.name}`, href: `/portal/admin/projects/${p.id}#messages`, tone: 'accent' })
      for (const f of files.filter((f) => f.approval?.status === 'changes_requested')) {
        attention.push({ key: `f${f.id}`, text: `Changes requested on “${f.name}”`, sub: `${c.name} · ${p.name}`, href: `/portal/admin/projects/${p.id}#files`, tone: 'warning' })
      }
      for (const m of p.milestones.filter((m) => m.status !== 'done' && isOverdue(m.dueDate))) {
        attention.push({ key: `ms${m.id}`, text: `Milestone past due: ${m.title}`, sub: `${c.name} · ${p.name}`, href: `/portal/admin/projects/${p.id}`, tone: 'danger' })
      }
    }
  }
  for (const inv of outstanding.filter((i) => isOverdue(i.dueDate))) {
    const c = clients.find((x) => x.id === inv.clientId)
    attention.push({ key: `i${inv.id}`, text: `Overdue: ${inv.number} · ${money(invoiceTotal(inv))}`, sub: `${c?.name ?? ''} · due ${fmtDate(inv.dueDate)}`, href: `/portal/admin/invoices/${inv.id}`, tone: 'danger' })
  }

  return (
    <div className="grid gap-8">
      <PageHeader eyebrow="Client portal" title="Dashboard">Everything across your clients, at a glance.</PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Clients" value={clients.length} />
        <Stat label="Active projects" value={active.length} />
        <Stat label="Outstanding" value={money(outstanding.reduce((s, i) => s + invoiceTotal(i), 0))} tone={outstanding.length ? 'warning' : undefined} hint={`${outstanding.length} open invoice${outstanding.length === 1 ? '' : 's'}`} />
        <Stat label={`Paid in ${year}`} value={money(paidThisYear.reduce((s, i) => s + invoiceTotal(i), 0))} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Needs your attention">
            {attention.length ? (
              <ul className="-my-2 divide-y divide-line/10">
                {attention.map((a) => (
                  <li key={a.key}>
                    <Link href={a.href} className="group flex items-center gap-3 py-3 no-underline">
                      <span className={`h-2 w-2 flex-shrink-0 rounded-full ${a.tone === 'danger' ? 'bg-danger' : a.tone === 'warning' ? 'bg-warning' : 'bg-accent-light'}`} aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">{a.text}</span>
                        <span className="block truncate text-[0.8rem] text-subtle">{a.sub}</span>
                      </span>
                      <FiArrowRight className="text-subtle group-hover:text-accent-light" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-muted">All clear. No unread messages, change requests or overdue items.</p>
            )}
          </Panel>

          <Panel title="Active projects">
            {active.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {active.map(({ p, unread }) => {
                  const c = clients.find((x) => x.id === p.clientId)
                  return (
                    <Link key={p.id} href={`/portal/admin/projects/${p.id}`} className="card-interactive block !bg-bg/40 p-4 no-underline">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <p className="font-semibold text-fg">{p.name}</p>
                        <Badge tone={PROJECT_STATUS[p.status].tone}>{PROJECT_STATUS[p.status].label}</Badge>
                      </div>
                      <p className="mb-3 text-[0.8rem] text-subtle">
                        {c?.name}
                        {unread ? ` · ${unread} unread` : ''}
                        {p.dueDate ? ` · due ${fmtDate(p.dueDate, { month: 'short', day: 'numeric' })}` : ''}
                      </p>
                      <ProgressBar value={projectProgress(p)} />
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-small text-muted">No active projects.</p>
            )}
          </Panel>

          <Panel title={<span className="flex items-center gap-2"><FiUsers aria-hidden="true" /> Clients</span>}>
            {clients.length ? (
              <ul className="-my-2 divide-y divide-line/10">
                {perClient.map(({ c, projects, invoices }) => {
                  const due = invoices.filter((i) => i.status === 'open').reduce((s, i) => s + invoiceTotal(i), 0)
                  return (
                    <li key={c.id}>
                      <Link href={`/portal/admin/clients/${c.id}`} className="group flex items-center gap-3 py-3 no-underline">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 font-display font-bold text-accent-light" aria-hidden="true">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-fg">
                            {c.name}
                            {c.company ? <span className="text-muted"> · {c.company}</span> : null}
                          </span>
                          <span className="block truncate text-[0.8rem] text-subtle">
                            {projects.length} project{projects.length === 1 ? '' : 's'}
                            {due ? ` · ${money(due)} due` : ''}
                            {c.lastLoginAt ? ` · last seen ${timeAgo(c.lastLoginAt)}` : ' · hasn’t signed in yet'}
                          </span>
                        </span>
                        <FiArrowRight className="text-subtle group-hover:text-accent-light" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <Empty icon={<FiUsers />} title="No clients yet">Add your first client to give them portal access.</Empty>
            )}
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel title={<span className="flex items-center gap-2"><FiUserPlus aria-hidden="true" /> New client</span>}>
            <CredentialForm action={createClientAction} submitLabel="Create client & invite" emailEnabled={emailEnabled()}>
              <div className="grid gap-3">
                <input name="name" required placeholder="Full name" className="field" aria-label="Client name" />
                <input name="email" type="email" required placeholder="Email" className="field" aria-label="Client email" />
                <input name="company" placeholder="Company (optional)" className="field" aria-label="Company" />
                <input name="project" placeholder="First project name (optional)" className="field" aria-label="First project name" />
              </div>
            </CredentialForm>
          </Panel>

          <Panel title="Client activity">
            {activity.length ? (
              <ol className="grid gap-3">
                {activity.map((a) => (
                  <li key={a.id}>
                    {a.href ? (
                      <Link href={a.href} className="text-small text-fg no-underline hover:text-accent-light">{a.text}</Link>
                    ) : (
                      <p className="text-small text-fg">{a.text}</p>
                    )}
                    <p className="text-[0.75rem] text-subtle">{timeAgo(a.at)}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-small text-muted">What your clients do in the portal shows up here.</p>
            )}
          </Panel>
        </div>
      </div>
    </div>
  )
}
