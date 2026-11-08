'use client'
import { useActionState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { loginAction } from '@/app/portal/actions'

export default function LoginForm({ defaultEmail, linkError }: { defaultEmail?: string; linkError?: boolean }) {
  const [state, action, pending] = useActionState(loginAction, undefined)
  const error = state?.error ?? (linkError ? 'That sign-in link is no longer valid. Enter your email and the latest access code.' : undefined)

  return (
    <form action={action} className="grid gap-5" noValidate>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={defaultEmail} className="field" placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="code" className="field-label">Access code</label>
        <input
          id="code"
          name="code"
          required
          autoComplete="one-time-code"
          autoCapitalize="characters"
          spellCheck={false}
          className="field font-mono uppercase tracking-[0.2em]"
          placeholder="ABCD-2345"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'login-error' : 'code-hint'}
        />
        {!error && <p id="code-hint" className="field-hint">Felipe sends this when your project starts.</p>}
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
