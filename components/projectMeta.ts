/**
 * Shared project taxonomy styling (type badges + status badges) so the
 * portfolio carousel and the case-study page speak the same visual language.
 * Class strings are written out in full so Tailwind can see them.
 */

export const TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  design: 'Design',
  desktop: 'Desktop App',
}

/** Tinted pill classes per project type (border + fill + text). */
export const TYPE_BADGE: Record<string, string> = {
  web: 'border-accent/35 bg-accent/10 text-accent-light',
  mobile: 'border-violet-400/35 bg-violet-400/10 text-violet-300',
  design: 'border-gold/35 bg-gold/10 text-gold',
  desktop: 'border-success/35 bg-success/10 text-success',
}

export const STATUS_CONFIG: Record<string, { badge: string; dot: string; label: string }> = {
  inProgress: {
    badge: 'border-warning/35 bg-warning/10 text-warning',
    dot: 'bg-warning',
    label: 'In Progress',
  },
  completed: {
    badge: 'border-success/35 bg-success/10 text-success',
    dot: 'bg-success',
    label: 'Completed',
  },
  archived: {
    badge: 'border-line/35 bg-white/[0.05] text-muted',
    dot: 'bg-subtle',
    label: 'Archived',
  },
}
