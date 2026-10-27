'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { urlFor } from '@/lib/sanity'
import { TYPE_LABELS, TYPE_BADGE } from '@/components/projectMeta'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  excerpt?: string
  featured?: boolean
  status?: string
  projectType?: string | string[]
  techStack?: string[]
  date?: string
  place?: string
  githubUrl?: string
  liveUrl?: string
  image?: unknown // raw Sanity image reference for urlFor()
  mainImage?: { asset: { _id: string; url: string }; alt?: string }
}

interface ProjectCarouselProps {
  initialProjects: SanityProject[]
}

type ProjectFilter = 'all' | 'web' | 'mobile' | 'design' | 'desktop'

// ─── Animation variants ───────────────────────────────────────────────────────

// sideX is passed dynamically via custom so it scales with the viewport
const cardVariants = {
  enter: ({ position, direction, sideX }: { position: string; direction: number; sideX: number }) => {
    if (position === 'center') {
      return {
        x: direction > 0 ? sideX * 1.2 : -sideX * 1.2,
        scale: 0.8,
        opacity: 0,
        rotateY: direction > 0 ? 20 : -20,
        filter: 'blur(6px) saturate(0.5)',
        zIndex: 2,
      }
    }
    return {
      x: position === 'prev' ? -sideX * 1.8 : sideX * 1.8,
      opacity: 0,
      scale: 0.78,
      rotateY: position === 'prev' ? 10 : -10,
      filter: 'blur(0px) saturate(0.9)',
      zIndex: 1,
    }
  },
  center: ({ position, sideX }: { position: string; sideX: number }) => {
    if (position === 'center') {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        filter: 'blur(0px) saturate(1)',
        zIndex: 3,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }
    }
    if (position === 'prev') {
      return {
        x: -sideX,
        scale: 0.78,
        opacity: 0.85,
        rotateY: 10,
        filter: 'blur(0px) saturate(0.9)',
        zIndex: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }
    }
    return {
      x: sideX,
      scale: 0.78,
      opacity: 0.85,
      rotateY: -10,
      filter: 'blur(0px) saturate(0.9)',
      zIndex: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    }
  },
  exit: ({ position, direction, sideX }: { position: string; direction: number; sideX: number }) => {
    if (position === 'center') {
      return {
        x: direction > 0 ? -sideX * 1.2 : sideX * 1.2,
        scale: 0.8,
        opacity: 0,
        rotateY: direction > 0 ? -20 : 20,
        filter: 'blur(6px) saturate(0.5)',
        zIndex: 2,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }
    }
    return {
      x: position === 'prev' ? -sideX * 1.8 : sideX * 1.8,
      opacity: 0,
      scale: 0.65,
      filter: 'blur(4px) saturate(0.5)',
      zIndex: 0,
      transition: { duration: 0.2 },
    }
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FILTER_OPTIONS: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'desktop', label: 'Desktop' },
]

// ─── useSideX hook ────────────────────────────────────────────────────────────

