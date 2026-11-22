/**
 * Shared project status styling so the portfolio index and the case-study
 * page speak the same visual language.
 * Class strings are written out in full so Tailwind can see them.
 */

export const STATUS_CONFIG: Record<string, { badge: string; dot: string; label: string }> = {
  inProgress: {
    badge: 'border-warning/35 bg-warning/10 text-warning',
    dot: 'bg-warning',
    label: 'In progress',
  },
  completed: {
    badge: 'border-success/35 bg-success/10 text-success',
    dot: 'bg-success',
    label: 'Shipped',
  },
}

/** Flat image shape from IMAGE_FIELDS in lib/sanity.ts. */
export interface ProjectImage {
  alt?: string
  url?: string
  lqip?: string
  width?: number
  height?: number
}

export function hostname(url?: string) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/** Shared by a project's index card and its case-study hero, so one morphs into the other. */
export const frameTransitionName = (slug: string) => `project-${slug}`
