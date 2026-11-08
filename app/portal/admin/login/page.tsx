import { redirect } from 'next/navigation'
import { FiShield } from 'react-icons/fi'
import { isAdminSession } from '@/lib/portal/session'
import AdminLoginForm from '@/components/portal/admin/AdminLoginForm'

export const metadata = { title: 'Admin sign in' }

export default async function AdminLogin() {
  if (await isAdminSession()) redirect('/portal/admin')
  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-sm">
        <header className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <FiShield size={20} aria-hidden="true" />
          </div>
          <p className="eyebrow">Portal admin</p>
          <h1 className="mt-3 text-h2 text-fg">Sign in</h1>
        </header>
        <div className="card p-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
