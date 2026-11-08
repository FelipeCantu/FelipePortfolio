'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export interface Tab {
  href: string
  label: string
  exact?: boolean
  count?: number
}

export default function PortalTabs({ tabs, label = 'Portal' }: { tabs: Tab[]; label?: string }) {
  const pathname = usePathname()
  return (
    <nav aria-label={label} className="-mx-1 min-w-0 max-w-full overflow-x-auto">
      <ul className="flex gap-1 px-1">
        {tabs.map((t) => {
          const current = t.exact ? pathname === t.href : pathname === t.href || pathname.startsWith(`${t.href}/`)
          return (
            <li key={t.href} className="flex-shrink-0">
              <Link
                href={t.href}
                aria-current={current ? 'page' : undefined}
                className={clsx(
                  'inline-flex max-w-[14rem] items-center gap-2 rounded-pill px-4 py-2 text-[0.9rem] font-medium no-underline transition-colors',
                  current ? 'bg-accent/15 text-fg' : 'text-muted hover:bg-white/[0.05] hover:text-fg'
                )}
              >
                <span className="truncate">{t.label}</span>
                {!!t.count && (
                  <span className="rounded-pill bg-gold px-1.5 py-px font-mono text-[0.7rem] font-semibold text-gold-ink">{t.count}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
