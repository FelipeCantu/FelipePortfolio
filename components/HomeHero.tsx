'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { trackEvent } from '@/lib/analytics'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  href: string
  icon: React.ComponentType<{ size?: number }>
  label: string
  hoverBg: string
  hoverBorder: string
  hoverShadow: string
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/FelipeCantu',
    icon: FaGithub,
    label: 'GitHub profile',
    hoverBg: 'rgba(110, 84, 148, 0.35)',
    hoverBorder: 'rgba(110, 84, 148, 0.7)',
    hoverShadow: '0 4px 16px rgba(110, 84, 148, 0.25)',
  },
  {
    href: 'https://linkedin.com/in/felipe-cantu-jr',
    icon: FaLinkedin,
    label: 'LinkedIn profile',
    hoverBg: 'rgba(0, 119, 181, 0.35)',
    hoverBorder: 'rgba(0, 119, 181, 0.7)',
    hoverShadow: '0 4px 16px rgba(0, 119, 181, 0.25)',
  },
  {
    href: 'https://instagram.com/son_of_robot_',
    icon: FaInstagram,
    label: 'Instagram profile',
    hoverBg: 'rgba(225, 48, 108, 0.35)',
    hoverBorder: 'rgba(225, 48, 108, 0.7)',
    hoverShadow: '0 4px 16px rgba(225, 48, 108, 0.25)',
  },
  {
    href: 'https://facebook.com/profile.php?id=100064306140476',
    icon: FaFacebook,
    label: 'Facebook profile',
    hoverBg: 'rgba(24, 119, 242, 0.35)',
    hoverBorder: 'rgba(24, 119, 242, 0.7)',
    hoverShadow: '0 4px 16px rgba(24, 119, 242, 0.25)',
  },
]

// ─── Orbit helpers — all layout/animation values in inline styles ─────────────
// Using inline styles here because the animation keyframes reference CSS custom
// properties (--radiusX, --radiusY) that can't be expressed in Tailwind classes.

interface OrbitCircleProps {
  size: string
  color: string
  radiusX: string
  radiusY: string
  duration: string
  delay: string
  reverse?: boolean
}

function OrbitCircle({ size, color, radiusX, radiusY, duration, delay, reverse }: OrbitCircleProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
        // CSS custom props for the keyframe animation
        ['--radiusX' as string]: radiusX,
        ['--radiusY' as string]: radiusY,
        animation: `${reverse ? 'ovalOrbitReverse' : 'ovalOrbit'} ${duration} linear infinite`,
        animationDelay: delay,
        boxShadow: `0 0 20px ${color}`,
        zIndex: 1,
      }}
    />
  )
}

interface OrbitDotProps {
  size: string
  glow: string
  radiusX: string
  radiusY: string
  duration: string
  delay: string
  reverse?: boolean
}

