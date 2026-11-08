'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

/**
 * Wraps the app so every framer-motion animation honours the visitor's
 * `prefers-reduced-motion` setting. With reducedMotion="user", transform and
 * layout animations are disabled while opacity fades are kept.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
