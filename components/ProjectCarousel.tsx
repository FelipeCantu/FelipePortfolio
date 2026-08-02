'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { urlFor } from '@/lib/sanity'

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
  tags?: string[]
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

function getBadgeColor(type: string): string {
  const colors: Record<string, string> = {
    web: '#3498db',
    mobile: '#9b59b6',
    design: '#e67e22',
    desktop: '#1abc9c',
  }
  return colors[type] ?? '#3498db'
}

const TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  design: 'Design',
  desktop: 'Desktop App',
}

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
  filter: ProjectFilter
}

function CarouselCard({ project, position, direction, layoutKey, sideX, filter }: CarouselCardProps) {
  const isCenter = position === 'center'
  const router = useRouter()

  const handleClick = () => {
    if (isCenter && project.slug?.current) {
      router.push(`/project/${project.slug.current}`)
    }
  }

  // Resolve image URL — handles both Project.jsx's image field and the new mainImage field
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

  // On <=600px hide side cards via CSS (matching original)
  const hiddenOnMobile = position !== 'center'

  return (
    <motion.div
      key={layoutKey}
      custom={{ position, direction, sideX }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      onClick={handleClick}
      className={[
        'absolute left-1/2 top-1/2 rounded-[20px] overflow-hidden bg-[#07070f]',
        'border border-white/[0.07] will-change-[transform,opacity,filter]',
        isCenter ? 'cursor-pointer' : 'cursor-default',
        // Responsive card sizing
        'w-[min(44vw,680px)] h-[min(calc(44vw*9/16),382px)]',
        '[margin-left:calc(min(44vw,680px)/-2)] [margin-top:calc(min(calc(44vw*9/16),382px)/-2)]',
        // tablet
        'max-[768px]:w-[70vw] max-[768px]:h-[calc(70vw*9/16)]',
        'max-[768px]:[margin-left:-35vw] max-[768px]:[margin-top:calc(-70vw*9/32)]',
        // mobile
        'max-[600px]:w-[88vw] max-[600px]:h-[calc(88vw*3/4)]',
        'max-[600px]:[margin-left:-44vw] max-[600px]:[margin-top:calc(-88vw*3/8)]',
        // hide side cards on mobile
        hiddenOnMobile ? 'max-[600px]:hidden' : '',
      ].join(' ')}
    >
      {/* Card inner — hover lifts image and reveals slide panel */}
      <div className="relative w-full h-full rounded-[20px] bg-[#07070f] group">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center block scale-100 transition-transform duration-[550ms] cubic-bezier(0.25,0.46,0.45,0.94) will-change-transform group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(52,152,219,0.18)] to-[rgba(155,89,182,0.18)]" />
        )}

        {/* Slide-up info panel */}
        <div
          className={[
            'absolute bottom-0 left-0 right-0 z-[3] flex flex-col gap-[0.55rem]',
            'px-[1.4rem] pt-10 pb-5',
            'bg-gradient-to-b from-transparent via-[rgba(4,4,14,0.92)] to-[rgba(4,4,14,0.98)]',
            // Show partial title by default, full panel on hover
            'translate-y-[calc(100%-3.6rem)] transition-transform duration-[420ms] cubic-bezier(0.25,0.46,0.45,0.94)',
            'group-hover:translate-y-0',
            // tablet
            'max-[768px]:translate-y-[calc(100%-3.2rem)] max-[768px]:px-[1.1rem] max-[768px]:pt-8 max-[768px]:pb-4 max-[768px]:gap-[0.45rem]',
            // mobile always revealed
            'max-[600px]:translate-y-0 max-[600px]:pt-7 max-[600px]:px-4 max-[600px]:pb-3 max-[600px]:gap-[0.3rem]',
          ].join(' ')}
        >
          {/* Type badges */}
          {types.filter((t) => TYPE_LABELS[t]).length > 0 && (
            <div className="flex flex-wrap gap-[0.35rem] mb-[0.25rem]">
              {types.filter((t) => TYPE_LABELS[t]).map((t, i) => (
                <span
                  key={i}
                  className="text-[0.62rem] font-bold uppercase tracking-[0.12em]"
                  style={{ color: getBadgeColor(t) }}
                >
                  {TYPE_LABELS[t]}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <p className="m-0 font-display text-[1.1rem] max-[768px]:text-[1rem] font-bold text-white text-shadow-[0_2px_16px_rgba(0,0,0,0.9)] leading-[1.2] tracking-[-0.01em]">
            {project.title}
          </p>

          {/* Description — hidden on tablet */}
          {(project.excerpt ?? project.description) && (
            <p className="m-0 text-[0.8rem] text-white/[0.82] leading-[1.5] line-clamp-2 max-[768px]:hidden max-[600px]:block max-[600px]:line-clamp-1 max-[600px]:text-[0.75rem]">
              {project.excerpt ?? project.description}
            </p>
          )}

          {/* Meta row: place · year */}
          {(project.place ?? project.date) && (
            <div className="flex items-center gap-[0.45rem] flex-wrap">
              {project.place && (
                <span className="text-[0.75rem] text-white/60 tracking-[0.01em]">{project.place}</span>
              )}
              {project.place && project.date && (
                <span className="text-[0.7rem] text-white/25">·</span>
              )}
              {project.date && (
                <span className="text-[0.75rem] text-white/60 tracking-[0.01em]">
                  {new Date(project.date).getFullYear()}
                </span>
              )}
            </div>
          )}

          {/* Tags — hidden on mobile */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-[0.3rem] mt-[0.1rem] overflow-hidden max-h-14 max-[768px]:max-h-8 max-[600px]:hidden">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/[0.07] border border-white/10 text-white/80 px-[0.55rem] py-[0.22rem] rounded-[4px] text-[0.68rem] font-medium tracking-[0.01em]"
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
    <div className="flex flex-col items-center justify-center mb-6 max-[480px]:mb-4 gap-[0.65rem] max-[480px]:gap-2 px-8">
      <h3 className="font-body text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/40 m-0">
        Filter Projects:
      </h3>
      <div className="flex flex-wrap justify-center gap-4 max-[480px]:gap-[0.4rem]">
        {FILTER_OPTIONS.map(({ value, label }) => {
          const isSelected = projectTypeFilter === value
          return (
            <button
              key={value}
              onClick={() => setProjectTypeFilter(value)}
              className={[
                'font-body px-5 max-[480px]:px-[0.85rem] py-[0.55rem] max-[480px]:py-[0.4rem]',
                'rounded-full text-[0.88rem] max-[480px]:text-[0.78rem] font-semibold tracking-[0.01em]',
                'cursor-pointer transition-[background,border-color,box-shadow,color] duration-[220ms] ease-in-out',
                'backdrop-blur-lg border-[1.5px]',
                'focus-visible:outline-2 focus-visible:outline-[rgba(14,165,233,0.7)] focus-visible:outline-offset-[3px]',
                isSelected
                  ? 'bg-[rgba(14,165,233,0.85)] text-white border-transparent shadow-[0_4px_16px_rgba(14,165,233,0.30)]'
                  : 'bg-white/[0.07] text-white/60 border-white/10 hover:bg-white/[0.12] hover:border-[rgba(14,165,233,0.45)] hover:text-white',
              ].join(' ')}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectCarousel({ initialProjects }: ProjectCarouselProps) {
  const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectFilter>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const sideX = useSideX()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Client-side filter — no re-fetch needed
  const projectData = initialProjects.filter((p) => {
    if (projectTypeFilter === 'all') return true
    const types = Array.isArray(p.projectType) ? p.projectType : p.projectType ? [p.projectType] : []
    return types.includes(projectTypeFilter)
  })

  const length = projectData.length

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [projectTypeFilter])

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

  // Auto-advance
  useEffect(() => {
    if (!isHovered && length > 1) {
      intervalRef.current = setInterval(goNext, 4000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, goNext, length])

  const prevIndex = length > 0 ? (currentIndex - 1 + length) % length : 0
  const nextIndex = length > 0 ? (currentIndex + 1) % length : 0

  return (
    <div
      className="w-full pt-[calc(var(--navbar-h,60px)+1.5rem)] pb-16"
    >
      {/* Portfolio header */}
      <header className="text-center px-8 pb-5 max-w-[680px] mx-auto">
        <h1 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.05] m-0 mb-2">
          My Portfolio
        </h1>
        <p className="font-body text-[clamp(0.8rem,1.2vw,0.92rem)] font-light text-white/50 leading-relaxed m-0">
          Full-stack development meets creative design. (React, JavaScript, Figma)
        </p>
      </header>

      <FilterUI projectTypeFilter={projectTypeFilter} setProjectTypeFilter={setProjectTypeFilter} />

      {/* Carousel */}
      <div
        className="flex flex-col items-center gap-4 w-full overflow-x-clip"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {length === 0 ? (
          <p className="text-center text-white/40 text-[1.1rem] py-16">
            No projects found for this filter.
          </p>
        ) : (
          <>
            {/* Perspective stage */}
            <div
              className="relative w-screen left-1/2 -translate-x-1/2"
              style={{
                perspective: '1200px',
                perspectiveOrigin: '50% 50%',
                height: 'min(calc(44vw * 9 / 16), 420px)',
              }}
            >
              {/* On tablet */}
              <style>{`
                @media (max-width: 768px) {
                  .carousel-stage { height: calc(70vw * 9 / 16) !important; }
                }
                @media (max-width: 600px) {
                  .carousel-stage { height: calc(88vw * 3 / 4) !important; }
                }
              `}</style>

              <div className="relative w-full h-full carousel-stage">
                <AnimatePresence custom={{ direction, sideX }}>
                  {length > 1 && (
                    <CarouselCard
                      key={`prev-${prevIndex}-${projectTypeFilter}`}
                      layoutKey={`prev-${prevIndex}-${projectTypeFilter}`}
                      project={projectData[prevIndex]}
                      position="prev"
                      direction={direction}
                      sideX={sideX}
                      filter={projectTypeFilter}
                    />
                  )}
                  <CarouselCard
                    key={`center-${currentIndex}-${projectTypeFilter}`}
                    layoutKey={`center-${currentIndex}-${projectTypeFilter}`}
                    project={projectData[currentIndex]}
                    position="center"
                    direction={direction}
                    sideX={sideX}
                    filter={projectTypeFilter}
                  />
                  {length > 1 && (
                    <CarouselCard
                      key={`next-${nextIndex}-${projectTypeFilter}`}
                      layoutKey={`next-${nextIndex}-${projectTypeFilter}`}
                      project={projectData[nextIndex]}
                      position="next"
                      direction={direction}
                      sideX={sideX}
                      filter={projectTypeFilter}
                    />
                  )}
                </AnimatePresence>

                {/* Nav arrows */}
                {length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      aria-label="Previous project"
                      className="absolute top-1/2 -translate-y-1/2 left-3 max-[768px]:left-2 max-[480px]:left-1.5 w-13 h-13 max-[768px]:w-10 max-[768px]:h-10 max-[480px]:w-9 max-[480px]:h-9 rounded-full border-[1.5px] border-white/[0.18] bg-[rgba(10,12,22,0.75)] backdrop-blur-[14px] text-white flex items-center justify-center cursor-pointer z-10 transition-[background,border-color,box-shadow] duration-[220ms] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[rgba(14,165,233,0.35)] hover:border-[rgba(14,165,233,0.65)] hover:shadow-[0_0_24px_rgba(14,165,233,0.35)] focus-visible:outline-2 focus-visible:outline-[rgba(14,165,233,0.7)] focus-visible:outline-offset-[3px]"
                    >
                      <FiChevronLeft size={28} />
                    </button>
                    <button
                      onClick={goNext}
                      aria-label="Next project"
                      className="absolute top-1/2 -translate-y-1/2 right-3 max-[768px]:right-2 max-[480px]:right-1.5 w-13 h-13 max-[768px]:w-10 max-[768px]:h-10 max-[480px]:w-9 max-[480px]:h-9 rounded-full border-[1.5px] border-white/[0.18] bg-[rgba(10,12,22,0.75)] backdrop-blur-[14px] text-white flex items-center justify-center cursor-pointer z-10 transition-[background,border-color,box-shadow] duration-[220ms] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[rgba(14,165,233,0.35)] hover:border-[rgba(14,165,233,0.65)] hover:shadow-[0_0_24px_rgba(14,165,233,0.35)] focus-visible:outline-2 focus-visible:outline-[rgba(14,165,233,0.7)] focus-visible:outline-offset-[3px]"
                    >
                      <FiChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Dot indicators */}
            {length > 1 && (
              <div className="flex items-center gap-2">
                {projectData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={[
                      'h-2 rounded-[4px] border-none cursor-pointer p-0',
                      'transition-[width,background] duration-[350ms] cubic-bezier(0.4,0,0.2,1)',
                      'focus-visible:outline-2 focus-visible:outline-[rgba(14,165,233,0.7)] focus-visible:outline-offset-[3px]',
                      i === currentIndex
                        ? 'w-7 shadow-[0_0_8px_rgba(14,165,233,0.55)]'
                        : 'w-2 bg-white/[0.22] hover:bg-white/[0.45]',
                    ].join(' ')}
                    style={
                      i === currentIndex
                        ? {
                            background:
                              'linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))',
                          }
                        : {}
                    }
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            <p className="m-0 text-[0.82rem] text-white/35 tracking-[0.05em] font-medium">
              {currentIndex + 1} / {length}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