function OrbitDot({ size, glow, radiusX, radiusY, duration, delay, reverse }: OrbitDotProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: 'white',
        borderRadius: '50%',
        ['--radiusX' as string]: radiusX,
        ['--radiusY' as string]: radiusY,
        animation: `${reverse ? 'ovalOrbitReverse' : 'ovalOrbit'} ${duration} linear infinite`,
        animationDelay: delay,
        boxShadow: glow,
        zIndex: 1,
      }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeHero() {
  return (
    <>
      {/* Global keyframes — injected once per mount */}
      <style>{`
        @keyframes ovalOrbit {
          0%   { transform: rotate(0deg)    translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
          100% { transform: rotate(360deg)  translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(-360deg); }
        }
        @keyframes ovalOrbitReverse {
          0%   { transform: rotate(0deg)    translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(360deg); }
        }
        @keyframes heroPing {
          0%   { transform: scale(0.8); opacity: 0.8; }
          70%  { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes heroRotate {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes heroRotateReverse {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes fadeInScale {
          0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          100% { opacity: 1; transform: scale(1)   rotate(0deg); }
        }
        @keyframes heroSlideUp {
          0%   { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideRight {
          0%   { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroPopIn {
          0%   { opacity: 0; transform: scale(0)   translateY(20px); }
          50%  { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1)   translateY(0); }
        }
        @keyframes heroBgZoom {
          0%   { transform: scale(1.2); filter: blur(10px); }
          100% { transform: scale(1);   filter: blur(0px); }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-orbit] { animation: none !important; }
        }
      `}</style>

      <section className="relative w-full h-screen overflow-hidden" style={{ height: '100svh' }}>
        {/* Background image */}
        <img
          src="/images/mainbg.jpg"
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          style={{ animation: 'heroBgZoom 1.5s cubic-bezier(0.4,0,0.2,1) forwards' }}
        />

        {/* Wrapper — dark overlay + centered layout */}
        <div
          className="flex flex-col justify-center items-center w-full h-full px-8 relative"
          style={{ background: 'rgba(20, 20, 30, 0.85)', animation: 'fadeIn 0.8s ease-out' }}
        >
          {/* ── Orbit decoration ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* Pulsing ring circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Ping circle */}
              <div data-orbit style={{ position: 'absolute', width: '200px', height: '200px', border: '2px solid rgba(247,171,10,0.5)', borderRadius: '50%', opacity: 0.2, animation: 'heroPing 2.5s ease-out infinite' }} />
              <div data-orbit style={{ position: 'absolute', width: '300px', height: '300px', border: '2px solid rgba(51,51,51,0.7)', borderRadius: '50%', opacity: 0.2, animation: 'heroRotate 40s linear infinite' }} />
              <div data-orbit style={{ position: 'absolute', width: '500px', height: '500px', border: '3px solid rgba(51,51,51,0.5)', borderRadius: '50%', opacity: 0.2, animation: 'heroRotateReverse 60s linear infinite' }} />
              <div data-orbit style={{ position: 'absolute', width: '650px', height: '650px', border: '4px solid rgba(247,171,10,0.3)', borderRadius: '50%', opacity: 0.3, animation: 'heroRotate 80s linear infinite' }} />
              <div data-orbit style={{ position: 'absolute', width: '800px', height: '800px', border: '3px solid rgba(51,51,51,0.4)', borderRadius: '50%', opacity: 0.2, animation: 'heroRotateReverse 100s linear infinite' }} />
              <div data-orbit style={{ position: 'absolute', width: '1200px', height: '1200px', border: '4px solid rgba(247,171,10,0.2)', borderRadius: '50%', opacity: 0.15, animation: 'heroRotate 150s linear infinite' }} />
            </div>

            {/* Oval orbit rings */}
            <div className="absolute top-1/2 left-1/2 w-full h-full flex items-center justify-center">
              <div data-orbit style={{ position: 'absolute', width: '1100px', height: '900px', border: '3px dotted rgba(100,200,255,0.2)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'heroRotateReverse 120s linear infinite', opacity: 0.5 }} />
              <div data-orbit style={{ position: 'absolute', width: '600px', height: '400px', border: '2px dashed rgba(100,200,255,0.4)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'heroRotate 50s linear infinite', opacity: 0.5 }} />
              <div data-orbit style={{ position: 'absolute', width: '450px', height: '300px', border: '2px dotted rgba(255,255,255,0.3)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'heroRotateReverse 40s linear infinite', opacity: 0.5 }} />
              <div data-orbit style={{ position: 'absolute', width: '300px', height: '200px', border: '2px solid rgba(0,191,255,0.25)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'heroRotate 30s linear infinite', opacity: 0.5 }} />
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0">
              <OrbitCircle size="20px" color="rgba(247,171,10,0.7)"    radiusX="550px" radiusY="450px" duration="60s" delay="0s" />
              <OrbitCircle size="16px" color="rgba(100,200,255,0.7)"   radiusX="550px" radiusY="450px" duration="60s" delay="30s" reverse />
              <OrbitCircle size="16px" color="rgba(30,144,255,0.9)"    radiusX="280px" radiusY="180px" duration="30s" delay="0s" />
              <OrbitCircle size="12px" color="rgba(247,171,10,0.8)"    radiusX="280px" radiusY="180px" duration="30s" delay="10s" reverse />
              <OrbitCircle size="14px" color="rgba(100,200,255,0.8)"   radiusX="200px" radiusY="130px" duration="25s" delay="3s" />
              <OrbitCircle size="10px" color="rgba(255,255,255,0.8)"   radiusX="200px" radiusY="130px" duration="25s" delay="7s" reverse />
              <OrbitCircle size="12px" color="rgba(0,191,255,0.8)"     radiusX="120px" radiusY="80px"  duration="20s" delay="5s" />
              <OrbitCircle size="18px" color="rgba(247,171,10,0.8)"    radiusX="120px" radiusY="80px"  duration="20s" delay="2s" reverse />
              <OrbitDot size="10px" glow="0 0 15px rgba(255,255,255,0.8)"   radiusX="300px" radiusY="200px" duration="35s" delay="0s" />
              <OrbitDot size="10px" glow="0 0 15px rgba(100,200,255,0.8)"  radiusX="300px" radiusY="200px" duration="35s" delay="5s" reverse />
              <OrbitDot size="8px"  glow="0 0 12px rgba(247,171,10,0.8)"   radiusX="220px" radiusY="150px" duration="28s" delay="2s" />
              <OrbitDot size="8px"  glow="0 0 12px rgba(255,255,255,0.8)"  radiusX="220px" radiusY="150px" duration="28s" delay="7s" reverse />
              <OrbitDot size="6px"  glow="0 0 10px rgba(0,191,255,0.8)"    radiusX="150px" radiusY="100px" duration="22s" delay="4s" />
            </div>
          </div>

          {/* ── Content ── */}
          <div
            className="flex flex-col lg:flex-row items-center justify-center max-w-[1200px] w-full gap-8 lg:gap-16 z-[2] relative"
            style={{ animation: 'heroSlideRight 1s cubic-bezier(0.34,1.56,0.64,1) 0.5s backwards' }}
          >
            {/* Hexagonal avatar */}
            <div
              className="relative w-[220px] h-[250px] max-md:w-[180px] max-md:h-[180px] z-[2] shrink-0"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'linear-gradient(135deg, rgba(0,191,255,0.3), rgba(30,144,255,0.1))',
                padding: '8px',
                animation: 'fadeInScale 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s backwards',
              }}
            >
              <img
                src="/images/avatarpic.png"
                alt="Felipe Cantu Jr"
                className="w-full h-full object-cover"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  filter: 'sepia(0.1) brightness(1.05)',
                  transition: 'all 0.4s ease',
                }}
              />
            </div>

            {/* Text content */}
            <div className="max-w-[560px] text-white z-[1] flex flex-col">
              <h1
                className="mb-5 bg-gradient-to-r from-[var(--color-accent-light,#38bdf8)] to-white bg-clip-text text-transparent"
                style={{
                  fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  animation: 'heroSlideUp 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.7s backwards',
                }}
              >
                I Build Web Apps That Grow Your Business
              </h1>

              <p
                className="text-white/80 mb-0"
                style={{
                  fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  animation: 'heroSlideUp 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.9s backwards',
                }}
              >
                Full-stack developer based in Dallas, TX. I help businesses and entrepreneurs launch fast, polished websites that attract clients and deliver real results.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-wrap gap-3 mt-7"
                style={{ animation: 'heroSlideUp 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.05s backwards' }}
              >
                <Link
                  href="/portfolio"
                  onClick={() => trackEvent('cta_click', { label: 'view_work' })}
                  className="inline-flex items-center px-6 py-[0.65rem] no-underline text-white font-bold text-[0.9rem] tracking-[0.02em] rounded-full transition-[background] duration-[220ms] focus-visible:outline-2 focus-visible:outline-[var(--color-accent,#0ea5e9)] focus-visible:outline-offset-[3px]"
                  style={{
                    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                    background: 'var(--color-accent, #0ea5e9)',
                    border: '1.5px solid var(--color-accent, #0ea5e9)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0284c7' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent, #0ea5e9)' }}
                >
                  View My Work
                </Link>
                <Link
                  href="/get-started"
                  onClick={() => trackEvent('cta_click', { label: 'start_project' })}
                  className="inline-flex items-center gap-[0.4rem] px-5 py-[0.65rem] no-underline font-semibold text-[0.9rem] tracking-[0.02em] rounded-full transition-all duration-[220ms] focus-visible:outline-2 focus-visible:outline-[var(--color-accent,#0ea5e9)] focus-visible:outline-offset-[3px]"
                  style={{
                    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                    color: 'var(--color-accent-light, #38bdf8)',
                    border: '1.5px solid rgba(14,165,233,0.38)',
                    background: 'rgba(14,165,233,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(14,165,233,0.18)'
                    el.style.borderColor = 'var(--color-accent, #0ea5e9)'
                    el.style.color = 'white'
                    el.style.transform = 'translateX(3px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(14,165,233,0.08)'
                    el.style.borderColor = 'rgba(14,165,233,0.38)'
                    el.style.color = 'var(--color-accent-light, #38bdf8)'
                    el.style.transform = ''
                  }}
                >
                  Start a Project &nbsp;→
                </Link>
              </div>
            </div>
          </div>

          {/* Social icons — bottom-right on desktop, bottom-center on mobile */}
          <div
            className="absolute bottom-6 right-10 max-md:right-auto max-md:left-1/2 max-md:-translate-x-1/2 max-md:bottom-5 flex gap-5 z-[3]"
            style={{ padding: '12px', margin: '-12px' }}
          >
            {socialLinks.map((social, i) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => trackEvent('social_click', { platform: social.label.toLowerCase() })}
                  className="flex items-center justify-center w-10 h-10 rounded-full no-underline transition-all duration-[250ms] focus-visible:outline-2 focus-visible:outline-[var(--color-accent,#0ea5e9)] focus-visible:outline-offset-[3px]"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '1.2rem',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    animation: `heroPopIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) ${1.1 + i * 0.15}s backwards`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'white'
                    el.style.transform = 'translateY(-4px)'
                    el.style.background = social.hoverBg
                    el.style.borderColor = social.hoverBorder
                    el.style.boxShadow = social.hoverShadow
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(255,255,255,0.75)'
                    el.style.transform = ''
                    el.style.background = 'rgba(255,255,255,0.07)'
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                    el.style.boxShadow = ''
                  }}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
