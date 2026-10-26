'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blogs' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface Props {
  open: boolean
  onClose: () => void
}

/**
 * Primary navigation. Desktop: a row pinned to the right of the top bar.
 * Mobile (<lg): an off-canvas drawer toggled by <HamburgerButton>.
 */
export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  // A link is current for its own path and any nested path beneath it
  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <nav aria-label="Primary">
      <ul
        id="mobile-sidebar"
        className={clsx(
          // Desktop: row pinned to the top-right, aligned with the content column
          'pr-nav-gutter fixed right-0 top-0 z-[1300] m-0 flex h-nav list-none flex-row items-center gap-1 p-0',
          // Mobile: full-height slide-in drawer
          'max-lg:h-dvh max-lg:w-[min(86vw,320px)] max-lg:flex-col max-lg:items-stretch max-lg:gap-0 max-lg:overflow-y-auto max-lg:border-l max-lg:border-line/20 max-lg:bg-bg/[0.97] max-lg:pb-8 max-lg:pl-0 max-lg:pr-0 max-lg:pt-24 max-lg:shadow-[-16px_0_48px_rgba(0,0,0,0.6)] max-lg:backdrop-blur-xl',
          'max-lg:transition-[transform,visibility] max-lg:duration-[320ms] max-lg:ease-out-expo',
          // Closed drawer is also removed from the tab order / a11y tree
          open ? 'max-lg:visible max-lg:translate-x-0' : 'max-lg:invisible max-lg:translate-x-full'
        )}
      >
        {/* Mobile drawer brand header */}
        <li className="mb-2 hidden w-full items-center gap-3 border-b border-line/15 px-6 pb-5 max-lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mainwlogo.png" alt="" width={36} height={36} className="h-9 w-9 flex-shrink-0 object-contain" />
          <span className="font-display text-base font-bold tracking-tight text-fg">Felipe Cantu Jr</span>
        </li>

        {NAV_LINKS.map(({ href, label }) => {
          const current = isCurrent(href)
          return (
            <li key={href} className="max-lg:w-full">
              <Link
                href={href}
                onClick={onClose}
                aria-current={current ? 'page' : undefined}
                className={clsx(
                  'group relative block rounded-pill px-3.5 py-2 text-[0.95rem] font-medium no-underline transition-colors duration-200',
                  'text-muted hover:text-fg aria-[current=page]:text-fg',
                  // Mobile: full-width rows with a left accent rail
                  'max-lg:rounded-none max-lg:border-l-2 max-lg:border-l-transparent max-lg:px-6 max-lg:py-4 max-lg:text-lg',
                  'max-lg:hover:bg-accent/[0.07] max-lg:aria-[current=page]:border-l-accent-light max-lg:aria-[current=page]:bg-accent/[0.08]'
                )}
              >
                {label}
                {/* Desktop active/hover underline */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-light transition-transform duration-300 ease-out-expo max-lg:hidden',
                    current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            </li>
          )
        })}

        <li className="ml-3 max-lg:ml-0 max-lg:mt-5 max-lg:w-full max-lg:px-6">
          <Link
            href="/get-started"
            onClick={onClose}
            className="btn btn-gold btn-sm max-lg:w-full max-lg:min-h-[3rem] max-lg:text-base"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  )
}
