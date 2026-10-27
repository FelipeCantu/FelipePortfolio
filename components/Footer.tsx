'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const SOCIAL = [
  { href: 'https://github.com/FelipeCantu', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/felipe-cantu-jr/', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'https://www.instagram.com/son_of_robot_/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/profile.php?id=100064306140476', label: 'Facebook', Icon: FaFacebook },
]

// Routes that manage their own full-height layout or are internal tools
const HIDDEN_ON = ['/about', '/admin']

export default function Footer() {
  const pathname = usePathname()
  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null

  return (
    <footer className="mt-auto border-t border-line/15 bg-bg/60">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-fg">Felipe Cantu Jr</p>
          <p className="mt-3 max-w-sm text-small text-muted">
            Full-stack developer in Dallas, TX building fast, polished web apps for businesses that want to grow.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-small text-muted">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>
            Available for new projects
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="grid gap-1">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-6 items-center text-small text-muted no-underline transition-colors hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="flex gap-3">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line/20 bg-white/[0.04] text-muted transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-light/60 hover:bg-accent/10 hover:text-fg"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="mailto:cantujr.felipe@gmail.com"
            className="mt-3 inline-block break-all py-0.5 text-small text-accent-light underline decoration-accent/40 underline-offset-4 hover:text-white"
          >
            cantujr.felipe@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-line/10">
        <p className="container-page py-5 text-[0.8rem] text-subtle">
          &copy; {new Date().getFullYear()} Felipe Cantu Jr. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
