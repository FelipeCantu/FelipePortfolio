import { FiCreditCard, FiHeart, FiSend, FiTrash2 } from 'react-icons/fi'
import { Badge, Panel } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import { fmtDate, money } from '@/lib/portal/format'
import { nextBillingDate, today } from '@/lib/portal/carePlans'
import { billCareNowAction, removeCarePlanAction, saveCarePlanAction, startCarePlanAction } from '@/app/portal/admin/actions'
import { adminStopAutopayAction } from '@/app/portal/admin/more-actions'
import type { Project } from '@/lib/portal/types'

/** Monthly maintenance: price, billing day and what's included. Invoices go out automatically. */
export default function AdminCarePlanPanel({ project }: { project: Project }) {
  const plan = project.carePlan
  const title = <span className="flex items-center gap-2"><FiHeart aria-hidden="true" /> Monthly care plan</span>

  if (!plan) {
    return (
      <Panel title={title} id="care">
        <p className="text-small text-muted">Keep looking after this site after launch for a monthly fee: updates, backups, monitoring and small changes. The invoice is created and emailed automatically each month.</p>
        <form action={startCarePlanAction.bind(null, project.id)} className="mt-3">
          <button className="btn btn-secondary btn-sm">Set up a care plan</button>
        </form>
      </Panel>
    )
  }

  const next = nextBillingDate(project)
  const billedThisMonth = plan.lastBilled === today().ym
  return (
    <Panel
      title={title}
      id="care"
      action={<Badge tone={plan.active ? 'success' : 'neutral'}>{plan.active ? `${money(plan.amount)}/mo` : 'Paused'}</Badge>}
    >
      <p className="mb-3 text-small text-muted">
        {plan.active
          ? <>Next invoice <strong className="text-fg">{fmtDate(next)}</strong>, due 7 days later. Payment reminders follow automatically.{!billedThisMonth && plan.startsFrom && plan.startsFrom > today().ym ? ' To bill this month too, use the button below.' : ''}</>
          : 'Billing is off. Turn it on once the client has agreed to the plan.'}
        {plan.lastBilled ? ` Last billed: ${plan.lastBilled}.` : ''}
      </p>
      <div className="mb-4 rounded-control border border-line/15 bg-bg/40 px-3 py-2.5 text-small">
        {plan.autopay ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-fg">
              <FiCreditCard className="mr-1.5 inline text-success" aria-hidden="true" />
              Auto-pay on: <span className="capitalize">{plan.autopay.brand}</span> ending {plan.autopay.last4}, saved by {plan.autopay.enabledBy} {fmtDate(plan.autopay.enabledAt)}
            </p>
            <form action={adminStopAutopayAction.bind(null, project.id)}>
              <button className="btn btn-ghost btn-sm">Turn off</button>
            </form>
          </div>
        ) : (
          <p className="text-muted">Auto-pay is off. The client can save a card from their project page so each month is charged automatically.</p>
        )}
        {plan.autopayError && <p className="mt-1 text-danger">Last automatic charge failed: {plan.autopayError}</p>}
      </div>
      <StateForm action={saveCarePlanAction.bind(null, project.id)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-small text-muted">Monthly price ($)<input name="amount" inputMode="decimal" defaultValue={plan.amount ? (plan.amount / 100).toFixed(2) : ''} placeholder="e.g. 150" className="field mt-1" /></label>
          <label className="text-small text-muted">Bill on day<input name="billingDay" type="number" min={1} max={28} defaultValue={plan.billingDay} className="field mt-1" /></label>
        </div>
        <label className="text-small text-muted">
          What’s included (one per line — the client sees this)
          <textarea name="includes" defaultValue={plan.includes.join('\n')} className="field mt-1 !min-h-[7rem]" />
        </label>
        <label className="flex items-center gap-2 text-small text-fg">
          <input type="checkbox" name="active" defaultChecked={plan.active} className="h-4 w-4 accent-accent" />
          Bill automatically every month
        </label>
      </StateForm>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-line/10 pt-3">
        {plan.active && plan.amount > 0 && !billedThisMonth && (
          <form action={billCareNowAction.bind(null, project.id)}>
            <button className="btn btn-gold btn-sm"><FiSend aria-hidden="true" /> Send this month’s invoice now</button>
          </form>
        )}
        <form action={removeCarePlanAction.bind(null, project.id)}>
          <button className="btn btn-ghost btn-sm text-danger"><FiTrash2 aria-hidden="true" /> Remove plan</button>
        </form>
      </div>
    </Panel>
  )
}
