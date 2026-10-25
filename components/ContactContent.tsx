'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaMapPin, FaPhoneAlt, FaArrowRight } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { trackEvent } from '@/lib/analytics'
import ContactForm from './ContactForm'

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  { icon: FaMapPin,   label: 'Address', value: 'Dallas, TX',               href: null },
  { icon: FaPhoneAlt, label: 'Phone',   value: '817-999-7951',             href: 'tel:817-999-7951' },
  { icon: MdEmail,    label: 'Email',   value: 'cantujr.felipe@gmail.com', href: 'mailto:cantujr.felipe@gmail.com' },
]

const socialLinks = [
  { href: 'https://github.com/FelipeCantu',                           icon: FaGithub,   label: 'GitHub',    color: '#6e5494' },
  { href: 'https://www.linkedin.com/in/felipe-cantu-jr/',             icon: FaLinkedin, label: 'LinkedIn',  color: '#0077b5' },
  { href: 'https://www.instagram.com/son_of_robot_/',                 icon: FaInstagram,label: 'Instagram', color: '#e4405f' },
  { href: 'https://www.facebook.com/profile.php?id=100064306140476',  icon: FaFacebook, label: 'Facebook',  color: '#1877f2' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactContent() {
  return (
    <>
      {/* Shimmer sweep keyframe for contact cards */}
      <style>{`
        @keyframes contactShimmer {
          0%   { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>

      <main
        className="relative min-h-screen w-full flex items-center justify-center"
        style={{
          padding: '1rem',
          paddingTop: 'calc(var(--navbar-h, 60px) + 1rem)',
        }}
      >
        {/* Fixed background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/images/mainbg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div
            className="grid gap-0 rounded-xl lg:rounded-[20px] overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
            style={{
              gridTemplateColumns: '1fr',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <style>{`
              @media (min-width: 1024px) {
                .contact-grid { grid-template-columns: 1fr 1fr !important; }
              }
            `}</style>

            {/* ── Form section ── */}
            <section
              className="contact-grid p-6 md:p-8 lg:p-10 xl:p-12"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="mb-6 md:mb-8">
                <h1
                  className="text-white mb-3 leading-[1.1]"
                  style={{
                    fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)",
                    fontSize: 'clamp(1.5rem,3vw,2.25rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Say Hello
                </h1>
                <p
                  className="text-white/75 leading-[1.7]"
                  style={{
                    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                    fontSize: 'clamp(0.9rem,1.5vw,1.05rem)',
                    fontWeight: 300,
                  }}
                >
                  Have a question or just want to connect? Send me a message and I'll get back to you soon.
                </p>

                {/* Collab block */}
                <div className="mt-5 pt-[1.1rem] border-t border-white/[0.08]">
                  <h2
                    className="text-white m-0 mb-[0.45rem] tracking-[-0.02em]"
                    style={{
                      fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)",
                      fontSize: 'clamp(1rem,2vw,1.2rem)',
                      fontWeight: 700,
                    }}
                  >
                    Let's Collaborate
                  </h2>
                  <p
                    className="text-white/55 leading-[1.65] m-0 mb-3"
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                    }}
                  >
                    Open to working with other developers — if you're building something interesting, I'd love to hear about it.
                  </p>
                  <p className="m-0">
                    <Link
                      href="/get-started"
                      onClick={() => trackEvent('cta_click', { label: 'start_project_contact' })}
                      className="inline-block no-underline font-semibold text-[0.9rem] transition-[color,text-decoration-color] duration-200"
                      style={{
                        fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                        color: 'var(--color-accent-light, #38bdf8)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        textDecorationColor: 'rgba(14,165,233,0.4)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'white'
                        el.style.textDecorationColor = 'rgba(14,165,233,0.9)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'var(--color-accent-light, #38bdf8)'
                        el.style.textDecorationColor = 'rgba(14,165,233,0.4)'
                      }}
                    >
                      Start a project <FaArrowRight style={{ display: 'inline', verticalAlign: 'middle', fontSize: '0.8em' }} />
                    </Link>
                  </p>
                </div>
              </div>

              <ContactForm />
            </section>

            {/* ── Info section ── */}
            <section
              className="p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col text-white"
              style={{ background: 'rgba(0,0,0,0.4)' }}
            >
              <div className="mb-6 md:mb-8">
                <h2
                  className="text-white mb-3 leading-[1.1] relative pb-4"
                  style={{
                    fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)",
                    fontSize: 'clamp(1.5rem,3vw,2.25rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Find Me Here
                  {/* Accent underline */}
                  <span
                    className="absolute bottom-0 left-0 w-12 h-[3px] rounded-sm"
                    style={{ background: 'linear-gradient(90deg, var(--color-accent,#0ea5e9), var(--color-accent-light,#38bdf8))' }}
                  />
                </h2>
                <p
                  className="text-white/65 leading-[1.7]"
                  style={{
                    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                    fontSize: 'clamp(0.9rem,1.5vw,1.05rem)',
                    fontWeight: 300,
                  }}
                >
                  Prefer a direct line? Here's where you can reach me.
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col gap-4 md:gap-5 mb-8">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  const card = (
                    <div
                      className="flex items-start gap-4 px-5 py-4 rounded-xl bg-white/[0.05] border border-white/[0.08] relative overflow-hidden transition-[background,border-color,box-shadow] duration-300 group"
                      style={{ cursor: item.href ? 'pointer' : 'default' }}
                    >
                      {/* Shimmer on hover */}
                      <span
                        className="absolute top-0 -left-full w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', animation: 'none' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = 'contactShimmer 0.55s ease forwards' }}
                      />
                      <div className="flex-shrink-0 mt-[0.125rem] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                        <Icon
                          className="w-[1.125rem] h-[1.125rem] sm:w-5 sm:h-5 transition-[color] duration-300"
                          style={{ color: 'var(--color-accent-light, #38bdf8)' }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="mb-[0.35rem] uppercase tracking-[0.12em] transition-[color] duration-300"
                          style={{
                            fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: 'var(--color-accent-light, #38bdf8)',
                          }}
                        >
                          {item.label}
                        </h3>
                        <p className="text-white text-[0.9rem] sm:text-base leading-[1.5] m-0 break-words">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )

                  return item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      aria-label={`${item.label}: ${item.value}`}
                      className="block no-underline text-inherit transition-transform duration-300 hover:-translate-y-[3px]"
                    >
                      {card}
                    </a>
                  ) : (
                    <div key={index} className="transition-transform duration-300 hover:-translate-y-[3px]">
                      {card}
                    </div>
                  )
                })}
              </div>

              {/* Social links */}
              <div className="mt-auto pt-6 md:pt-8 border-t border-white/10">
                <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-5 md:mb-6">
                  Connect With Me
                </h3>
                <div className="flex gap-4 md:gap-5 flex-wrap p-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 text-white transition-all duration-[400ms] cubic-bezier(0.25,0.8,0.25,1) hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = social.color
                          // Reveal the background pseudo-fill via inline bg
                          el.style.background = social.color
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'rgba(255,255,255,0.1)'
                          el.style.background = 'rgba(255,255,255,0.1)'
                        }}
                      >
                        <span className="relative z-[2] flex items-center justify-center w-full h-full">
                          <Icon
                            className="w-4 h-4 md:w-[1.125rem] md:h-[1.125rem] transition-all duration-[400ms]"
                          />
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
