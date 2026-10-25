type Gtag = (command: 'event', eventName: string, params?: Record<string, unknown>) => void

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const gtag = typeof window !== 'undefined' ? (window as Window & { gtag?: Gtag }).gtag : undefined
  if (typeof gtag === 'function') {
    gtag('event', eventName, params)
  }
}
