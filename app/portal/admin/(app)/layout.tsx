import { FiLogOut } from 'react-icons/fi'
import PortalTabs from '@/components/portal/PortalTabs'
import { requireAdmin } from '@/lib/portal/session'
import { listLeads } from '@/lib/portal/db'
import { adminLogoutAction } from '@/app/portal/admin/actions'

export const dynamic = 'force-dynamic'

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  const newRequests = (await listLeads()).filter((l) => l.status === 'new').length
  return (
    <div className="container-page page-top pb-section">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="chip chip-gold">Admin</span>
          <PortalTabs label="Portal admin" tabs={[
              { href: '/portal/admin', label: 'Dashboard', exact: true },
              { href: '/portal/admin/requests', label: 'Requests', count: newRequests },
              { href: '/portal/admin/income', label: 'Income' },
              { href: '/portal/admin/reviews', label: 'Reviews' },
              { href: '/portal/admin/settings', label: 'Settings' },
            ]} />
        </div>
        <form action={adminLogoutAction}>
          <button type="submit" className="btn btn-ghost btn-sm">
            <FiLogOut aria-hidden="true" /> Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  )
}
