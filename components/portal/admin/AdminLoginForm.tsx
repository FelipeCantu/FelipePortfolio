'use client'
import { useActionState } from 'react'
import { adminLoginAction } from '@/app/portal/admin/actions'

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, undefined)
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label htmlFor="password" className="field-label">Admin password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" aria-invalid={state?.error ? 'true' : undefined} />
        {state?.error && <p className="field-error" role="alert">{state.error}</p>}
        <p className="field-hint">Same ADMIN_SECRET as your Stripe admin.</p>
      </div>
      <button className="btn btn-primary w-full" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
