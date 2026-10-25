'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Seconds to wait before the reveal starts (use for staggering lists). */
  delay?: number
  /** Distance in px the element travels upward while fading in. */
  y?: number
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}

/**
 * Scroll-reveal wrapper: fades and lifts content in once as it enters the
 * viewport. Reduced-motion users get a plain fade via <MotionProvider>.
 */
export default function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
