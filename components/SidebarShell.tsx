'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import HamburgerButton from './HamburgerButton'

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[1299] bg-black/55 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar drawer */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Hamburger */}
      <HamburgerButton open={open} onClick={() => setOpen(o => !o)} />

      {children}
    </>
  )
}
