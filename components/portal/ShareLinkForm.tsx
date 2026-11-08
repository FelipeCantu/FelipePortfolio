'use client'
import { useActionState, useEffect, useRef } from 'react'
import { FiLink } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export default function ShareLinkForm({ action, allowApproval = false }: { action: (s: FormState, f: FormData) => Promise<FormState>; allowApproval?: boolean }) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state?.ok) ref.current?.reset()
  }, [state])

  return (
    <form ref={ref} action={formAction} className="grid gap-2">
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <input name="url" type="url" required placeholder="https://figma.com/… or drive.google.com/…" className="field !min-h-[2.5rem] !py-2 text-small" aria-label="Link URL" />
        <input name="name" placeholder="Label (optional)" className="field !min-h-[2.5rem] !py-2 text-small" aria-label="Link label" />
        <button type="submit" className="btn btn-secondary btn-sm" disabled={pending}>
          <FiLink aria-hidden="true" /> Share link
        </button>
      </div>
      {allowApproval && (
        <label className="flex items-center gap-2 text-small text-muted">
          <input type="checkbox" name="requiresApproval" className="h-4 w-4 accent-[rgb(var(--c-accent))]" /> Needs client approval
        </label>
      )}
      {state?.error && <p className="text-[0.8rem] text-danger" role="alert">{state.error}</p>}
    </form>
  )
}
