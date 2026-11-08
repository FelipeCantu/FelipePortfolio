'use client'
import { useActionState, useState } from 'react'
import Link from 'next/link'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { loginAction } from '@/app/portal/actions'

export default function LoginForm({ defaultEmail, linkError }: { defaultEmail?: string; linkError?: boolean }) {
  const [state, action, pending] = useActionState(loginAction, undefined)
  const [show, setShow] = useState(false)
  const error =
    state?.error ??
    (linkError ? 'That invite link has already been used or replaced. Sign in with your password, or ask Felipe for a new invite.' : undefined)

  return (
    <form action={action} className="grid gap-5" noValidate>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={defaultEmail} className="field" placeholder="you@company.com" />
      </div>
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label htmlFor="password" className="field-label !mb-0">Password</label>
          <Link href="/portal/forgot" className="text-[0.8rem] text-accent-light no-underline hover:text-white">Forgot password?</Link>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            required
            autoComplete="current-password"
            className="field pr-12"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'login-error' : 'pw-hint'}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-subtle hover:text-fg"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
          </button>
        </div>
        {!error && <p id="pw-hint" className="field-hint">First time here? Use the link in your invite email, or enter the access code from it.</p>}
      </div>
      {error && (
        <p id="login-error" role="alert" className="field-error -mt-2">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
