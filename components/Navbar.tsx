'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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
    <nav className="fixed w-full h-[60px] flex items-center justify-between bg-[rgba(10,12,22,0.72)] backdrop-blur-[18px] border-b border-white/[0.07] pl-[10px] xl:pl-[200px] z-[1000]">
      <div className="flex items-center h-full">
        <Link
          href="/"
          className="flex items-center h-full no-underline"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Logo image / fallback */}
          {!logoError ? (
            <img
              src={isHovered ? '/images/mainblogo.png' : '/images/mainwlogo.png'}
              alt="Felipe Cantu Jr Logo"
              className={`w-[60px] h-[60px] rounded-full border-2 border-white/20 object-cover ml-1 animate-float transition-all duration-300 max-[400px]:w-[50px] max-[400px]:h-[50px]`}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                filter: isHovered ? 'drop-shadow(0 0 8px #1e90ff)' : 'none',
              }}
              onLoad={() => { setImageLoaded(true); setLogoError(false) }}
              onError={() => { setLogoError(true); setImageLoaded(false) }}
            />
          ) : (
            <div
              className="w-[60px] h-[60px] rounded-full ml-1 flex items-center justify-center animate-float transition-all duration-300 border-2 max-[400px]:w-[50px] max-[400px]:h-[50px]"
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg,#1e90ff,#0097e8)'
                  : 'linear-gradient(135deg,#fff,#f8f9fa)',
                color: isHovered ? 'white' : '#1e90ff',
                borderColor: isHovered ? '#1e90ff' : 'rgba(30,144,255,0.3)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                filter: isHovered ? 'drop-shadow(0 0 8px #1e90ff)' : undefined,
              }}
            >
              <span className="font-display font-bold text-xl tracking-tight">FC</span>
            </div>
          )}

          {/* Wordmark with cursor-reveal hover effect */}
          <div
            ref={textRef}
            className="relative flex items-center h-full pl-5 max-[400px]:pl-3"
            onMouseMove={handleMouseMove}
          >
            <span className="font-display font-bold text-[1.4em] tracking-[-0.01em] text-white md:text-[1.2em] max-[400px]:text-[1.05em]">
              Felipe Cantu Jr
            </span>
            {/* Accent overlay revealed by clip-path circle following cursor */}
            <span
              className="absolute top-0 left-5 h-full flex items-center font-display font-bold text-[1.4em] tracking-[-0.01em] text-accent pointer-events-none transition-opacity duration-200 md:text-[1.2em] max-[400px]:text-[1.05em] max-[400px]:left-3"
              style={{
                clipPath: `circle(30px at ${mousePos.x}px ${mousePos.y}px)`,
                opacity: isHovered ? 1 : 0,
              }}
            >
              Felipe Cantu Jr
            </span>
          </div>
        </Link>
      </div>
    </nav>
  )
}
