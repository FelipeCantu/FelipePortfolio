'use client'

interface Props {
  open: boolean
  onClick: () => void
}

export default function HamburgerButton({ open, onClick }: Props) {
  return (
    <button
      className="md:hidden fixed top-[10px] right-3 w-11 h-11 flex flex-col justify-center items-center gap-[5px] bg-[rgba(10,12,22,0.65)] backdrop-blur-[14px] border border-white/[0.12] rounded-[10px] cursor-pointer z-[1400] shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-[220ms] hover:bg-[rgba(14,165,233,0.15)] hover:border-[rgba(14,165,233,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/70"
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-controls="mobile-sidebar"
      onClick={onClick}
    >
      <span
        className="block w-6 h-0.5 bg-white/90 rounded transition-transform duration-300 origin-center"
        style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
      />
      <span
        className="block w-6 h-0.5 bg-white/90 rounded transition-all duration-300 origin-center"
        style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'scaleX(1)' }}
      />
      <span
        className="block w-6 h-0.5 bg-white/90 rounded transition-transform duration-300 origin-center"
        style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
      />
    </button>
  )
}
