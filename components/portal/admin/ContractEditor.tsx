'use client'
import { useActionState } from 'react'
import { FiCheck } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export default function ContractEditor({
  action,
  title,
  body,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  title: string
  body: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  return (
    <form action={formAction} className="grid gap-4">
      <label className="text-small text-muted">
        Title
        <input name="title" required defaultValue={title} className="field mt-1" />
      </label>
      <label className="text-small text-muted">
        Agreement text
        <textarea name="body" required defaultValue={body} className="field mt-1 !min-h-[28rem] font-body text-[0.95rem] leading-relaxed" />
      </label>
      <p className="text-[0.8rem] text-subtle">
        This is a plain-English starting template, not legal advice. Edit it to fit the project, and consider having a lawyer review your standard version once.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" name="intent" value="send" className="btn btn-gold btn-sm" disabled={pending}>Send to client to sign</button>
        <button type="submit" name="intent" value="draft" className="btn btn-secondary btn-sm" disabled={pending}>Save draft</button>
        {state?.ok && <span className="flex items-center gap-1 text-small text-success" role="status"><FiCheck aria-hidden="true" /> {state.ok}</span>}
        {state?.error && <span className="text-small text-danger" role="alert">{state.error}</span>}
      </div>
    </form>
  )
}
