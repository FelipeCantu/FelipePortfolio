import Link from 'next/link'
import { FiDatabase, FiDownload } from 'react-icons/fi'
import { incomeReport } from '@/lib/portal/income'
import { fmtDate, money } from '@/lib/portal/format'
import { Empty, PageHeader, Panel, Stat } from '@/components/portal/ui'

export const metadata = { title: 'Income' }

export default async function IncomePage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  const { year: raw } = await searchParams
  const thisYear = new Date().getFullYear()
  const year = Number(raw) >= 2000 && Number(raw) <= 2100 ? Number(raw) : thisYear
  const r = await incomeReport(year)
  const peak = Math.max(1, ...r.months.map((m) => m.total))
  const monthsSoFar = year === thisYear ? new Date().getMonth() + 1 : 12

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Portal admin"
        title={`Income, ${year}`}
        action={
          <a href={`/api/portal/admin/export?type=income&year=${year}`} className="btn btn-gold btn-sm" download>
            <FiDownload aria-hidden="true" /> Download {year} as CSV
          </a>
        }
      >
        Money actually received, counted on the day each invoice was paid. Open or void invoices aren’t included.
      </PageHeader>

      <nav aria-label="Year" className="-mt-4 flex flex-wrap gap-1">
        {r.years.map((y) => (
          <Link
            key={y}
            href={`/portal/admin/income?year=${y}`}
            aria-current={y === year ? 'page' : undefined}
            className={`rounded-pill px-4 py-2 text-[0.9rem] font-medium no-underline transition-colors ${y === year ? 'bg-accent/15 text-fg' : 'text-muted hover:bg-white/[0.05] hover:text-fg'}`}
          >
            {y}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={`Received in ${year}`} value={money(r.total)} tone="success" hint={`${r.rows.length} paid invoice${r.rows.length === 1 ? '' : 's'}`} />
        <Stat label="Monthly average" value={money(Math.round(r.total / monthsSoFar))} hint={year === thisYear ? 'So far this year' : 'Across the year'} />
        <Stat label="Paid online" value={money(r.online)} hint={`${money(r.total - r.online)} marked paid by hand`} />
        <Stat label="Still owed to you" value={money(r.outstanding)} tone={r.outstanding ? 'warning' : undefined} hint={`${r.openCount} open invoice${r.openCount === 1 ? '' : 's'} (all years)`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel title="By month">
          <table className="w-full text-small">
            <caption className="sr-only">Income received each month of {year}</caption>
            <thead className="sr-only">
              <tr><th scope="col">Month</th><th scope="col">Share of best month</th><th scope="col">Invoices</th><th scope="col">Received</th></tr>
            </thead>
            <tbody>
              {r.months.map((m) => (
                <tr key={m.key} className="border-b border-line/10 last:border-0">
                  <th scope="row" className="w-12 py-2 text-left font-medium text-muted">{m.label}</th>
                  <td className="px-3 py-2">
                    <div className="h-2.5 overflow-hidden rounded-pill bg-white/[0.05]" aria-hidden="true">
                      <div className="h-full rounded-pill bg-gradient-to-r from-accent-dark to-accent-light" style={{ width: `${Math.round((m.total / peak) * 100)}%` }} />
                    </div>
                  </td>
                  <td className="w-10 py-2 text-right text-subtle">{m.count || ''}</td>
                  <td className={`w-28 py-2 text-right font-mono ${m.total ? 'text-fg' : 'text-subtle'}`}>{money(m.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={3} className="pt-3 text-left font-semibold text-fg">Total</th>
                <td className="pt-3 text-right font-mono font-semibold text-fg">{money(r.total)}</td>
              </tr>
            </tfoot>
          </table>
        </Panel>

        <div className="grid content-start gap-6">
          <Panel title="By client">
            {r.perClient.length ? (
              <ul className="grid gap-2">
                {r.perClient.map((c) => (
                  <li key={c.name} className="flex items-center justify-between gap-3 text-small">
                    <span className="min-w-0 truncate text-fg">{c.name}</span>
                    <span className="font-mono text-muted">{money(c.total)} · {r.total ? Math.round((c.total / r.total) * 100) : 0}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-muted">Nothing received in {year} yet.</p>
            )}
          </Panel>

          <Panel title={<span className="flex items-center gap-2"><FiDatabase aria-hidden="true" /> Backup</span>}>
            <p className="text-small text-muted">
              One file with every client, project, message, invoice, agreement, proposal and request in the portal. Passwords are left out, and uploaded files are listed by name but not included.
            </p>
            <a href="/api/portal/admin/export?type=backup" className="btn btn-secondary btn-sm mt-3" download>
              <FiDownload aria-hidden="true" /> Download backup (JSON)
            </a>
            <p className="mt-2 text-[0.75rem] text-subtle">It contains client names and emails, so keep it somewhere private.</p>
          </Panel>
        </div>
      </div>

      <Panel title={`Paid invoices, ${year}`}>
        {r.rows.length ? (
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-small">
              <thead>
                <tr className="border-b border-line/15 text-left text-[0.75rem] uppercase tracking-wide text-subtle">
                  <th scope="col" className="px-2 py-2 font-medium">Paid</th>
                  <th scope="col" className="px-2 py-2 font-medium">Invoice</th>
                  <th scope="col" className="px-2 py-2 font-medium">Client</th>
                  <th scope="col" className="px-2 py-2 font-medium">How</th>
                  <th scope="col" className="px-2 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => (
                  <tr key={row.invoice.id} className="border-b border-line/10 last:border-0">
                    <td className="whitespace-nowrap px-2 py-2 text-muted">{fmtDate(row.paidOn, { month: 'short', day: 'numeric' })}</td>
                    <td className="px-2 py-2">
                      <Link href={`/portal/admin/invoices/${row.invoice.id}`} className="text-fg no-underline hover:text-accent-light">
                        <span className="font-mono text-[0.75rem] text-subtle">{row.invoice.number}</span> {row.invoice.title}
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-muted">{row.clientName}</td>
                    <td className="px-2 py-2 text-muted">{row.invoice.stripeSessionId ? 'Online' : 'By hand'}</td>
                    <td className="px-2 py-2 text-right font-mono text-fg">{money(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title={`No payments recorded in ${year}`}>Paid invoices show up here as soon as a client pays or you mark one as paid.</Empty>
        )}
      </Panel>
    </div>
  )
}
