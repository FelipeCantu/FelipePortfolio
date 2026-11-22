'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Router = ReturnType<typeof useRouter>
type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }

/**
 * A Link that morphs shared elements (same `view-transition-name` on both
 * pages, e.g. a project's frame) into the next page with the View
 * Transitions API. Plain navigation without browser support, under reduced
 * motion, and for modified or middle clicks.
 */
export default function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        if (typeof document.startViewTransition !== 'function') return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        e.preventDefault()
        document.startViewTransition(() => navigate(router, href))
      }}
      {...props}
    />
  )
}

/**
 * Resolves once the new route is in the DOM, so the browser snapshots the
 * real page. Each page root carries `data-route` with its pathname. Gives up
 * after 2.5 s so a slow fetch never freezes the old page.
 */
function navigate(router: Router, href: string) {
  const pathname = new URL(href, window.location.href).pathname
  const selector = `[data-route="${CSS.escape(pathname)}"]`

  return new Promise<void>((resolve) => {
    const done = () => {
      observer.disconnect()
      window.clearTimeout(timer)
      resolve()
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) done()
    })
    const timer = window.setTimeout(done, 2500)
    observer.observe(document.body, { childList: true, subtree: true })
    router.push(href)
  })
}
