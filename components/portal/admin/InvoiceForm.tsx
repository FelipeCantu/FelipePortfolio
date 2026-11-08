'use client'
import { useActionState, useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'
import { money } from '@/lib/portal/format'

type Row = { key: number; description: string; quantity: string; rate: string }

export default function InvoiceForm({
  action,
  projects,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  projects: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [rows, setRows] = useState<Row[]>([{ key: 0, description: '', quantity: '1', rate: '' }])
  const total = rows.reduce((s, r) => s + Math.round((Number(r.quantity) || 0) * (Number(r.rate) || 0) * 100), 0)
  const update = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)))

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-small text-muted sm:col-span-2">
          Title
          <input name="title" required placeholder="e.g. Website build — 50% deposit" className="field mt-1" />
        </label>
        <label className="text-small text-muted">
          Project
          <select name="projectId" className="field mt-1" defaultValue={projects[0]?.id ?? ''}>
            <option value="">— None —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
        <label className="text-small text-muted">
          Due date
          <input type="date" name="dueDate" className="field mt-1" />
        </label>
      </div>

      <fieldset className="grid gap-2">
        <legend className="field-label">Line items</legend>
        <div className="hidden grid-cols-[1fr_5rem_7rem_2.5rem] gap-2 px-1 text-[0.75rem] text-subtle sm:grid">
          <span>Description</span><span>Qty</span><span>Rate ($)</span><span />
        </div>
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-[1fr_5rem_7rem_2.5rem] gap-2 max-sm:grid-cols-[1fr_1fr_2.5rem]">
            <input name="itemDescription" value={r.description} onChange={(e) => update(r.key, { description: e.target.value })} placeholder="Design & development" className="field !min-h-[2.5rem] !py-2 max-sm:col-span-3" aria-label="Description" />
            <input name="itemQuantity" value={r.quantity} onChange={(e) => update(r.key, { quantity: e.target.value })} inputMode="decimal" className="field !min-h-[2.5rem] !py-2" aria-label="Quantity" />
            <input name="itemRate" value={r.rate} onChange={(e) => update(r.key, { rate: e.target.value })} inputMode="decimal" placeholder="0.00" className="field !min-h-[2.5rem] !py-2" aria-label="Rate in dollars" />
            <button type="button" className="inline-flex items-center justify-center rounded-full text-subtle hover:text-danger disabled:opacity-30" disabled={rows.length === 1} onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))} aria-label="Remove line">
              <FiTrash2 />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="btn btn-ghost btn-sm !pl-2" onClick={() => setRows((rs) => [...rs, { key: Date.now(), description: '', quantity: '1', rate: '' }])}>
            <FiPlus aria-hidden="true" /> Add line
          </button>
          <p className="text-small text-muted">
            Total <span className="ml-2 font-display text-xl font-bold text-fg">{money(total)}</span>
          </p>
        </div>
      </fieldset>

      <label className="text-small text-muted">
        Notes (shown on invoice)
        <textarea name="notes" placeholder="Payment terms, thank-you note…" className="field mt-1 !min-h-[5rem]" />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" name="intent" value="send" className="btn btn-gold btn-sm" disabled={pending}>Create &amp; send to client</button>
        <button type="submit" name="intent" value="draft" className="btn btn-secondary btn-sm" disabled={pending}>Save draft</button>
        {state?.error && <span className="text-small text-danger" role="alert">{state.error}</span>}
      </div>
    </form>
  )
}
