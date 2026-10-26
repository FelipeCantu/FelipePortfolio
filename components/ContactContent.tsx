'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaMapPin, FaPhoneAlt, FaArrowRight } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { trackEvent } from '@/lib/analytics'
import ContactForm from './ContactForm'

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  { icon: FaMapPin, label: 'Address', value: 'Dallas, TX', href: null },
  { icon: FaPhoneAlt, label: 'Phone', value: '817-999-7951', href: 'tel:817-999-7951' },
  { icon: MdEmail, label: 'Email', value: 'cantujr.felipe@gmail.com', href: 'mailto:cantujr.felipe@gmail.com' },
]

const socialLinks = [
  { href: 'https://github.com/FelipeCantu', icon: FaGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/felipe-cantu-jr/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/son_of_robot_/', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=100064306140476', icon: FaFacebook, label: 'Facebook' },
]

// ─── Motion ──────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const
const stack: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactContent() {
  return (
    <div className="container-page page-top pb-section">
      <motion.div variants={stack} initial="hidden" animate="show">
        <motion.header variants={rise} className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-h1 text-fg">Say hello</h1>
          <p className="lead mt-3">
            Have a question or just want to connect? Send me a message and I'll get back to you soon.
          </p>
        </motion.header>

        {/* grid-cols-1 = minmax(0,1fr): lets the column shrink below the email's width on small phones */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* ── Form ── */}
          <motion.section variants={rise} aria-labelledby="contact-form-title" className="card p-6 sm:p-8 lg:p-10">
            <h2 id="contact-form-title" className="text-h3 text-fg">
              Send a message
            </h2>

            <div className="mt-6">
              <ContactForm />
            </div>

            {/* Collab block */}
            <div className="mt-8 border-t border-line/15 pt-6">
              <h3 className="text-lg text-fg">Let's collaborate</h3>
              <p className="mb-3 mt-2 text-small text-muted">
                Open to working with other developers. If you're building something interesting, I'd love to hear about
                it.
              </p>
              <Link
                href="/get-started"
                onClick={() => trackEvent('cta_click', { label: 'start_project_contact' })}
                className="group inline-flex items-center gap-2 text-small font-semibold text-accent-light underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
              >
                Start a project
                <FaArrowRight
                  aria-hidden="true"
                  className="text-[0.8em] transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.section>

          {/* ── Info ── */}
          <motion.section variants={rise} aria-labelledby="contact-info-title" className="flex flex-col gap-6">
            <div className="card p-6 sm:p-8">
              <h2 id="contact-info-title" className="text-h3 text-fg">
                Find me here
              </h2>
              <p className="mt-2 text-small text-muted">Prefer a direct line? Here's where you can reach me.</p>

              <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <>
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-control border border-accent/25 bg-accent/10 text-accent-light transition-colors duration-300 group-hover:bg-accent/20">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow block !text-[0.7rem]">{item.label}</span>
                        <span className="mt-0.5 block text-fg [overflow-wrap:anywhere]">{item.value}</span>
                      </span>
                    </>
                  )
                  const base =
                    'group flex items-center gap-4 rounded-card border border-line/15 bg-white/[0.03] px-4 py-3.5 no-underline'
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`${base} transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.06]`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={base}>{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="card p-6 sm:p-8">
              <h2 className="text-lg text-fg">Connect with me</h2>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-3 p-0">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-line/25 bg-white/[0.04] text-muted transition-[color,border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-accent-light/60 hover:bg-accent/10 hover:text-fg"
                    >
                      <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  )
}
