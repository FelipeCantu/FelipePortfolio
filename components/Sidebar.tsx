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

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  return (
    <nav>
      <ul
        id="mobile-sidebar"
        className={clsx(
          // Desktop: fixed row top-right, always visible
          'fixed top-0 right-0 h-[60px] flex flex-row flex-nowrap items-center list-none m-0 p-0 pr-[10px] z-[1300] xl:pr-[200px]',
          // Mobile: full-height slide drawer
          'max-md:flex-col max-md:flex-nowrap max-md:w-[280px] max-md:h-screen max-md:bg-[rgba(10,12,22,0.96)] max-md:backdrop-blur-[24px] max-md:border-l max-md:border-white/[0.08] max-md:shadow-[-12px_0_40px_rgba(0,0,0,0.55)] max-md:pt-20 max-md:pb-8 max-md:justify-start max-md:items-start max-md:transition-transform max-md:duration-[320ms] max-md:ease-[cubic-bezier(0.4,0,0.2,1)]',
          open ? 'max-md:translate-x-0' : 'max-md:translate-x-full'
        )}
      >
        {/* Mobile drawer header */}
        <li className="hidden max-md:flex items-center gap-3 px-6 pb-5 mb-2 border-b border-white/[0.07] w-full">
          <img src="/images/mainwlogo.png" alt="FC Logo" className="w-9 h-9 object-contain flex-shrink-0" />
          <span className="font-display font-bold text-[0.88rem] tracking-[-0.01em] text-white/75">
            Felipe Cantu Jr
          </span>
        </li>

        {NAV_LINKS.map(({ href, label }) => (
          <li
            key={href}
            className="text-white mx-5 my-0 relative max-md:mx-0 max-md:my-0 max-md:w-full max-md:border-b max-md:border-white/[0.05]"
          >
            <Link
              href={href}
              onClick={onClose}
              className={clsx(
                'font-body font-medium text-[0.95rem] tracking-[0.02em] no-underline transition-colors duration-200',
                'text-white/[0.82] hover:text-accent',
                'max-md:block max-md:w-full max-md:px-6 max-md:py-4 max-md:text-[1.05rem] max-md:text-white/75 max-md:border-l-2 max-md:border-l-transparent max-md:hover:text-white max-md:hover:bg-[rgba(14,165,233,0.07)] max-md:hover:border-l-[rgba(14,165,233,0.7)]',
                pathname === href && 'text-accent max-md:text-accent max-md:border-l-accent'
              )}
            >
              {label}
            </Link>
          </li>
        ))}

        <li className="max-md:mt-4 max-md:mx-0 max-md:px-6 max-md:w-full mx-5">
          <Link
            href="/get-started"
            onClick={onClose}
            className="inline-block bg-gold px-5 py-[0.55rem] rounded-full text-[#1a1a1a] text-[0.88rem] font-bold font-body tracking-[0.02em] no-underline transition-all duration-[220ms] border-2 border-transparent whitespace-nowrap hover:bg-transparent hover:text-gold hover:border-gold hover:shadow-[0_6px_16px_rgba(247,171,10,0.22)] hover:-translate-y-0.5 max-md:block max-md:w-full max-md:px-6 max-md:py-[0.85rem] max-md:rounded-[12px] max-md:text-center max-md:text-base max-md:hover:bg-[#e09c00] max-md:hover:text-[#1a1a1a] max-md:hover:border-transparent max-md:hover:shadow-none max-md:hover:translate-y-0"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  )
}
