import Link from 'next/link'
import clsx from 'clsx'
import type { Tone } from '@/lib/portal/format'

const TONES: Record<Tone, string> = {
  neutral: 'border-line/25 bg-white/[0.04] text-muted',
  accent: 'border-accent/35 bg-accent/10 text-accent-light',
  success: 'border-success/35 bg-success/10 text-success',
  warning: 'border-warning/35 bg-warning/10 text-warning',
  danger: 'border-danger/35 bg-danger/10 text-danger',
  muted: 'border-line/15 bg-transparent text-subtle',
}

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border px-2.5 py-0.5 text-xs font-semibold',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-2 flex items-baseline justify-between text-small">
          <span className="text-muted">{label}</span>
          <span className="font-mono font-medium text-fg">{value}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-pill bg-white/[0.06]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-pill bg-gradient-to-r from-accent-dark to-accent-light transition-[width] duration-700 ease-out-expo"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function Panel({
  title,
  action,
  children,
  className,
  id,
}: {
  title?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={clsx('card p-5 sm:p-6', className)}>
      {(title || action) && (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="text-lg font-bold text-fg">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export function Stat({ label, value, hint, href, tone }: { label: string; value: React.ReactNode; hint?: React.ReactNode; href?: string; tone?: Tone }) {
  const body = (
    <>
      <p className="text-[0.8rem] font-medium text-subtle">{label}</p>
      <p className={clsx('mt-1.5 font-display text-2xl font-bold tracking-tight', tone === 'warning' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-fg')}>
        {value}
      </p>
      {hint && <p className="mt-1 truncate text-[0.8rem] text-muted">{hint}</p>}
    </>
  )
  return href ? (
    <Link href={href} className="card-interactive block p-5 no-underline">
      {body}
    </Link>
  ) : (
    <div className="card p-5">{body}</div>
  )
}

export function Empty({ icon, title, children }: { icon?: React.ReactNode; title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-line/25 px-6 py-10 text-center">
      {icon && <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent-light">{icon}</div>}
      <p className="font-semibold text-fg">{title}</p>
      {children && <div className="mx-auto mt-1.5 max-w-sm text-small text-muted">{children}</div>}
    </div>
  )
}

export function PageHeader({ eyebrow, title, children, action }: { eyebrow?: string; title: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 text-h2 text-fg [overflow-wrap:anywhere]">{title}</h1>
        {children && <div className="mt-2 text-muted">{children}</div>}
      </div>
      {action}
    </header>
  )
}
