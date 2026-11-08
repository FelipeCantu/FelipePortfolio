import Link from 'next/link'
import ForgotForm from '@/components/portal/ForgotForm'

export const metadata = { title: 'Reset password' }

export default function ForgotPage() {
  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 text-center">
          <p className="eyebrow">Client portal</p>
          <h1 className="mt-3 text-h2 text-fg">Forgot your password?</h1>
          <p className="mt-2 text-muted">Enter your email and we&apos;ll send you a link to choose a new one.</p>
        </header>
        <div className="card p-6 sm:p-8">
          <ForgotForm />
        </div>
        <p className="mt-6 text-center text-small">
          <Link href="/portal/login" className="text-accent-light underline decoration-accent/40 underline-offset-4 hover:text-white">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
