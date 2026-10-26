'use client'

interface Props {
  open: boolean
  onClick: () => void
}

export default function HamburgerButton({ open, onClick }: Props) {
  return (
    <button
      type="button"
      className="glass fixed right-[max(var(--gutter),0.75rem)] top-[10px] z-[1400] flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-control border border-line/25 shadow-card transition-[background-color,border-color] duration-200 hover:border-accent-light/60 hover:bg-accent/15 lg:hidden"
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-controls="mobile-sidebar"
      onClick={onClick}
    >
      <span
        className="block h-0.5 w-6 origin-center rounded bg-fg transition-transform duration-300"
        style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
      />
      <span
        className="block h-0.5 w-6 origin-center rounded bg-fg transition-all duration-300"
        style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'scaleX(1)' }}
      />
      <span
        className="block h-0.5 w-6 origin-center rounded bg-fg transition-transform duration-300"
        style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
      />
    </button>
  )
}
