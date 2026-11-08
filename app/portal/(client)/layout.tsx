import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FiLogOut, FiUser } from 'react-icons/fi'
import PortalTabs from '@/components/portal/PortalTabs'
import { requireClient } from '@/lib/portal/session'
import { listInvoices, listProjects } from '@/lib/portal/db'
import { logoutAction } from '@/app/portal/actions'

export const dynamic = 'force-dynamic'

export default async function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const client = await requireClient()
  if (!client.passwordHash) redirect('/portal/set-password')
  const [projects, invoices] = await Promise.all([listProjects(client.id), listInvoices(client.id)])
  const dueCount = invoices.filter((i) => i.status === 'open').length

  return (
    <div className="container-page page-top pb-section">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line/15 pb-4">
        <PortalTabs
          tabs={[
            { href: '/portal', label: 'Overview', exact: true },
            ...projects.map((p) => ({ href: `/portal/projects/${p.id}`, label: p.name })),
            { href: '/portal/invoices', label: 'Invoices', count: dueCount },
          ]}
        />
        <div className="flex items-center gap-3">
          <Link href="/portal/account" className="btn btn-ghost btn-sm" title="Account settings">
            <FiUser aria-hidden="true" />
            <span className="max-w-[12rem] truncate">{client.name}</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn btn-ghost btn-sm">
              <FiLogOut aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  )
}
