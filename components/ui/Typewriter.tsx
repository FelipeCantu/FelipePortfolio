'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface TypewriterPhrase {
  /** Plain lead-in, typed first (e.g. "web apps that "). */
  text: string
  /** Emphasised ending, rendered with the brand gradient. */
  highlight: string
}

interface TypewriterProps {
  /** Fixed text before the typed part; never erased. */
  prefix?: string
  phrases: TypewriterPhrase[]
  typeMs?: number
  deleteMs?: number
  /** How long a finished phrase stays on screen before erasing. */
  holdMs?: number
  /** Delay before the first keystroke (lets the hero entrance play first). */
  startMs?: number
}

/**
 * Types each phrase out, holds, erases, and moves to the next, looping.
 * Purely visual (aria-hidden): the parent heading should carry the full
 * sentence for screen readers. Every phrase is also rendered invisibly in the
 * same grid cell so the box is always sized to the longest one: no layout
 * shift while typing. Reduced-motion visitors see the first phrase, static.
 */
export default function Typewriter({
  prefix = '',
  phrases,
  typeMs = 55,
  deleteMs = 28,
  holdMs = 2600,
  startMs = 700,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  const phrase = phrases[index]
  const full = phrase.text + phrase.highlight

  useEffect(() => {
    if (reduceMotion) return
    if (!started) {
      const t = setTimeout(() => setStarted(true), startMs)
      return () => clearTimeout(t)
    }

    const finished = !deleting && count === full.length
    const emptied = deleting && count === 0
    const delay = finished ? holdMs : emptied ? 350 : deleting ? deleteMs : typeMs

    const t = setTimeout(() => {
      if (finished) setDeleting(true)
      else if (emptied) {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      } else setCount((c) => c + (deleting ? -1 : 1))
    }, delay)
    return () => clearTimeout(t)
  }, [reduceMotion, started, count, deleting, full.length, phrases.length, typeMs, deleteMs, holdMs, startMs])

  // The whole phrase is always laid out; untyped characters are just hidden.
  // Line breaks are therefore fixed from the first keystroke: no words
  // jumping between lines as they grow, and the gradient never re-stretches.
  const typed = reduceMotion ? full.length : count
  const caret = reduceMotion ? null : <span className="typewriter-caret" />
  const reveal = (part: string, offset: number) => {
    const n = Math.min(Math.max(typed - offset, 0), part.length)
    const caretHere = typed >= offset && (typed < offset + part.length || offset + part.length === full.length)
    return (
      <>
        {part.slice(0, n)}
        {caretHere && caret}
        <span className="invisible">{part.slice(n)}</span>
      </>
    )
  }

  return (
    <span className="grid" aria-hidden="true">
      {/* Every phrase, invisible, in one cell: reserves the tallest one */}
      {phrases.map((p) => (
        <span key={p.text + p.highlight} className="invisible col-start-1 row-start-1">
          {prefix}
          {p.text}
          {p.highlight}
        </span>
      ))}
      <span className="col-start-1 row-start-1">
        {prefix}
        {reveal(phrase.text, 0)}
        <span className="text-gradient">{reveal(phrase.highlight, phrase.text.length)}</span>
      </span>
    </span>
  )
}
