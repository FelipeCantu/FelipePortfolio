'use client'
import { useActionState, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

/**
 * Two-way answer with an optional note: approve / decline a change request,
 * or approve / request changes on a preview. The form posts `decision`
 * ("approve" or "decline") and `note`.
 */
export default function DecisionForm({
  action,
  approveLabel = 'Approve',
  declineLabel = 'Decline',
  notePrompt = 'Anything Felipe should know? (optional)',
  declineSubmit = 'Send',
  noteRequired = false,
}: {
  action: (state: FormState, form: FormData) => Promise<FormState>
  approveLabel?: string
  declineLabel?: string
  notePrompt?: string
  declineSubmit?: string
  noteRequired?: boolean
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [declining, setDeclining] = useState(false)

  return (
    <form action={formAction} className="mt-3 grid gap-2">
      {declining && (
        <>
          <label className="sr-only" htmlFor="decision-note">{notePrompt}</label>
          <textarea id="decision-note" name="note" rows={3} required={noteRequired} className="field !min-h-[5rem] text-small" placeholder={notePrompt} autoFocus />
        </>
      )}
      {state?.error && <p className="text-[0.8rem] text-danger" role="alert">{state.error}</p>}
      <div className="flex flex-wrap gap-2">
        {!declining ? (
          <>
            <button type="submit" name="decision" value="approve" className="btn btn-sm bg-success/90 text-[#03140d] hover:bg-success" disabled={pending}>
              <FiCheck aria-hidden="true" /> {pending ? 'Saving…' : approveLabel}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setDeclining(true)}>
              <FiX aria-hidden="true" /> {declineLabel}
            </button>
          </>
        ) : (
          <>
            <button type="submit" name="decision" value="decline" className="btn btn-primary btn-sm" disabled={pending}>
              {pending ? 'Sending…' : declineSubmit}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDeclining(false)}>Cancel</button>
          </>
        )}
      </div>
    </form>
  )
}