function useSideX(): number {
  // Start with 0 to avoid window access during SSR
  const [sideX, setSideX] = useState(0)

  useEffect(() => {
    // Safe to access window now that we're on the client
    const get = () => window.innerWidth * 0.5
    setSideX(get())
    const handle = () => setSideX(get())
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return sideX
}

// ─── CarouselCard ─────────────────────────────────────────────────────────────

interface CarouselCardProps {
  project: SanityProject
  position: 'prev' | 'center' | 'next'
  direction: number
  layoutKey: string
  sideX: number
}

function CarouselCard({ project, position, direction, layoutKey, sideX }: CarouselCardProps) {
  const isCenter = position === 'center'

  // Resolve image URL: handles both the legacy `image` field and the newer `mainImage` field
  const imageUrl = (() => {
    if (project.image) {
      try {
        return urlFor(project.image as Parameters<typeof urlFor>[0])
          .width(800)
          .auto('format')
          .fit('crop')
          .url()
      } catch {
        return null
      }
    }
    if (project.mainImage?.asset?.url) return project.mainImage.asset.url
    return null
  })()

  const types = Array.isArray(project.projectType)
    ? project.projectType
    : project.projectType
    ? [project.projectType]
    : []

  // On <=600px hide side cards via CSS
  const hiddenOnMobile = position !== 'center'

  return (
    <motion.div
      key={layoutKey}
      custom={{ position, direction, sideX }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      // Side cards are decorative previews of the neighbours: keep them out of the a11y tree
      aria-hidden={isCenter ? undefined : true}
      className={[
        'absolute left-1/2 top-1/2 overflow-hidden rounded-[1.25rem] bg-surface',
        'border border-line/20 shadow-lift will-change-[transform,opacity,filter]',
        // Responsive card sizing
        'w-[min(44vw,680px)] h-[min(calc(44vw*9/16),382px)]',
        '[margin-left:calc(min(44vw,680px)/-2)] [margin-top:calc(min(calc(44vw*9/16),382px)/-2)]',
        // tablet
        'max-[768px]:w-[70vw] max-[768px]:h-[calc(70vw*9/16)]',
        'max-[768px]:[margin-left:-35vw] max-[768px]:[margin-top:calc(-70vw*9/32)]',
        // mobile: taller portrait card so the image stays visible above the info panel,
        // narrow enough that the arrow buttons sit beside it instead of on top of it
        'max-[600px]:w-[80vw] max-[600px]:h-[calc(80vw*11/10)]',
        'max-[600px]:[margin-left:-40vw] max-[600px]:[margin-top:calc(-80vw*11/20)]',
        // hide side cards on mobile
        hiddenOnMobile ? 'max-[600px]:hidden' : '',
      ].join(' ')}
    >
      <div className="group relative h-full w-full bg-surface">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 block h-full w-full scale-100 object-cover object-center transition-transform duration-[600ms] ease-out-expo will-change-transform group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-dark/40 via-surface to-accent/20" />
        )}

        {/* Whole center card is one real link: keyboard + screen-reader accessible */}
        {isCenter && project.slug?.current && (
          <Link
            href={`/project/${project.slug.current}`}
            aria-label={`View project: ${project.title}`}
            className="absolute inset-0 z-[4] rounded-[1.25rem]"
          />
        )}

        {/* Slide-up info panel */}
        <div
          className={[
            'absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-2',
            'bg-gradient-to-b from-transparent via-bg/90 to-bg px-[1.4rem] pb-5 pt-10',
            // Show the title by default, reveal the full panel on hover/focus
            'translate-y-[calc(100%-3.8rem)] transition-transform duration-[420ms] ease-out-expo',
            'group-focus-within:translate-y-0 group-hover:translate-y-0',
            // touch devices have no hover: always show the full panel
            '[@media(hover:none)]:translate-y-0',
            // tablet
            'max-[768px]:translate-y-[calc(100%-3.4rem)] max-[768px]:gap-1.5 max-[768px]:px-[1.1rem] max-[768px]:pb-4 max-[768px]:pt-8',
            // mobile always revealed
            'max-[600px]:translate-y-0 max-[600px]:gap-1 max-[600px]:px-4 max-[600px]:pb-3 max-[600px]:pt-7',
          ].join(' ')}
        >
          {/* Type badges */}
          {types.filter((t) => TYPE_LABELS[t]).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {types
                .filter((t) => TYPE_LABELS[t])
                .map((t, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center rounded-pill border px-2 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] ${TYPE_BADGE[t]}`}
                  >
                    {TYPE_LABELS[t]}
                  </span>
                ))}
            </div>
          )}

          {/* Title */}
          <p className="m-0 font-display text-[1.2rem] font-bold leading-[1.2] tracking-tight text-fg max-[768px]:text-[1.05rem]">
            {project.title}
          </p>

          {/* Description: hidden on tablet only (short landscape card); phones get a portrait card with room for 2 lines */}
          {(project.excerpt ?? project.description) && (
            <p className="m-0 line-clamp-2 text-[0.85rem] leading-[1.5] text-muted min-[601px]:max-[768px]:hidden max-[600px]:text-[0.8rem]">
              {project.excerpt ?? project.description}
            </p>
          )}

          {/* Meta row: place, year */}
          {(project.place ?? project.date) && (
            <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-subtle">
              {project.place && <span>{project.place}</span>}
              {project.place && project.date && <span aria-hidden="true">&middot;</span>}
              {project.date && <span>{new Date(project.date).getFullYear()}</span>}
            </div>
          )}

          {/* Tags: hidden on mobile */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-0.5 flex max-h-14 flex-wrap gap-1.5 overflow-hidden max-[768px]:max-h-8 max-[600px]:hidden">
              {project.techStack.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[0.7rem] font-medium text-accent-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Filter UI ────────────────────────────────────────────────────────────────

function FilterUI({
  projectTypeFilter,
  setProjectTypeFilter,
}: {
  projectTypeFilter: ProjectFilter
  setProjectTypeFilter: (v: ProjectFilter) => void
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by type"
      className="container-page mb-8 flex flex-wrap justify-center gap-2 max-[480px]:mb-6"
    >
      {FILTER_OPTIONS.map(({ value, label }) => {
        const isSelected = projectTypeFilter === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setProjectTypeFilter(value)}
            aria-pressed={isSelected}
            className={[
              'min-h-[2.5rem] cursor-pointer rounded-pill border px-5 text-[0.9rem] font-semibold',
              'transition-[background-color,border-color,color,box-shadow] duration-200',
              isSelected
                ? 'border-transparent bg-accent text-accent-ink shadow-[0_6px_20px_-6px_rgb(var(--c-accent)/0.6)]'
                : 'border-line/25 bg-white/[0.04] text-muted hover:border-accent-light/50 hover:bg-accent/10 hover:text-fg',
            ].join(' ')}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const isLeft = side === 'left'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? 'Previous project' : 'Next project'}
      className={[
        'glass absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line/30 text-fg shadow-lift',
        'transition-[background-color,border-color,box-shadow] duration-200 hover:border-accent-light/70 hover:bg-accent/30',
        'max-[768px]:h-10 max-[768px]:w-10 max-[600px]:h-9 max-[600px]:w-9',
        isLeft ? 'left-3 max-[768px]:left-2 max-[600px]:left-1' : 'right-3 max-[768px]:right-2 max-[600px]:right-1',
      ].join(' ')}
    >
      {isLeft ? <FiChevronLeft size={26} aria-hidden="true" /> : <FiChevronRight size={26} aria-hidden="true" />}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectCarousel({ initialProjects }: ProjectCarouselProps) {
  const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectFilter>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const reduceMotion = useReducedMotion()
  const sideX = useSideX()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Client-side filter: no re-fetch needed
  const projectData = initialProjects.filter((p) => {
    if (projectTypeFilter === 'all') return true
    const types = Array.isArray(p.projectType) ? p.projectType : p.projectType ? [p.projectType] : []
    return types.includes(projectTypeFilter)
  })

  const length = projectData.length

  // Reset index in the same update as the filter, so a stale index never
  // points past the end of the shorter filtered list
  const changeFilter = (value: ProjectFilter) => {
    setProjectTypeFilter(value)
    setCurrentIndex(0)
  }

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % length)
  }, [length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + length) % length)
  }, [length])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex]
  )

  // Auto-advance: paused while hovered or focused, and off entirely for
  // visitors who prefer reduced motion (WCAG 2.2.2 Pause, Stop, Hide)
  useEffect(() => {
    if (!isHovered && !hasFocus && !reduceMotion && length > 1) {
      intervalRef.current = setInterval(goNext, 4000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, hasFocus, reduceMotion, goNext, length])

  const prevIndex = length > 0 ? (currentIndex - 1 + length) % length : 0
  const nextIndex = length > 0 ? (currentIndex + 1) % length : 0

  return (
    <div className="page-top w-full pb-section">
      {/* Portfolio header */}
      <header className="container-page mb-8 max-w-2xl text-center">
        <p className="eyebrow">Selected work</p>
        <h1 className="mt-3 text-h1 text-fg">My Portfolio</h1>
        <p className="lead mt-3">Full-stack development meets creative design. (React, JavaScript, Figma)</p>
      </header>

      <FilterUI projectTypeFilter={projectTypeFilter} setProjectTypeFilter={changeFilter} />

      {/* Carousel */}
      <div
        className="flex w-full flex-col items-center gap-5 overflow-x-clip"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {length === 0 ? (
          <p className="py-16 text-center text-lg text-muted">No projects found for this filter.</p>
        ) : (
          <>
            {/* Perspective stage */}
            {/* Stage height tracks the card size so the dots and footer never sit under it */}
            <div
              className={[
                'relative left-1/2 w-screen -translate-x-1/2',
                'h-[min(calc(44vw*9/16),420px)]',
                'max-[768px]:h-[calc(70vw*9/16)]',
                'max-[600px]:h-[calc(80vw*11/10)]',
              ].join(' ')}
              style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
            >
              <div className="relative h-full w-full">
                <AnimatePresence custom={{ direction, sideX }}>
                  {length > 1 && (
                    <CarouselCard
                      key={`prev-${prevIndex}-${projectTypeFilter}`}
                      layoutKey={`prev-${prevIndex}-${projectTypeFilter}`}
                      project={projectData[prevIndex]}
                      position="prev"
                      direction={direction}
                      sideX={sideX}
                    />
                  )}
                  <CarouselCard
                    key={`center-${currentIndex}-${projectTypeFilter}`}
                    layoutKey={`center-${currentIndex}-${projectTypeFilter}`}
                    project={projectData[currentIndex]}
                    position="center"
                    direction={direction}
                    sideX={sideX}
                  />
                  {length > 1 && (
                    <CarouselCard
                      key={`next-${nextIndex}-${projectTypeFilter}`}
                      layoutKey={`next-${nextIndex}-${projectTypeFilter}`}
                      project={projectData[nextIndex]}
                      position="next"
                      direction={direction}
                      sideX={sideX}
                    />
                  )}
                </AnimatePresence>

                {length > 1 && (
                  <>
                    <ArrowButton side="left" onClick={goPrev} />
                    <ArrowButton side="right" onClick={goNext} />
                  </>
                )}
              </div>
            </div>

            {/* Dot indicators: 24px hit area around a visually small dot */}
            {length > 1 && (
              <div className="flex items-center">
                {projectData.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    aria-current={i === currentIndex ? 'true' : undefined}
                    className="group flex h-6 cursor-pointer items-center justify-center px-1"
                  >
                    <span
                      className={[
                        'block h-2 rounded-full transition-[width,background-color] duration-300 ease-out-expo',
                        i === currentIndex
                          ? 'w-7 bg-gradient-to-r from-accent to-accent-light shadow-[0_0_8px_rgb(var(--c-accent)/0.55)]'
                          : 'w-2 bg-line/40 group-hover:bg-line/70',
                      ].join(' ')}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Counter */}
            <p className="m-0 text-small font-medium tracking-[0.05em] text-subtle">
              {currentIndex + 1} / {length}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
