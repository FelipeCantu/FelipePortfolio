'use client'
import { useActionState } from 'react'
import type { FormState } from '@/app/portal/actions'
import type { Proposal } from '@/lib/portal/types'

/** Create or edit a proposal: an intro and up to three priced options. */
export default function ProposalEditor({
  action,
  proposal,
  defaults,
  depositPercent,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  proposal?: Proposal
  defaults: { title: string; intro: string; validUntil: string; price?: string }
  depositPercent: number
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const options = proposal?.options ?? []
  const recommended = Math.max(0, options.findIndex((o) => o.recommended))
  const placeholders = [
    { name: 'Essential', hint: 'The must-haves' },
    { name: 'Standard', hint: 'What most clients pick' },
    { name: 'Premium', hint: 'Everything, plus extras' },
  ]

  return (
    <form action={formAction} className="grid gap-5">
      <label className="text-small text-muted">
        Title
        <input name="title" required maxLength={140} defaultValue={proposal?.title ?? defaults.title} className="field mt-1" />
      </label>
      <label className="text-small text-muted">
        Introduction (optional)
        <textarea name="intro" defaultValue={proposal?.intro ?? defaults.intro} className="field mt-1 !min-h-[8rem]" placeholder="What you understood about their goals and how you’ll approach it." />
      </label>

      <fieldset className="grid gap-4">
        <legend className="field-label">Options</legend>
        <p className="-mt-2 text-[0.8rem] text-subtle">Fill in one for a single quote, or up to three so the client can choose. Leave an option empty to skip it.</p>
        <div className="grid gap-4 lg:grid-cols-3">
          {placeholders.map((ph, i) => {
            const o = options[i]
            return (
              <div key={i} className="grid content-start gap-3 rounded-card border border-line/20 bg-bg/40 p-4">
                <label className="text-small text-muted">
                  Option {i + 1} name
                  <input name={`name${i}`} maxLength={80} defaultValue={o?.name ?? (i === 0 && !proposal ? 'Project' : '')} placeholder={ph.name} className="field mt-1" />
                </label>
                <label className="text-small text-muted">
                  Price ($)
                  <input name={`price${i}`} inputMode="decimal" defaultValue={o ? (o.price / 100).toFixed(2) : i === 0 ? defaults.price ?? '' : ''} placeholder="e.g. 4800" className="field mt-1" />
                </label>
                <label className="text-small text-muted">
                  Timeline (optional)
                  <input name={`timeline${i}`} maxLength={80} defaultValue={o?.timeline} placeholder="e.g. 4–6 weeks" className="field mt-1" />
                </label>
                <label className="text-small text-muted">
                  Short description (optional)
                  <textarea name={`description${i}`} defaultValue={o?.description} placeholder={ph.hint} className="field mt-1 !min-h-[4.5rem]" />
                </label>
                <label className="text-small text-muted">
                  What’s included (one per line)
                  <textarea name={`includes${i}`} defaultValue={o?.includes.join('\n')} placeholder={'5-page website\nContact form\nMobile friendly'} className="field mt-1 !min-h-[8rem]" />
                </label>
                <label className="flex items-center gap-2 text-small text-fg">
                  <input type="radio" name="recommended" value={i} defaultChecked={recommended === i} className="h-4 w-4 accent-[rgb(var(--c-accent))]" />
                  Mark as recommended
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,14rem)_1fr]">
        <label className="text-small text-muted">
          Valid until (optional)
          <input type="date" name="validUntil" defaultValue={proposal?.validUntil ?? defaults.validUntil} className="field mt-1" />
        </label>
        <fieldset className="grid content-start gap-2">
          <legend className="field-label">When the client accepts</legend>
          <label className="flex items-start gap-2 text-small text-fg">
            <input type="checkbox" name="autoContract" defaultChecked={proposal?.autoContract ?? true} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-accent))]" />
            <span>Send the project agreement for them to sign (from your template, with the accepted price)</span>
          </label>
          <label className="flex items-start gap-2 text-small text-fg">
            <input type="checkbox" name="autoDeposit" defaultChecked={proposal?.autoDeposit ?? true} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-accent))]" />
            <span>Send the {depositPercent}% deposit invoice</span>
          </label>
          <p className="text-[0.8rem] text-subtle">Either way, the accepted price becomes the project price. Untick both to handle the paperwork yourself.</p>
        </fieldset>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" name="intent" value="send" className="btn btn-gold btn-sm" disabled={pending}>{pending ? 'Working…' : 'Send to client'}</button>
        <button type="submit" name="intent" value="draft" className="btn btn-secondary btn-sm" disabled={pending}>Save draft</button>
        {state?.error && <span className="text-small text-danger" role="alert">{state.error}</span>}
      </div>
    </form>
  )
}
