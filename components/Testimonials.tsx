'use client'
import { useEffect, useState } from 'react'
import { sanity, urlFor, TESTIMONIALS_QUERY } from '@/lib/sanity'
import Reveal from '@/components/ui/Reveal'

interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  quote: string
  rating?: number
  avatar?: unknown
}

function Stars({ rating }: { rating?: number }) {
  if (!rating) return null
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={`text-[0.95rem] ${i < rating ? 'text-gold' : 'text-line/30'}`}>
          ★
        </span>
      ))}
    </div>
  )
}

function Avatar({ src, name }: { src: unknown; name: string }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlFor(src).width(96).height(96).fit('crop').auto('format').url()}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 flex-shrink-0 rounded-full border border-accent/30 object-cover"
      />
    )
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-accent/35 bg-gradient-to-br from-accent/30 to-accent-light/20 font-display text-[0.85rem] font-bold text-accent-light"
    >
      {initials}
    </div>
  )
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanity.fetch(TESTIMONIALS_QUERY)
      // Only real testimonials from Sanity: the section hides itself when there are none
      .then((data: Testimonial[]) => { setItems(data ?? []); setLoading(false) })
      .catch(() => { setItems([]); setLoading(false) })
  }, [])

  if (loading || items.length === 0) return null

  // Responsive columns: never force 3 columns onto a phone
  const gridCols =
    items.length === 1
      ? 'mx-auto max-w-2xl grid-cols-1'
      : items.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-line/15 bg-bg/60">
      <div className="container-page">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center max-md:mb-10">
          <p className="eyebrow">Testimonials</p>
          <h2 id="testimonials-title" className="mt-3 text-h2 text-fg">
            What clients say
          </h2>
          <p className="lead mt-3">Real feedback from people I've had the pleasure of working with.</p>
        </Reveal>

        <ul className={`m-0 grid list-none gap-6 p-0 ${gridCols}`}>
          {items.map((t, i) => (
            <Reveal as="li" key={t._id} delay={Math.min(i, 5) * 0.07} className="h-full">
              <figure className="card-interactive m-0 flex h-full flex-col gap-4 p-7 max-md:p-6">
                <Stars rating={t.rating} />
                <blockquote className="m-0 flex-1 text-body text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5 border-t border-line/15 pt-5">
                  <Avatar src={t.avatar} name={t.name} />
                  <div className="min-w-0">
                    <p className="m-0 truncate font-semibold text-fg">{t.name}</p>
                    {(t.role || t.company) && (
                      <p className="m-0 mt-0.5 truncate text-[0.8rem] text-subtle">
                        {[t.role, t.company].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
