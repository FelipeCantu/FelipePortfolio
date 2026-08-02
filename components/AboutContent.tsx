'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiCode, FiLayout, FiZap, FiMessageSquare } from 'react-icons/fi'
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiDjango,
  SiFirebase, SiMongodb, SiFigma, SiTailwindcss, SiThreedotjs,
  SiSanity, SiPython, SiLinux, SiGit, SiVercel,
} from 'react-icons/si'

// ─── Animation variants ───────────────────────────────────────────────────────

const fromLeft = {
  hidden:  { opacity: 0, x: -52, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromRight = {
  hidden:  { opacity: 0, x: 52,  filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromBottom = {
  hidden:  { opacity: 0, y: 32,  filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)', transition: { duration: 0.7,  ease: [0.22, 1, 0.36, 1] } },
}
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const chipVariant = {
  hidden:  { opacity: 0, scale: 0.65, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 320, damping: 22 } },
}
const valueCardVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const dashCells = [
  { label: 'React',      color: 'var(--color-accent)',       glow: 0.85, Icon: SiReact },
  { label: 'Next.js',    color: 'var(--color-accent-light)', glow: 0.80, Icon: SiNextdotjs },
  { label: 'TypeScript', color: 'var(--color-gold)',         glow: 0.90, Icon: SiTypescript },
  { label: 'Node',       color: 'var(--color-accent-light)', glow: 0.60, Icon: SiNodedotjs },
  { label: 'Django',     color: 'var(--color-accent)',       glow: 0.65, Icon: SiDjango },
  { label: 'Firebase',   color: 'var(--color-gold)',         glow: 0.70, Icon: SiFirebase },
  { label: 'Mongo',      color: 'var(--color-accent)',       glow: 0.55, Icon: SiMongodb },
  { label: 'Figma',      color: 'var(--color-gold)',         glow: 0.75, Icon: SiFigma },
  { label: 'Tailwind',   color: 'var(--color-accent-light)', glow: 0.50, Icon: SiTailwindcss },
  { label: 'Three.js',   color: 'var(--color-accent)',       glow: 0.70, Icon: SiThreedotjs },
  { label: 'Sanity',     color: 'var(--color-gold)',         glow: 0.65, Icon: SiSanity },
  { label: 'Python',     color: 'var(--color-accent-light)', glow: 0.75, Icon: SiPython },
  { label: 'Linux',      color: 'var(--color-gold)',         glow: 0.60, Icon: SiLinux },
  { label: 'Git',        color: 'var(--color-accent)',       glow: 0.80, Icon: SiGit },
  { label: 'Vercel',     color: 'var(--color-accent-light)', glow: 0.70, Icon: SiVercel },
]

const values = [
  { icon: FiMessageSquare, title: 'Plain English only.', body: "No jargon, no disappearing. I'll explain what I'm building, why it matters, and what you need to know, in language that actually makes sense." },
  { icon: FiLayout,        title: 'Start small, trust first.', body: "Not sure if we're a good fit? We begin with one small piece of your project. When you see the work, you'll know if you want to move forward." },
  { icon: FiCode,          title: 'One person. Full stack.', body: 'Design, development, databases, security. I handle all of it. One contact, no gaps, no finger-pointing between people.' },
]

const processSteps = [
  { number: '01', title: 'Discovery',        body: "We talk through your idea, goals, and audience. No jargon, just figuring out what you actually need." },
  { number: '02', title: 'Planning',         body: "I map out scope, timeline, and the right stack before a single line of code is written." },
  { number: '03', title: 'Design',           body: "Mobile-first UI built around your brand. Clean and easy to use on phones, tablets, and desktops." },
  { number: '04', title: 'Development',      body: "Front end, back end, databases, and third-party integrations, all handled by one person." },
  { number: '05', title: 'Security',         body: "Auth, input validation, HTTPS, protected routes, and safe data handling baked in from the start, not bolted on at the end." },
  { number: '06', title: 'SEO',              body: "Meta tags, structured data, page speed, and a sitemap so Google can actually find you from day one." },
  { number: '07', title: 'Analytics',        body: "GA4 setup and conversion tracking so you know who's visiting, what they're doing, and what's working." },
  { number: '08', title: 'Launch & Support', body: "Deployment, final QA, and I stay available after go-live to make sure everything keeps working." },
]

const SECTION_IDS     = ['intro', 'story', 'skills', 'values', 'cta']
const SECTION_LABELS  = ['Intro', 'Story', 'Skills', 'Values', "Let's talk"]

// ─── Collage piece component ──────────────────────────────────────────────────

interface CollagePieceProps {
  w: string; h: string; top: string; left: string
  rotate: string; z: string; delay: string; radius: string
  src: string; alt?: string
  accentColor: string
  pos?: string
}

function CollagePiece({ w, h, top, left, rotate, z, delay, radius, src, alt = '', accentColor, pos = 'center' }: CollagePieceProps) {
  const d = parseFloat(delay)
  const animName = d < 0.2 ? 'floatA' : d < 0.5 ? 'floatB' : 'floatC'
  const animDuration = d < 0.2 ? '6s' : d < 0.5 ? '8s' : '7s'

  return (
    <div
      className="absolute overflow-hidden group"
      style={{
        width: w, height: h, top, left,
        borderRadius: radius,
        zIndex: parseInt(z),
        ['--rot' as string]: rotate,
        transform: 'rotate(var(--rot))',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
        animation: `${animName} ${animDuration} ease-in-out infinite`,
        animationDelay: delay,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.zIndex = '10'
        el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.7), 0 0 0 2px var(--color-accent, #0ea5e9)'
        el.style.transform = 'rotate(0deg) scale(1.06)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.zIndex = z
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)'
        el.style.transform = 'rotate(var(--rot))'
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover block transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
        style={{ objectPosition: pos }}
      />
      {/* Accent border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-45 group-hover:opacity-85"
        style={{ borderRadius: 'inherit', border: `2px solid ${accentColor}` }}
      />
    </div>
  )
}

// ─── Dashboard cell ───────────────────────────────────────────────────────────

function DashCell({ label, color, glow, delay, Icon }: { label: string; color: string; glow: number; delay: string; Icon: React.ComponentType<{ size?: number }> }) {
  const d = parseFloat(delay)
  const animDuration = `${3 + d * 4}s`

  return (
    <div
      className="relative rounded-[8px] md:rounded-[10px] flex flex-col gap-[0.45rem] overflow-hidden transition-[background,border-color,transform] duration-300 hover:bg-[rgba(14,165,233,0.10)] hover:border-[rgba(56,189,248,0.50)] hover:-translate-y-0.5 focus:bg-[rgba(14,165,233,0.10)] focus:border-[rgba(56,189,248,0.50)] focus:-translate-y-0.5 focus:outline-none group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${color}22`,
        padding: '0.35rem 0.3rem 0.3rem',
        animation: `cellPulse ${animDuration} ease-in-out infinite`,
        animationDelay: delay,
      }}
      tabIndex={0}
    >
      {/* Top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[10px]"
        style={{ background: color, opacity: glow }}
      />

      {/* Front face */}
      <div className="flex flex-col gap-[0.45rem] w-full transition-[opacity,transform] duration-[250ms] group-hover:opacity-0 group-hover:scale-[0.8] group-focus:opacity-0 group-focus:scale-[0.8]">
        <span
          className="text-[0.62rem] font-medium text-white/70 tracking-[0.04em] text-center"
          style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}
        >
          {label}
        </span>
        {/* Bar */}
        <div className="h-1 rounded-sm relative overflow-hidden" style={{ background: `${color}33` }}>
          <div
            className="absolute inset-0 rounded-sm opacity-85"
            style={{ width: `${Math.round(glow * 100)}%`, background: color }}
          />
        </div>
      </div>

      {/* Back face — icon */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 scale-[1.2] rotate-[-10deg] transition-[opacity,transform] duration-[320ms] cubic-bezier(0.22,1,0.36,1) group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-focus:opacity-100 group-focus:scale-100 group-focus:rotate-0"
        style={{
          color: 'var(--color-accent-light, #38bdf8)',
          filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.9))',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, rgba(14,165,233,0.22) 0%, transparent 68%)' }}
        />
        <Icon size={46} />
      </div>
    </div>
  )
}

// ─── Section glass wrapper ────────────────────────────────────────────────────
// Mirrors the SectionGlass styled-component's gradient border + grain texture

function SectionGlass({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div
      className="relative w-full max-w-[1200px] rounded-[26px] flex items-stretch overflow-visible"
      style={{
        minHeight: tall ? 'min(75vh, 620px)' : undefined,
        isolation: 'isolate',
        background: 'rgba(8,10,20,0.72)',
        backdropFilter: 'blur(28px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.3)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset, inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.40)',
      }}
    >
      {/* Gradient border — mask trick */}
      <div
        className="absolute inset-0 rounded-[26px] pointer-events-none"
        style={{
          padding: '1px',
          background: 'conic-gradient(from 225deg at 20% 20%, rgba(14,165,233,0.55) 0deg, rgba(56,189,248,0.40) 70deg, rgba(255,255,255,0.06) 160deg, rgba(255,255,255,0.03) 220deg, rgba(56,189,248,0.28) 290deg, rgba(14,165,233,0.18) 340deg, rgba(14,165,233,0.55) 360deg)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 4,
        }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 rounded-[26px] pointer-events-none z-[1]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.014) 3px, rgba(255,255,255,0.014) 4px)',
          backgroundSize: '200% 200%',
          animation: 'grainDrift 28s linear infinite alternate',
        }}
      />
      <div className="relative z-[3] w-full flex items-stretch">{children}</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AboutContent() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [skillTab,  setSkillTab]  = useState(0)
  const [skillDir,  setSkillDir]  = useState(1)

  const goToSkillTab = (tab: number) => {
    setSkillDir(tab > skillTab ? 1 : -1)
    setSkillTab(tab)
  }

  // IntersectionObserver — update active dot when a section crosses 51% visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i) },
        { threshold: 0.51 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const sectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  // Shared inline classes for the scroll-snap sections
  const snapSectionClass = [
    'relative min-h-full scroll-snap-align-start flex items-center justify-center p-1.5',
    'sm:p-3 md:p-5 lg:px-12 lg:py-10',
  ].join(' ')

  return (
    <>
      <style>{`
        @keyframes grainDrift   { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
        @keyframes seamPulse    { 0%,100% { opacity:0.60; } 50% { opacity:1; } }
        @keyframes floatA       { 0%,100% { transform: translateY(0px)   rotate(var(--rot)); } 50% { transform: translateY(-8px)  rotate(calc(var(--rot) + 1.5deg)); } }
        @keyframes floatB       { 0%,100% { transform: translateY(0px)   rotate(var(--rot)); } 50% { transform: translateY(-12px) rotate(calc(var(--rot) - 1deg)); } }
        @keyframes floatC       { 0%,100% { transform: translateY(0px)   rotate(var(--rot)); } 60% { transform: translateY(-6px)  rotate(calc(var(--rot) + 2deg)); } }
        @keyframes cellPulse    { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
        @keyframes shimmerSweep { 0%   { left:-100%; } 100% { left:200%; } }
        @media (prefers-reduced-motion: reduce) {
          [data-float] { animation: none !important; transform: rotate(var(--rot)) !important; }
          [data-orbit]  { animation: none !important; }
        }
      `}</style>

      {/* Fixed background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full" style={{ backgroundImage: "url('/images/mainbg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,12,22,0.85)' }} />
      </div>

      {/* Dot navigation */}
      <nav
        className="fixed right-5 z-[100] flex flex-col gap-[0.55rem]"
        style={{ top: '50%', transform: 'translateY(-50%)', marginTop: 'calc(var(--navbar-h,60px) / 2)' }}
        aria-label="Page sections"
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${SECTION_LABELS[i]} section`}
            aria-current={activeSection === i ? 'true' : undefined}
            className="rounded-full border-none cursor-pointer p-0 transition-[background,width,height,box-shadow] duration-[250ms] hover:bg-white/65 focus-visible:outline-2 focus-visible:outline-[var(--color-accent,#0ea5e9)] focus-visible:outline-offset-[3px]"
            style={{
              width:  activeSection === i ? '10px' : '7px',
              height: activeSection === i ? '10px' : '7px',
              background: activeSection === i ? 'var(--color-accent-light, #38bdf8)' : 'rgba(255,255,255,0.28)',
              boxShadow: activeSection === i ? '0 0 10px var(--color-accent-light, #38bdf8)' : 'none',
            }}
          />
        ))}
      </nav>

      {/*
       * Scroll-snap container — sits below the fixed navbar.
       * Uses scroll-snap-type: y mandatory for snap behavior.
       */}
      <div
        className="relative z-10 overflow-y-scroll"
        style={{
          height: 'calc(100vh - var(--navbar-h, 60px))',
          marginTop: 'var(--navbar-h, 60px)',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >

        {/* ── Section 1: INTRO ── */}
        <section
          ref={sectionRef(0)}
          id="intro"
          aria-label="Introduction"
          className={snapSectionClass}
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <SectionGlass tall>
            <div className="flex flex-col md:flex-row w-full">
              {/* Text LEFT */}
              <motion.div
                variants={fromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-1 flex flex-col items-center text-center justify-center p-2 sm:p-3 md:p-12 md:pr-10"
              >
                <p className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.17em] uppercase text-accent-light m-0 mb-1 md:mb-[0.9rem]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", color: 'var(--color-accent-light, #38bdf8)' }}>
                  Full-Stack Developer & Designer
                </p>
                <h1
                  className="font-extrabold text-white leading-[1.05] tracking-[-0.04em] m-0 mb-2 md:mb-5 overflow-visible"
                  style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(1.2rem,4.5vw,5rem)' }}
                >
                  Felipe<br />
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(100deg, var(--color-accent-light,#38bdf8) 0%, rgba(255,255,255,0.55) 70%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Cantu Jr
                  </span>
                </h1>
                <p className="font-light text-white/75 w-full max-w-[480px] m-0 mb-1 md:mb-7 leading-[1.5] md:leading-[1.75]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", fontSize: 'clamp(0.68rem,1.8vw,1.15rem)' }}>
                  If you've got an idea for a website or an application, I'll take it from concept to completion: design, development, and everything in between. Working with one person from start to finish means nothing falls through the cracks.
                </p>
                <div className="flex flex-wrap justify-center gap-1 md:justify-start md:gap-[0.55rem] pt-[2px] md:pt-1">
                  {[
                    { label: 'Dallas, TX',        gold: false },
                    { label: 'Available for work', gold: true  },
                  ].map(({ label, gold }) => (
                    <span
                      key={label}
                      className="inline-flex items-center text-[0.62rem] md:text-[0.76rem] font-semibold tracking-[0.03em] rounded-full"
                      style={{
                        padding: '0.18rem 0.5rem',
                        background: gold ? 'rgba(247,171,10,0.10)' : 'rgba(14,165,233,0.10)',
                        border: `1px solid ${gold ? 'rgba(247,171,10,0.35)' : 'rgba(14,165,233,0.30)'}`,
                        color: gold ? 'var(--color-gold, #f7ab0a)' : 'var(--color-accent-light, #38bdf8)',
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Collage RIGHT */}
              <motion.div
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-1 flex items-center justify-center p-2 overflow-visible"
                aria-hidden="true"
              >
                <div className="relative w-[480px] h-[460px] max-[899px]:w-full max-[899px]:h-full flex-shrink-0">
                  {/* Connector lines */}
                  {[
                    { top: '38%', left: '32%', w: '80px', angle: '-25deg' },
                    { top: '55%', left: '52%', w: '60px', angle: '40deg'  },
                    { top: '22%', left: '55%', w: '50px', angle: '15deg'  },
                  ].map((l, i) => (
                    <div
                      key={i}
                      className="absolute h-[1.5px] rounded pointer-events-none"
                      style={{
                        top: l.top, left: l.left, width: l.w,
                        background: 'linear-gradient(90deg, rgba(14,165,233,0.5), rgba(56,189,248,0.4))',
                        transformOrigin: 'left center',
                        transform: `rotate(${l.angle})`,
                      }}
                    />
                  ))}

                  <CollagePiece w="45.83%" h="60.87%" top="10%"  left="5%"   rotate="-6deg"  z="3" delay="0s"    radius="18px 4px 18px 4px"  src="/images/small2.jpg" accentColor="var(--color-accent)"               pos="center top" />
                  <CollagePiece w="40.63%" h="33.70%" top="4%"   left="48%"  rotate="7deg"   z="2" delay="0.15s" radius="4px 16px 4px 16px"  src="/images/small1.jpg" accentColor="var(--color-gold)"                 pos="center 30%" />
                  <CollagePiece w="29.17%" h="30.43%" top="58%"  left="2%"   rotate="12deg"  z="4" delay="0.3s"  radius="4px 20px 4px 20px"  src="/images/small3.jpg" accentColor="var(--color-accent-light, #38bdf8)" pos="center" />
                  <CollagePiece w="50%"    h="32.17%" top="65%"  left="30%"  rotate="-4deg"  z="3" delay="0.45s" radius="16px 4px 16px 4px"  src="/images/felipe.jpg" accentColor="var(--color-gold)"                 pos="center 60%" />
                  <CollagePiece w="32.29%" h="44.57%" top="38%"  left="62%"  rotate="9deg"   z="2" delay="0.6s"  radius="20px 4px 20px 4px"  src="/images/small4.jpg" accentColor="var(--color-accent)"               pos="center 20%" />
                </div>
              </motion.div>
            </div>
          </SectionGlass>
        </section>

        {/* ── Section 2: STORY ── */}
        <section
          ref={sectionRef(1)}
          id="story"
          aria-label="Personal story"
          className={snapSectionClass}
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <SectionGlass>
            <div className="flex flex-row-reverse w-full max-[899px]:flex-col max-[899px]:overflow-hidden max-[899px]:rounded-[20px] max-[899px]:min-h-[min(95vw,560px)]">
              {/* Photo LEFT (reversed to left visually) */}
              <motion.div
                variants={fromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-[0_0_50%] p-0 overflow-hidden max-[899px]:absolute max-[899px]:inset-0 max-[899px]:flex-none max-[899px]:w-full max-[899px]:h-full max-[899px]:z-0"
                aria-hidden="true"
              >
                <div className="w-full h-full overflow-hidden rounded-[0_25px_25px_0] max-[899px]:rounded-none">
                  <img
                    src="/images/big.jpg"
                    alt="Felipe Cantu Jr"
                    className="w-full h-full object-cover object-top block"
                    style={{ filter: 'saturate(0.88) contrast(1.05)', transition: 'filter 0.4s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = 'saturate(1) contrast(1)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = 'saturate(0.88) contrast(1.05)' }}
                  />
                </div>
              </motion.div>

              {/* Prose RIGHT */}
              <motion.div
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-1 flex flex-col items-center text-center justify-center p-2 sm:p-3 md:px-10 md:py-12 max-[899px]:relative max-[899px]:z-[2] max-[899px]:w-full max-[899px]:px-5 max-[899px]:py-6"
                style={{ fontSize: '0.8em', background: 'linear-gradient(to bottom, rgba(4,4,14,0.55) 0%, rgba(4,4,14,0.85) 100%)' } as React.CSSProperties}
              >
                <p className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.17em] uppercase m-0 mb-1 md:mb-[0.9rem]" style={{ color: 'var(--color-accent-light, #38bdf8)', fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>The story</p>
                <h2 className="font-extrabold text-white tracking-[-0.025em] leading-[1.1] m-0 mb-2 md:mb-8 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(0.95rem,3vw,2.2rem)' }}>
                  Rooted in Port Isabel, TX.
                </h2>
                {[
                  "I grew up in Port Isabel, Texas, a small coastal town where I learned early that hard work and treating people right matter more than anything. I've carried that mindset with me into every project since.",
                  "I know hiring a developer can feel overwhelming. There's often the worry of getting buried in jargon, losing touch with someone along the way, or starting a project that never quite reaches the finish line. I've structured my work to avoid those problems. We start with a small, focused piece of work, something real, so you can see how I work before deciding whether to move forward.",
                  "When I'm not coding, I spend time with my wife and three kids. They're my foundation and the reason I show up ready every day. I also play guitar, skateboard, and am a longtime fan of Doctor Who. I believe things can always be better. It just takes someone willing to figure out how.",
                ].map((para, i) => (
                  <p key={i} className="font-light text-white/73 max-w-[54ch] m-0 mb-2 md:mb-5 last:mb-0 leading-[1.5] md:leading-[1.85]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", fontSize: 'clamp(0.68rem,1.6vw,1.02rem)' }}>
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </SectionGlass>
        </section>

        {/* ── Section 3: SKILLS ── */}
        <section
          ref={sectionRef(2)}
          id="skills"
          aria-label="Technical skills"
          className={snapSectionClass}
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <SectionGlass>
            {/* Desktop: two-column */}
            <div className="hidden md:flex w-full">
              {/* Process steps LEFT */}
              <motion.div
                variants={fromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-[0_0_50%] flex flex-col justify-start overflow-y-auto px-12 py-10"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(14,165,233,0.2) transparent' }}
              >
                <p className="text-[0.7rem] font-bold tracking-[0.17em] uppercase text-accent-light m-0 mb-[0.9rem]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", color: 'var(--color-accent-light, #38bdf8)' }}>How it works</p>
                <h2 className="font-extrabold text-white tracking-[-0.025em] leading-[1.1] m-0 mb-8 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(1.5rem,3.2vw,2.2rem)' }}>
                  From idea to launch.
                </h2>
                <motion.ol
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className="list-none m-0 pb-4 grid gap-2"
                  style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}
                >
                  {processSteps.map((step) => (
                    <motion.div key={step.number} variants={chipVariant} className="h-full flex flex-col">
                      <li className="flex flex-row items-start gap-2 px-3 py-[0.55rem] rounded-[14px] border transition-[background,border-color,transform] duration-[250ms] hover:bg-[rgba(14,165,233,0.08)] hover:border-[rgba(14,165,233,0.35)] hover:translate-y-[1px] h-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-[0.1rem] text-[0.6rem] font-bold border" style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", background: 'rgba(14,165,233,0.14)', border: '1px solid rgba(14,165,233,0.30)', color: 'var(--color-accent-light, #38bdf8)' }}>
                          {step.number}
                        </span>
                        <div className="flex flex-col justify-start flex-1 min-w-0">
                          <p className="font-semibold text-white/95 m-0 mb-[0.2rem] tracking-[0.01em] leading-[1.2] text-[0.875rem]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>{step.title}</p>
                          <p className="text-white/58 m-0 leading-[1.4] text-[0.70rem]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>{step.body}</p>
                        </div>
                      </li>
                    </motion.div>
                  ))}
                </motion.ol>
              </motion.div>

              {/* Tech dashboard RIGHT */}
              <motion.div
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-1 flex flex-col items-center justify-center px-10 py-12"
                aria-hidden="true"
              >
                <div className="w-full max-w-[320px] flex flex-col gap-3 pt-1">
                  <p className="text-[0.68rem] m-0 mb-1" style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: 'rgba(56,189,248,0.45)', letterSpacing: '0.05em' }}>// skill_matrix.exe</p>
                  <div className="grid gap-[0.6rem]" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {dashCells.map((cell, i) => (
                      <DashCell key={cell.label} {...cell} delay={`${i * 0.08}s`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile: tab + swipe */}
            <div className="flex flex-col w-full px-4 pt-5 pb-3 gap-3 min-h-[min(95vw,520px)] md:hidden">
              {/* Tab bar */}
              <div className="relative flex border-b border-white/10">
                {['Process', 'Skills'].map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => goToSkillTab(idx)}
                    className="flex-1 py-[0.55rem] bg-none border-none cursor-pointer text-[0.8rem] tracking-[0.03em] transition-[color] duration-[220ms]"
                    style={{
                      fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                      fontWeight: skillTab === idx ? 700 : 500,
                      color: skillTab === idx ? 'var(--color-accent-light, #38bdf8)' : 'rgba(255,255,255,0.40)',
                    }}
                  >
                    {tab}
                  </button>
                ))}
                {/* Sliding indicator */}
                <div
                  className="absolute bottom-[-1px] w-1/2 h-0.5 rounded-[1px] transition-[left] duration-[280ms] cubic-bezier(0.22,1,0.36,1)"
                  style={{
                    left: skillTab === 0 ? '0%' : '50%',
                    background: 'var(--color-accent-light, #38bdf8)',
                    boxShadow: '0 0 8px var(--color-accent, #0ea5e9)',
                  }}
                />
              </div>

              {/* Swipe panel */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={skillTab}
                  initial={{ x: skillDir * 44, opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
                  animate={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ x: skillDir * -44, opacity: 0, scale: 0.94, filter: 'blur(14px)', transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] } }}
                  className="flex-1 overflow-y-auto flex flex-col gap-[0.65rem] touch-pan-y cursor-grab active:cursor-grabbing select-none"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50 && skillTab === 0) goToSkillTab(1)
                    if (info.offset.x > 50  && skillTab === 1) goToSkillTab(0)
                  }}
                >
                  {skillTab === 0 ? (
                    <>
                      <p className="text-[0.6rem] font-bold tracking-[0.17em] uppercase m-0" style={{ color: 'var(--color-accent-light, #38bdf8)', fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>How it works</p>
                      <h2 className="font-extrabold text-white leading-[1.1] m-0 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(0.95rem,3vw,2.2rem)' }}>From idea to launch.</h2>
                      <ol className="list-none m-0 pb-4 grid gap-2" style={{ gridTemplateColumns: '1fr' }}>
                        {processSteps.map((step) => (
                          <motion.div key={step.number} variants={chipVariant} initial="hidden" animate="visible">
                            <li className="flex flex-row items-start gap-1.5 px-[0.45rem] py-[0.3rem] rounded-[14px] border hover:bg-[rgba(14,165,233,0.08)] hover:border-[rgba(14,165,233,0.35)] transition-all duration-[250ms]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-[0.1rem] text-[0.6rem] font-bold" style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", background: 'rgba(14,165,233,0.14)', border: '1px solid rgba(14,165,233,0.30)', color: 'var(--color-accent-light, #38bdf8)' }}>
                                {step.number}
                              </span>
                              <div className="flex flex-col flex-1 min-w-0">
                                <p className="font-semibold text-white/95 m-0 mb-[0.1rem] text-[0.72rem] leading-[1.2]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>{step.title}</p>
                                <p className="text-white/58 m-0 text-[0.6rem] leading-[1.35]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>{step.body}</p>
                              </div>
                            </li>
                          </motion.div>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <>
                      <p className="text-[0.6rem] font-bold tracking-[0.17em] uppercase m-0" style={{ color: 'var(--color-accent-light, #38bdf8)', fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>Tech stack</p>
                      <h2 className="font-extrabold text-white leading-[1.1] m-0 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(0.95rem,3vw,2.2rem)' }}>Tools I use.</h2>
                      <div className="w-full max-w-full flex flex-col gap-3 pt-1">
                        <p className="text-[0.68rem] m-0 mb-1" style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: 'rgba(56,189,248,0.45)', letterSpacing: '0.05em' }}>// skill_matrix.exe</p>
                        <motion.div
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="grid gap-[0.3rem]"
                          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                        >
                          {dashCells.map((cell, i) => (
                            <motion.div key={cell.label} variants={chipVariant}>
                              <DashCell {...cell} delay={`${i * 0.08}s`} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mobile dots */}
              <div className="flex justify-center items-center gap-[0.45rem] pb-1">
                {[0, 1].map(i => (
                  <button
                    key={i}
                    onClick={() => goToSkillTab(i)}
                    aria-label={i === 0 ? 'Process tab' : 'Skills tab'}
                    className="h-1.5 rounded-[3px] border-none cursor-pointer p-0 transition-[width,background] duration-300"
                    style={{
                      width: skillTab === i ? '22px' : '6px',
                      background: skillTab === i
                        ? 'linear-gradient(90deg, var(--color-accent,#0ea5e9), var(--color-accent-light,#38bdf8))'
                        : 'rgba(255,255,255,0.20)',
                      boxShadow: skillTab === i ? '0 0 6px rgba(14,165,233,0.5)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </SectionGlass>
        </section>

        {/* ── Section 4: VALUES ── */}
        <section
          ref={sectionRef(3)}
          id="values"
          aria-label="Work philosophy"
          className={snapSectionClass}
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <SectionGlass>
            <div className="flex flex-row-reverse w-full max-[899px]:flex-col max-[899px]:overflow-hidden max-[899px]:rounded-[20px] max-[899px]:min-h-[min(115vw,680px)]">
              {/* Value cards LEFT */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.35 }}
                className="flex-[0_0_50%] flex flex-col items-start justify-center px-6 py-6 md:px-10 md:py-12 max-[899px]:relative max-[899px]:z-[2] max-[899px]:w-full max-[899px]:px-5 max-[899px]:py-6 max-[899px]:items-center max-[899px]:text-center max-[899px]:justify-center"
                style={{ background: 'linear-gradient(to bottom, rgba(4,4,14,0.55) 0%, rgba(4,4,14,0.85) 100%)' } as React.CSSProperties}
              >
                <motion.div variants={fromLeft}>
                  <p className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.17em] uppercase m-0 mb-1 md:mb-[0.9rem]" style={{ color: 'var(--color-accent-light, #38bdf8)', fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>How I work</p>
                  <h2 className="font-extrabold text-white tracking-[-0.025em] leading-[1.1] m-0 mb-7 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(0.95rem,3vw,2.2rem)' }}>
                    Why I do this differently.
                  </h2>
                </motion.div>

                <div className="flex flex-col gap-2 md:gap-4 w-full pr-1.5">
                  {values.map((v) => {
                    const Icon = v.icon
                    return (
                      <motion.div key={v.title} variants={valueCardVariant}>
                        <article
                          className="relative overflow-hidden rounded-xl md:rounded-[20px] transition-all duration-300 hover:translate-x-1 group"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '0.5rem 0.65rem 0.5rem 0.85rem',
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderColor = 'rgba(14,165,233,0.30)'
                            el.style.background = 'linear-gradient(135deg, rgba(14,165,233,0.07) 0%, rgba(56,189,248,0.04) 100%)'
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderColor = 'rgba(255,255,255,0.08)'
                            el.style.background = 'rgba(255,255,255,0.04)'
                          }}
                        >
                          {/* Animated left accent bar */}
                          <div
                            className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-[0_2px_2px_0] opacity-0 transition-[opacity,top,bottom] duration-300 group-hover:opacity-100 group-hover:top-0 group-hover:bottom-0"
                            style={{ background: 'linear-gradient(180deg, var(--color-accent,#0ea5e9) 0%, var(--color-accent-light,#38bdf8) 100%)' }}
                          />
                          <div
                            className="inline-flex items-center justify-center w-[1.4rem] h-[1.4rem] md:w-8 md:h-8 rounded-[8px] md:rounded-xl mb-1.5 md:mb-[0.65rem] transition-all duration-300 group-hover:bg-[rgba(14,165,233,0.18)] group-hover:border-[rgba(56,189,248,0.40)]"
                            style={{
                              background: 'rgba(14,165,233,0.10)',
                              border: '1px solid rgba(14,165,233,0.20)',
                              color: 'var(--color-accent-light, #38bdf8)',
                            }}
                          >
                            <Icon size={18} aria-hidden="true" />
                          </div>
                          <h3 className="font-bold text-white tracking-[-0.01em] m-0 mb-[0.15rem] md:mb-[0.4rem] text-[0.75rem] md:text-base" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)" }}>
                            {v.title}
                          </h3>
                          <p className="font-light text-white/62 m-0 leading-[1.45] md:leading-[1.65] text-[0.65rem] md:text-[0.85rem]" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
                            {v.body}
                          </p>
                        </article>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Photo RIGHT */}
              <motion.div
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex-1 p-0 overflow-hidden max-[899px]:absolute max-[899px]:inset-0 max-[899px]:flex-none max-[899px]:w-full max-[899px]:h-full max-[899px]:z-0"
                aria-hidden="true"
              >
                <div className="w-full h-full overflow-hidden rounded-[25px_0_0_25px] max-[899px]:rounded-none">
                  <img src="/images/big2.jpg" alt="" className="w-full h-full object-cover object-top block" style={{ filter: 'saturate(0.88) contrast(1.05)' }} />
                </div>
              </motion.div>
            </div>
          </SectionGlass>
        </section>

        {/* ── Section 5: CTA ── */}
        <section
          ref={sectionRef(4)}
          id="cta"
          aria-label="Call to action"
          className={`${snapSectionClass} relative`}
          style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
          <div className="relative z-[2] w-full max-w-[900px] flex items-center justify-center">
            <div
              className="relative w-full rounded-[26px] text-center"
              style={{
                background: 'rgba(8,10,20,0.72)',
                backdropFilter: 'blur(28px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(28px) saturate(1.3)',
                padding: '3rem 2.5rem',
                isolation: 'isolate',
                boxShadow: '0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Gradient border */}
              <div
                className="absolute inset-0 rounded-[26px] pointer-events-none"
                style={{
                  padding: '1px',
                  background: 'conic-gradient(from 225deg at 20% 20%, rgba(14,165,233,0.55) 0deg, rgba(56,189,248,0.40) 70deg, rgba(255,255,255,0.06) 160deg, rgba(255,255,255,0.03) 220deg, rgba(56,189,248,0.28) 290deg, rgba(14,165,233,0.18) 340deg, rgba(14,165,233,0.55) 360deg)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  zIndex: 4,
                }}
              />

              <div className="relative z-[3]">
                <motion.div variants={fromBottom} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
                  <p className="text-[0.72rem] font-bold tracking-[0.18em] uppercase m-0 mb-2" style={{ color: 'var(--color-accent-light, #38bdf8)', fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
                    Let's work together
                  </p>
                  {/* Accent seam bar */}
                  <div className="relative w-full max-w-[28rem] h-px mx-auto mb-7" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.20) 15%, rgba(56,189,248,0.70) 42%, rgba(255,255,255,0.90) 50%, rgba(56,189,248,0.70) 58%, rgba(14,165,233,0.20) 85%, transparent 100%)' }}>
                    <span className="absolute left-1/2 top-1/2 w-[5px] h-[5px] rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--color-accent-light, #38bdf8)', boxShadow: '0 0 8px rgba(56,189,248,0.70)' }} />
                  </div>
                </motion.div>

                <motion.div variants={fromBottom} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} transition={{ delay: 0.1 }}>
                  <h2 className="font-extrabold text-white tracking-[-0.03em] leading-[1.1] m-0 mb-3 overflow-visible" style={{ fontFamily: "var(--font-display,'Syne',system-ui,sans-serif)", fontSize: 'clamp(1.4rem,6vw,2.8rem)' }}>
                    Ready to build something?
                  </h2>
                </motion.div>

                <motion.div variants={fromBottom} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} transition={{ delay: 0.2 }}>
                  <p className="font-light text-white/65 leading-[1.65] max-w-[46ch] mx-auto m-0 mb-5 sm:mb-9" style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", fontSize: 'clamp(0.88rem,2.5vw,1.1rem)' }}>
                    Whether you have a full brief or just a rough idea, let's talk. I'll tell you what's possible and how we can get started.
                  </p>
                </motion.div>

                <motion.div variants={fromBottom} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} transition={{ delay: 0.3 }}>
                  <nav className="flex flex-col items-stretch gap-[0.65rem] py-1 sm:flex-row sm:items-center sm:justify-center sm:py-3 sm:gap-3">
                    {[
                      { href: '/contact',   label: 'Get in touch', primary: true  },
                      { href: '/portfolio', label: 'See my work',  primary: false },
                    ].map(({ href, label, primary }) => (
                      <Link
                        key={href}
                        href={href}
                        className="inline-flex items-center justify-center gap-[0.45rem] px-7 py-3 rounded-xl font-bold text-[0.9rem] tracking-[0.03em] no-underline whitespace-nowrap transition-all duration-[220ms] focus-visible:outline-2 focus-visible:outline-[var(--color-accent,#0ea5e9)] focus-visible:outline-offset-[3px]"
                        style={{
                          fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                          background: primary ? 'var(--color-accent, #0ea5e9)' : 'rgba(255,255,255,0.06)',
                          border: primary ? '2px solid var(--color-accent, #0ea5e9)' : '1px solid rgba(255,255,255,0.15)',
                          color: primary ? 'white' : 'rgba(255,255,255,0.82)',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          if (primary) {
                            el.style.background = 'transparent'
                            el.style.color = 'var(--color-accent-light, #38bdf8)'
                          } else {
                            el.style.background = 'rgba(255,255,255,0.11)'
                            el.style.borderColor = 'rgba(255,255,255,0.30)'
                            el.style.color = 'white'
                          }
                          el.style.transform = 'translateY(-2px)'
                          el.style.boxShadow = primary ? '0 8px 24px rgba(14,165,233,0.30)' : '0 8px 24px rgba(0,0,0,0.28)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.background = primary ? 'var(--color-accent, #0ea5e9)' : 'rgba(255,255,255,0.06)'
                          el.style.borderColor = primary ? 'var(--color-accent, #0ea5e9)' : 'rgba(255,255,255,0.15)'
                          el.style.color = primary ? 'white' : 'rgba(255,255,255,0.82)'
                          el.style.transform = ''
                          el.style.boxShadow = ''
                        }}
                      >
                        {label}
                        <FiArrowRight aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
