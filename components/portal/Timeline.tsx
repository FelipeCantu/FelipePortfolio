import { FiCheck } from 'react-icons/fi'
import clsx from 'clsx'
import type { Milestone } from '@/lib/portal/types'
import { MILESTONE_STATUS, fmtDate, isOverdue } from '@/lib/portal/format'
import { Badge } from './ui'

export default function Timeline({ milestones, renderActions }: { milestones: Milestone[]; renderActions?: (m: Milestone) => React.ReactNode }) {
  return (
    <ol className="relative grid gap-0">
      {milestones.map((m, i) => {
        const st = MILESTONE_STATUS[m.status]
        const last = i === milestones.length - 1
        const late = m.status !== 'done' && isOverdue(m.dueDate)
        return (
          <li key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                className={clsx('absolute left-[0.94rem] top-8 h-[calc(100%-2rem)] w-px', m.status === 'done' ? 'bg-success/50' : 'bg-line/20')}
                aria-hidden="true"
              />
            )}
            <span
              className={clsx(
                'relative z-[1] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[0.8rem] font-semibold',
                m.status === 'done' && 'border-success/50 bg-success/15 text-success',
                m.status === 'in_progress' && 'border-accent-light bg-accent/20 text-accent-light shadow-[0_0_0_4px_rgb(var(--c-accent)/0.12)]',
                m.status === 'todo' && 'border-line/30 bg-bg text-subtle'
              )}
              aria-hidden="true"
            >
              {m.status === 'done' ? <FiCheck /> : i + 1}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className={clsx('font-semibold', m.status === 'done' ? 'text-muted' : 'text-fg')}>{m.title}</p>
                <Badge tone={late ? 'warning' : st.tone}>{late ? 'Past target date' : st.label}</Badge>
              </div>
              {m.dueDate && <p className="text-[0.8rem] text-subtle">{m.status === 'done' ? 'Planned for' : 'Target'} {fmtDate(m.dueDate)}</p>}
              {m.description && <p className="mt-1 text-small text-muted">{m.description}</p>}
              {renderActions?.(m)}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
