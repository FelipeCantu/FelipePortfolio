import Link from 'next/link'
import { FiArrowRight, FiInbox } from 'react-icons/fi'
import clsx from 'clsx'
import { listLeads } from '@/lib/portal/db'
import { PROJECT_TYPE_LABELS } from '@/lib/portal/intake'
import { timeAgo } from '@/lib/portal/format'
import { Badge, Empty, PageHeader } from '@/components/portal/ui'

export const metadata = { title: 'Requests' }

const TABS = [
  { key: 'new', label: 'New' },
  { key: 'converted', label: 'Converted' },
  { key: 'archived', label: 'Archived' },
] as const

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show = 'new' } = await searchParams
  const leads = await listLeads()
  const visible = leads.filter((l) => l.status === show)

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Portal admin" title="Project requests">
        Everything submitted through your Get Started form. Turn a request into a client and project in one click.
      </PageHeader>
      <nav className="flex gap-1" aria-label="Filter requests">
        {TABS.map((t) => {
          const count = leads.filter((l) => l.status === t.key).length
          return (
            <Link
              key={t.key}
              href={`/portal/admin/requests?show=${t.key}`}
              aria-current={show === t.key ? 'page' : undefined}
              className={clsx('rounded-pill px-4 py-2 text-small font-medium no-underline', show === t.key ? 'bg-accent/15 text-fg' : 'text-muted hover:bg-white/[0.05] hover:text-fg')}
            >
              {t.label} <span className="ml-1 font-mono text-[0.75rem] text-subtle">{count}</span>
            </Link>
          )
        })}
      </nav>
      {visible.length ? (
        <ul className="grid gap-2">
          {visible.map((l) => (
            <li key={l.id}>
              <Link href={`/portal/admin/requests/${l.id}`} className="card-interactive group flex flex-wrap items-center gap-4 p-4 no-underline sm:p-5">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 font-display font-bold text-accent-light" aria-hidden="true">
                  {l.data.name.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-fg">
                    {l.data.name}
                    {l.data.company ? <span className="font-normal text-muted"> · {l.data.company}</span> : null}
                  </span>
                  <span className="block truncate text-[0.8rem] text-subtle">{l.data.description}</span>
                </span>
                <Badge tone="accent">{PROJECT_TYPE_LABELS[l.data.projectType] ?? l.data.projectType}</Badge>
                {l.data.budget && <Badge>{l.data.budget}</Badge>}
                <span className="w-20 text-right text-[0.8rem] text-subtle">{timeAgo(l.createdAt)}</span>
                <FiArrowRight className="text-subtle group-hover:text-accent-light" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty icon={<FiInbox />} title={show === 'new' ? 'No new requests' : `No ${show} requests`}>
          {show === 'new' ? 'When someone fills out your Get Started form, it lands here and you get an email.' : null}
        </Empty>
      )}
    </div>
  )
}
