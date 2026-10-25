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
 * Mobile (<md): an off-canvas drawer toggled by <HamburgerButton>.
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
          'max-md:h-dvh max-md:w-[min(86vw,320px)] max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:overflow-y-auto max-md:border-l max-md:border-line/20 max-md:bg-bg/[0.97] max-md:pb-8 max-md:pl-0 max-md:pr-0 max-md:pt-24 max-md:shadow-[-16px_0_48px_rgba(0,0,0,0.6)] max-md:backdrop-blur-xl',
          'max-md:transition-[transform,visibility] max-md:duration-[320ms] max-md:ease-out-expo',
          // Closed drawer is also removed from the tab order / a11y tree
          open ? 'max-md:visible max-md:translate-x-0' : 'max-md:invisible max-md:translate-x-full'
        )}
      >
        {/* Mobile drawer brand header */}
        <li className="mb-2 hidden w-full items-center gap-3 border-b border-line/15 px-6 pb-5 max-md:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mainwlogo.png" alt="" width={36} height={36} className="h-9 w-9 flex-shrink-0 object-contain" />
          <span className="font-display text-base font-bold tracking-tight text-fg">Felipe Cantu Jr</span>
        </li>

        {NAV_LINKS.map(({ href, label }) => {
          const current = isCurrent(href)
          return (
            <li key={href} className="max-md:w-full">
              <Link
                href={href}
                onClick={onClose}
                aria-current={current ? 'page' : undefined}
                className={clsx(
                  'group relative block rounded-pill px-3.5 py-2 text-[0.95rem] font-medium no-underline transition-colors duration-200',
                  'text-muted hover:text-fg aria-[current=page]:text-fg',
                  // Mobile: full-width rows with a left accent rail
                  'max-md:rounded-none max-md:border-l-2 max-md:border-l-transparent max-md:px-6 max-md:py-4 max-md:text-lg',
                  'max-md:hover:bg-accent/[0.07] max-md:aria-[current=page]:border-l-accent-light max-md:aria-[current=page]:bg-accent/[0.08]'
                )}
              >
                {label}
                {/* Desktop active/hover underline */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-light transition-transform duration-300 ease-out-expo max-md:hidden',
                    current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            </li>
          )
        })}

        <li className="ml-3 max-md:ml-0 max-md:mt-5 max-md:w-full max-md:px-6">
          <Link
            href="/get-started"
            onClick={onClose}
            className="btn btn-gold btn-sm max-md:w-full max-md:min-h-[3rem] max-md:text-base"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  )
}
