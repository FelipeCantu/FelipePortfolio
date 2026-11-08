'use client'
import { useActionState } from 'react'
import { FiAlertCircle, FiPenTool } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export default function SignForm({ action, defaultName }: { action: (s: FormState, f: FormData) => Promise<FormState>; defaultName: string }) {
  const [state, formAction, pending] = useActionState(action, undefined)
  return (
    <form action={formAction} className="card grid gap-4 border-accent/30 p-5 sm:p-6 print:hidden">
      <div>
        <h2 className="text-lg font-bold text-fg">Sign this agreement</h2>
        <p className="mt-1 text-small text-muted">Questions or changes? Send Felipe a message before signing.</p>
      </div>
      <div>
        <label htmlFor="sig-name" className="field-label">Type your full name</label>
        <input id="sig-name" name="name" required defaultValue={defaultName} autoComplete="name" className="field font-display text-lg italic" />
      </div>
      <label className="flex items-start gap-3 text-small text-fg">
        <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 flex-shrink-0 accent-[rgb(var(--c-accent))]" />
        <span>I have read and agree to this agreement, and I understand typing my name is my electronic signature.</span>
      </label>
      {state?.error && (
        <p role="alert" className="field-error !mt-0">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-fit" disabled={pending}>
        <FiPenTool aria-hidden="true" /> {pending ? 'Signing…' : 'Sign agreement'}
      </button>
    </form>
  )
}
