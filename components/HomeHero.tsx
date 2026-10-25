'use client'

import Link from 'next/link'
import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { trackEvent } from '@/lib/analytics'
import Typewriter, { type TypewriterPhrase } from '@/components/ui/Typewriter'

// ─── Data ─────────────────────────────────────────────────────────────────────

const socialLinks = [
  { href: 'https://github.com/FelipeCantu', icon: FaGithub, label: 'GitHub profile' },
  { href: 'https://linkedin.com/in/felipe-cantu-jr', icon: FaLinkedin, label: 'LinkedIn profile' },
  { href: 'https://instagram.com/son_of_robot_', icon: FaInstagram, label: 'Instagram profile' },
  { href: 'https://facebook.com/profile.php?id=100064306140476', icon: FaFacebook, label: 'Facebook profile' },
]

// Headline endings the typewriter cycles through, after a fixed "I build "
const headlinePhrases: TypewriterPhrase[] = [
  { text: 'web apps that ', highlight: 'grow your business' },
  { text: 'websites that ', highlight: 'turn visitors into clients' },
]

// ─── Motion ───────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const avatarIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
}

// ─── Decorative orbit ─────────────────────────────────────────────────────────
// Three slow, low-contrast rings with a few travelling dots. Purely decorative
// (aria-hidden) and static for reduced-motion users via `motion-safe:`.

function OrbitRing({
  size,
  duration,
  reverse,
  dot,
}: {
  size: string
  duration: string
  reverse?: boolean
  dot?: 'accent' | 'gold' | 'white'
}) {
  const dotColor = dot === 'gold' ? 'bg-gold' : dot === 'white' ? 'bg-fg' : 'bg-accent-light'
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-accent-light/[0.14] motion-safe:animate-[orbit_var(--d)_linear_infinite]"
      style={
        {
          width: size,
          height: size,
          marginLeft: `calc(${size} / -2)`,
          marginTop: `calc(${size} / -2)`,
          '--d': duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      {dot && (
        <span
          className={`absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${dotColor} shadow-[0_0_14px_2px_rgb(var(--c-accent)/0.55)]`}
        />
      )}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeHero() {
  // Parallax, two inputs. Scroll: as the hero scrolls away the orbit lags most,
  // the avatar a little, and the copy drifts up and fades. Pointer (mouse only):
  // layers shift against the cursor at different depths. Static for reduced motion.
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Pointer position relative to the hero centre, -0.5..0.5, eased with a spring
  const pointerX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const pointerY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const orbitX = useTransform(pointerX, (p) => p * -60)
  const orbitY = useTransform([scrollYProgress, pointerY], ([s, p]: number[]) => s * 480 + p * -60)
  const avatarX = useTransform(pointerX, (p) => p * 24)
  const avatarY = useTransform([scrollYProgress, pointerY], ([s, p]: number[]) => s * 200 + p * 24)
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15])

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate flex min-h-dvh w-full items-center overflow-hidden pb-16 pt-[calc(var(--navbar-h)+2rem)]"
    >
      {/* Ambient orbit decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 h-0 w-0 lg:left-[28%]"
          style={reduceMotion ? undefined : { x: orbitX, y: orbitY }}
        >
          <OrbitRing size="min(70vw, 420px)" duration="60s" dot="accent" />
          <OrbitRing size="min(100vw, 640px)" duration="90s" reverse dot="gold" />
          <OrbitRing size="min(140vw, 900px)" duration="140s" dot="white" />
        </motion.div>
        {/* Soft vignette so text always sits on a calm field */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(var(--c-bg)/0.7)_100%)]" />
      </div>

      <motion.div
        className="container-page grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20"
        variants={stack}
        initial="hidden"
        animate="show"
      >
        {/* Hexagonal avatar */}
        <motion.div variants={avatarIn} className="mx-auto lg:mx-0">
          <motion.div className="relative" style={reduceMotion ? undefined : { x: avatarX, y: avatarY }}>
            <div
              className="absolute -inset-4 rounded-full bg-accent/20 blur-3xl motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <div className="hex-clip relative h-[190px] w-[170px] bg-gradient-to-br from-accent-light/70 via-accent/30 to-accent-dark/10 p-[3px] sm:h-[250px] sm:w-[220px] lg:h-[330px] lg:w-[290px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatarpic.png"
                alt="Felipe Cantu Jr"
                width={290}
                height={330}
                className="hex-clip h-full w-full bg-surface object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div
          className="text-center lg:text-left"
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <motion.p variants={rise} className="eyebrow">
            Full-stack developer &middot; Dallas, TX
          </motion.p>

          <motion.h1 variants={rise} className="mt-4 text-display text-fg">
            <span className="sr-only">I build web apps that grow your business</span>
            <Typewriter prefix="I build " phrases={headlinePhrases} />
          </motion.h1>

          <motion.p variants={rise} className="lead mx-auto mt-6 max-w-xl lg:mx-0">
            I help businesses and entrepreneurs launch fast, polished websites that attract clients and deliver real
            results.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/portfolio"
              onClick={() => trackEvent('cta_click', { label: 'view_work' })}
              className="btn btn-primary"
            >
              View My Work
            </Link>
            <Link
              href="/get-started"
              onClick={() => trackEvent('cta_click', { label: 'start_project' })}
              className="btn btn-secondary group"
            >
              Start a Project
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.ul variants={rise} className="mt-10 flex justify-center gap-3 lg:justify-start">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => trackEvent('social_click', { platform: label.toLowerCase() })}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line/25 bg-white/[0.04] text-muted transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-accent-light/60 hover:bg-accent/10 hover:text-fg"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
