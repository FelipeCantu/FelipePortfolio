'use client'

import { useEffect } from 'react'

/**
 * Publishes the window scroll offset as `--scroll-y` (unitless px) on <html>
 * so the CSS backdrop layers in globals.css can drift at different speeds.
 * Throttled to one write per animation frame; does nothing for
 * reduced-motion visitors, which leaves the backdrop static.
 */
export default function ScrollParallax() {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const root = document.documentElement
    let frame = 0

    const write = () => {
      frame = 0
      root.style.setProperty('--scroll-y', String(Math.round(window.scrollY)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }
    const start = () => {
      write()
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    const stop = () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      root.style.removeProperty('--scroll-y')
    }
    const sync = () => (motionQuery.matches ? stop() : start())

    sync()
    motionQuery.addEventListener('change', sync)
    return () => {
      motionQuery.removeEventListener('change', sync)
      stop()
    }
  }, [])

  return null
}
