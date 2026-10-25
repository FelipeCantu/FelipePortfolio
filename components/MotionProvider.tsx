'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Wraps the app so every framer-motion animation honours the visitor's
 * `prefers-reduced-motion` setting. With reducedMotion="user", transform and
 * layout animations are disabled while opacity fades are kept.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
