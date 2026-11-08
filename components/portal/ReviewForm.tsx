'use client'
import { useActionState, useState } from 'react'
import { FiCheck, FiEdit3 } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export default function ReviewForm({ action }: { action: (state: FormState, form: FormData) => Promise<FormState> }) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [changes, setChanges] = useState(false)

  return (
    <form action={formAction} className="mt-3 grid gap-2">
      {changes && (
        <>
          <label className="sr-only" htmlFor="review-note">What should change?</label>
          <textarea id="review-note" name="note" rows={3} className="field !min-h-[5rem] text-small" placeholder="What would you like changed? Be as specific as you can." autoFocus />
        </>
      )}
      {state?.error && <p className="text-[0.8rem] text-danger" role="alert">{state.error}</p>}
      <div className="flex flex-wrap gap-2">
        {!changes ? (
          <>
            <button type="submit" name="decision" value="approve" className="btn btn-sm bg-success/90 text-[#03140d] hover:bg-success" disabled={pending}>
              <FiCheck aria-hidden="true" /> Approve
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setChanges(true)}>
              <FiEdit3 aria-hidden="true" /> Request changes
            </button>
          </>
        ) : (
          <>
            <button type="submit" name="decision" value="changes" className="btn btn-primary btn-sm" disabled={pending}>
              {pending ? 'Sending…' : 'Send feedback'}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setChanges(false)}>Cancel</button>
          </>
        )}
      </div>
    </form>
  )
}
