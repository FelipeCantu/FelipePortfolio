'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import HamburgerButton from './HamburgerButton'

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Scrim behind the mobile drawer */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[1299] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
      />

      <Sidebar open={open} onClose={() => setOpen(false)} />
      <HamburgerButton open={open} onClick={() => setOpen(o => !o)} />

      {children}
    </>
  )
}
