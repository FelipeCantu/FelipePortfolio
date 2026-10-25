'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

/**
 * Fixed top bar: logo + wordmark. The nav links themselves live in <Sidebar>
 * (desktop row / mobile drawer) and are positioned over this bar's right side.
 */
export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [logoError, setLogoError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  useEffect(() => {
    const preload = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject()
        img.src = src
      })

    preload('/images/mainwlogo.png')
      .then(() => preload('/images/mainblogo.png'))
      .then(() => { setImageLoaded(true); setLogoError(false) })
      .catch(() => { setLogoError(true); setImageLoaded(false) })
  }, [])

  return (
    <header
      className="glass pl-nav-gutter fixed inset-x-0 top-0 z-[1000] flex h-nav items-center justify-between border-b border-line/15"
    >
      <Link
        href="/"
        aria-label="Felipe Cantu Jr, home"
        className="flex h-full items-center gap-3 no-underline"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo image / fallback monogram */}
        {!logoError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={isHovered ? '/images/mainblogo.png' : '/images/mainwlogo.png'}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-line/30 object-cover transition-[transform,box-shadow,opacity] duration-300 ease-out-expo"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              boxShadow: isHovered ? '0 0 0 3px rgb(var(--c-accent) / 0.35)' : 'none',
            }}
            onLoad={() => { setImageLoaded(true); setLogoError(false) }}
            onError={() => { setLogoError(true); setImageLoaded(false) }}
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-light transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
            aria-hidden="true"
          >
            <span className="font-display text-base font-bold tracking-tight">FC</span>
          </div>
        )}

        {/* Wordmark with cursor-reveal hover effect */}
        <div ref={textRef} className="relative flex h-full items-center" onMouseMove={handleMouseMove}>
          <span className="font-display text-lg font-bold tracking-tight text-fg max-[380px]:text-base">
            Felipe Cantu Jr
          </span>
          {/* Accent overlay revealed by a clip-path circle that follows the cursor */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 flex h-full items-center font-display text-lg font-bold tracking-tight text-accent-light transition-opacity duration-200 max-[380px]:text-base"
            style={{
              clipPath: `circle(28px at ${mousePos.x}px ${mousePos.y}px)`,
              opacity: isHovered ? 1 : 0,
            }}
          >
            Felipe Cantu Jr
          </span>
        </div>
      </Link>
    </header>
  )
}
