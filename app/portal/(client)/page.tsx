import Link from 'next/link'
import { FiArrowRight, FiCheckSquare, FiClipboard, FiCreditCard, FiEye, FiFolder, FiKey, FiLifeBuoy, FiMessageCircle, FiCalendar, FiMail, FiMonitor, FiPenTool, FiPlusCircle, FiStar } from 'react-icons/fi'
import { requireClient } from '@/lib/portal/session'
import {
  getProjectReview, getSettings, invoiceTotal, listContracts, listFiles, listInvoices, listProjectActivity, listProjects,
  nextMilestone, projectProgress, unreadCount, changeOrders, previews, proposalExpired, proposals, tickets,
} from '@/lib/portal/db'
import { PROJECT_STATUS, fmtDate, isOverdue, money, timeAgo } from '@/lib/portal/format'
import { Badge, Empty, Panel, ProgressBar, Stat } from '@/components/portal/ui'
import { bookingHref } from '@/lib/portal/booking'

export const metadata = { title: 'Overview' }

export default async function PortalHome() {
  const client = await requireClient()
  const [projects, invoices] = await Promise.all([listProjects(client.id), listInvoices(client.id)])

  const details = await Promise.all(
    projects.map(async (p) => {
      const [files, unread, activity, contracts, review, quotes, changes, shown, support] = await Promise.all([
        listFiles(p.id),
        unreadCount(p.id, 'client'),
        listProjectActivity(p.id, 8),
        listContracts(p.id),
        getProjectReview(p.id),
        proposals.list(p.id),
        changeOrders.list(p.id),
        previews.list(p.id),
        tickets.list(p.id),
      ])
      return { project: p, files, unread, activity, contracts, review, quotes, changes, shown, support }
    })
  )

  const openInvoices = invoices.filter((i) => i.status === 'open')
  const balance = openInvoices.reduce((s, i) => s + invoiceTotal(i), 0)

  type Todo = { key: string; icon: React.ReactNode; text: string; sub: string; href: string; urgent?: boolean }
  const todos: Todo[] = []
  for (const { project } of details) {
    for (const a of (project.access ?? []).filter((a) => a.status === 'todo')) {
      todos.push({ key: `a${a.id}`, icon: <FiKey />, text: `Give Felipe access: ${a.name}`, sub: `${project.name} · no passwords needed`, href: `/portal/projects/${project.id}#access` })
    }
  }
  for (const { project, quotes, changes, shown, support } of details) {
    for (const q of quotes.filter((q) => q.status === 'sent' && !proposalExpired(q))) {
      todos.push({ key: `q${q.id}`, icon: <FiClipboard />, text: `Review your proposal: ${q.title}`, sub: `${project.name} · pick an option and accept`, href: `/portal/projects/${project.id}/proposals/${q.id}` })
    }
    for (const c of changes.filter((c) => c.status === 'sent')) {
      todos.push({ key: `ch${c.id}`, icon: <FiPlusCircle />, text: `Approve or decline: ${c.title}`, sub: `${project.name} · ${c.price ? `+${money(c.price)}` : 'no extra charge'}`, href: `/portal/projects/${project.id}#changes` })
    }
    for (const p of shown.filter((p) => p.status === 'pending')) {
      todos.push({ key: `pv${p.id}`, icon: <FiMonitor />, text: `Look at the preview: ${p.title}`, sub: `${project.name} · before it goes live`, href: `/portal/projects/${project.id}/preview/${p.id}` })
    }
    for (const t of support.filter((t) => t.status === 'waiting')) {
      todos.push({ key: `sp${t.id}`, icon: <FiLifeBuoy />, text: `Felipe needs an answer on request #${t.number}`, sub: `${project.name} · ${t.title}`, href: `/portal/projects/${project.id}#support` })
    }
  }
  for (const { project, contracts } of details) {
    for (const c of contracts.filter((c) => c.status === 'sent')) {
      todos.push({ key: `c${c.id}`, icon: <FiPenTool />, text: `Sign “${c.title}”`, sub: `${project.name} · agreement`, href: `/portal/contracts/${c.id}` })
    }
  }
  for (const { project, files, unread, review } of details) {
    if (!review && (project.status === 'completed' || project.reviewRequestedAt)) {
      todos.push({ key: `r${project.id}`, icon: <FiStar />, text: 'Leave a quick review', sub: `${project.name} · 1 minute`, href: `/portal/projects/${project.id}#review` })
    }
    for (const f of files.filter((f) => f.approval?.status === 'pending')) {
      todos.push({ key: `f${f.id}`, icon: <FiEye />, text: `Review “${f.name}”`, sub: project.name, href: `/portal/projects/${project.id}#files` })
    }
    for (const t of project.clientTasks.filter((t) => !t.done)) {
      todos.push({ key: `t${t.id}`, icon: <FiCheckSquare />, text: t.title, sub: `${project.name} · needed from you`, href: `/portal/projects/${project.id}#todo` })
    }
    if (unread) {
      todos.push({ key: `m${project.id}`, icon: <FiMessageCircle />, text: `${unread} new message${unread > 1 ? 's' : ''} from Felipe`, sub: project.name, href: `/portal/projects/${project.id}#messages` })
    }
  }
  for (const inv of openInvoices) {
    todos.push({
      key: `i${inv.id}`,
      icon: <FiCreditCard />,
      text: `Pay ${inv.number} · ${money(invoiceTotal(inv))}`,
      sub: inv.dueDate ? `${isOverdue(inv.dueDate) ? 'Overdue since' : 'Due'} ${fmtDate(inv.dueDate)}` : inv.title,
      href: `/portal/invoices/${inv.id}`,
      urgent: isOverdue(inv.dueDate),
    })
  }

  const activity = details
    .flatMap((d) => d.activity)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 8)

  const active = projects.filter((p) => p.status !== 'completed')
  const firstName = client.name.split(' ')[0]
  const booking = bookingHref(await getSettings(), client, active[0])

  return (
    <div className="grid gap-8">
      <header>
        <p className="eyebrow">Client portal</p>
        <h1 className="mt-2 text-h1 text-fg">Hi {firstName}</h1>
        <p className="lead mt-2">
          {todos.length ? `You have ${todos.length} thing${todos.length > 1 ? 's' : ''} waiting on you.` : "You're all caught up. Here's where everything stands."}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Active projects" value={active.length} hint={active[0]?.name ?? 'None right now'} />
        <Stat
          label="Progress"
          value={active[0] ? `${projectProgress(active[0])}%` : '—'}
          hint={active[0] ? `Next: ${nextMilestone(active[0])?.title ?? 'Final review'}` : undefined}
          href={active[0] ? `/portal/projects/${active[0].id}` : undefined}
        />
        <Stat label="Waiting on you" value={todos.length} tone={todos.length ? 'warning' : 'success'} hint={todos.length ? 'See the list below' : 'Nothing to do'} />
        <Stat label="Balance due" value={money(balance)} tone={balance ? 'warning' : 'success'} hint={`${openInvoices.length} open invoice${openInvoices.length === 1 ? '' : 's'}`} href="/portal/invoices" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Waiting on you">
            {todos.length ? (
              <ul className="-my-2 divide-y divide-line/10">
                {todos.map((t) => (
                  <li key={t.key}>
                    <Link href={t.href} className="group flex items-center gap-3 py-3 no-underline">
                      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${t.urgent ? 'bg-danger/15 text-danger' : 'bg-gold/10 text-gold'}`} aria-hidden="true">
                        {t.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">{t.text}</span>
                        <span className={`block truncate text-[0.8rem] ${t.urgent ? 'text-danger' : 'text-subtle'}`}>{t.sub}</span>
                      </span>
                      <FiArrowRight className="flex-shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent-light" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty icon={<FiCheckSquare />} title="Nothing needs your attention">Felipe will let you know when something is ready for you.</Empty>
            )}
          </Panel>

          <Panel title="Your projects">
            {projects.length ? (
              <div className="grid gap-3">
                {projects.map((p) => {
                  const next = nextMilestone(p)
                  const st = PROJECT_STATUS[p.status]
                  return (
                    <Link key={p.id} href={`/portal/projects/${p.id}`} className="card-interactive block !bg-bg/40 p-5 no-underline">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-fg">{p.name}</h3>
                        <Badge tone={st.tone}>{st.label}</Badge>
                      </div>
                      <ProgressBar value={projectProgress(p)} label={next ? `Next: ${next.title}${next.dueDate ? ` · ${fmtDate(next.dueDate, { month: 'short', day: 'numeric' })}` : ''}` : p.milestones.length ? 'All milestones complete' : 'Getting started'} />
                      {p.dueDate && <p className="mt-3 text-[0.8rem] text-subtle">Target launch {fmtDate(p.dueDate)}</p>}
                    </Link>
                  )
                })}
              </div>
            ) : (
              <Empty icon={<FiFolder />} title="No projects yet">Your project will show up here as soon as Felipe sets it up.</Empty>
            )}
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel title="Recent activity">
            {activity.length ? (
              <ol className="relative grid gap-4 border-l border-line/15 pl-5">
                {activity.map((a) => (
                  <li key={a.id} className="relative">
                    <span className={`absolute -left-[1.62rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-surface ${a.actor === 'admin' ? 'bg-accent-light' : 'bg-gold'}`} aria-hidden="true" />
                    <p className="text-small text-fg">{a.actor === 'admin' ? a.text : a.text.replace(client.name, 'You')}</p>
                    <p className="text-[0.75rem] text-subtle">{timeAgo(a.at)}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-small text-muted">Updates on your project will appear here.</p>
            )}
          </Panel>

          <Panel title="Need something?">
            <p className="text-small text-muted">Questions, ideas or change requests are always welcome. Messages go straight to Felipe.</p>
            <div className="mt-4 grid gap-2">
              {projects[0] && (
                <Link href={`/portal/projects/${projects[0].id}#messages`} className="btn btn-primary btn-sm">
                  <FiMessageCircle aria-hidden="true" /> Send a message
                </Link>
              )}
              <a href={booking} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <FiCalendar aria-hidden="true" /> Book a call
              </a>
              <a href="mailto:cantujr.felipe@gmail.com" className="btn btn-ghost btn-sm">
                <FiMail aria-hidden="true" /> Email Felipe
              </a>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
