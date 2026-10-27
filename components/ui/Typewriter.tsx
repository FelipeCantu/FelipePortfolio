'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface TypewriterProps {
  /** Phrases typed in turn, each rendered with the brand gradient. */
  phrases: string[]
  typeMs?: number
  deleteMs?: number
  /** How long a finished phrase stays on screen before erasing. */
  holdMs?: number
  /** Delay before the first keystroke (lets the hero entrance play first). */
  startMs?: number
  className?: string
}

/**
 * Types each phrase out, holds, erases, and moves to the next, looping.
 * Purely visual (aria-hidden): the parent heading should carry the full
 * sentence for screen readers. Every phrase is also rendered invisibly in the
 * same grid cell so the box is always sized to the longest one: no layout
 * shift while typing. Reduced-motion visitors see the first phrase, static.
 */
export default function Typewriter({
  phrases,
  typeMs = 60,
  deleteMs = 30,
  holdMs = 2400,
  startMs = 900,
  className = '',
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  // The server can't know the motion preference; treat it as "no preference"
  // until after hydration so the first client render matches the server HTML.
  useEffect(() => setMounted(true), [])
  const reduceMotion = mounted && !!prefersReducedMotion

  const phrase = phrases[index % Math.max(phrases.length, 1)] ?? ''

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) return
    if (!started) {
      const t = setTimeout(() => setStarted(true), startMs)
      return () => clearTimeout(t)
    }

    const finished = !deleting && count === phrase.length
    const emptied = deleting && count === 0
    const delay = finished ? holdMs : emptied ? 400 : deleting ? deleteMs : typeMs

    const t = setTimeout(() => {
      if (finished) setDeleting(true)
      else if (emptied) {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      } else setCount((c) => c + (deleting ? -1 : 1))
    }, delay)
    return () => clearTimeout(t)
  }, [reduceMotion, started, count, deleting, phrase.length, phrases.length, typeMs, deleteMs, holdMs, startMs])

  const typed = reduceMotion ? phrase.length : count
  // Caret stays solid while keys are moving and only blinks when idle
  const idle = !started || (!deleting && count === phrase.length) || (deleting && count === 0)

  // The whole phrase is always laid out; untyped characters are just hidden.
  // Line breaks are therefore fixed from the first keystroke, and the gradient
  // sits on the full-width cell, so it never re-stretches as letters appear.
  return (
    <span className={`grid ${className}`} aria-hidden="true">
      {/* Every phrase, invisible, in one cell: reserves the tallest one */}
      {phrases.map((p) => (
        <span key={p} className="invisible col-start-1 row-start-1">
          {p}
        </span>
      ))}
      <span className="text-gradient col-start-1 row-start-1">
        {phrase.slice(0, typed)}
        {!reduceMotion && <span className={idle ? 'typewriter-caret is-idle' : 'typewriter-caret'} />}
        <span className="invisible">{phrase.slice(typed)}</span>
      </span>
    </span>
  )
}
