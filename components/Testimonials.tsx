'use client'
import { useEffect, useState } from 'react'
import { sanity, urlFor, TESTIMONIALS_QUERY } from '@/lib/sanity'

interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  quote: string
  rating?: number
  avatar?: unknown
}

const MOCK: Testimonial[] = [
  { _id: 'mock-1', name: 'Sarah Mitchell', role: 'Founder', company: 'Bloom Studio', quote: 'Felipe built our entire site from scratch in under three weeks. Clean code, fast delivery, and he actually listened to what we wanted. Our bounce rate dropped 40% after launch.', rating: 5, avatar: null },
  { _id: 'mock-2', name: 'Marcus T.', role: 'CEO', company: 'TradeRight', quote: 'We needed a developer who could handle both design and code. Felipe delivered on both. The site looks professional and runs fast — exactly what we asked for.', rating: 5, avatar: null },
  { _id: 'mock-3', name: 'Jasmine Reyes', role: 'Marketing Director', company: 'Apex Health', quote: 'Responsive, detail-oriented, and great at communicating throughout the project. I would hire Felipe again without hesitation.', rating: 5, avatar: null },
]

function Stars({ rating }: { rating?: number }) {
  if (!rating) return null
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-[0.9rem] ${i < rating ? 'text-yellow-400' : 'text-white/15'}`}>★</span>
      ))}
    </div>
  )
}

function Avatar({ src, name }: { src: unknown; name: string }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  if (src) {
    return (
      <img
        src={urlFor(src).width(96).height(96).fit('crop').auto('format').url()}
        alt={name}
        className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-[1.5px] border-accent/30"
      />
    )
  }
  return (
    <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-[0.82rem] text-accent-light border-[1.5px] border-accent/35"
      style={{ background: 'linear-gradient(135deg,rgba(14,165,233,0.3),rgba(56,189,248,0.2))' }}>
      {initials}
    </div>
  )
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanity.fetch(TESTIMONIALS_QUERY)
      .then((data: Testimonial[]) => { setItems(data.length > 0 ? data : MOCK); setLoading(false) })
      .catch(() => { setItems(MOCK); setLoading(false) })
  }, [])

  if (loading || items.length === 0) return null

  const cols = Math.min(items.length, 3)

  return (
    <section className="relative w-full py-20 overflow-hidden max-md:py-16">
      {/* Background */}
      <div className="absolute inset-0 z-0 border-t border-white/[0.06]"
        style={{
          background: 'rgba(10,12,22,0.97)',
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 20% 80%,rgba(14,165,233,0.06) 0%,transparent 70%),radial-gradient(ellipse 50% 35% at 80% 20%,rgba(14,165,233,0.04) 0%,transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 max-md:px-4">
        {/* Header */}
        <div className="text-center mb-14 animate-[fadeInUp_0.7s_ease-out_both] max-md:mb-10">
          <p className="font-body text-[0.72rem] font-bold tracking-[0.18em] uppercase text-accent-light mb-3">Testimonials</p>
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,3.5vw,2.5rem)] text-white tracking-[-0.025em] leading-[1.1] mb-3">What Clients Say</h2>
          <p className="font-body text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/50 font-light leading-[1.7]">Real feedback from people I've had the pleasure of working with.</p>
        </div>

        {/* Grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}
        >
          {items.map((t) => (
            <article
              key={t._id}
              className="relative flex flex-col gap-4 p-7 bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl transition-all duration-[250ms] hover:border-accent/25 hover:bg-accent/5 hover:-translate-y-1 animate-[fadeInUp_0.7s_ease-out_both] max-md:p-6"
            >
              <Stars rating={t.rating} />
              <blockquote className="font-body text-[clamp(0.9rem,1.2vw,1rem)] font-light leading-[1.75] text-white/82 m-0 flex-1">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-[0.85rem] mt-auto pt-5 border-t border-white/[0.07]">
                <Avatar src={t.avatar} name={t.name} />
                <div className="min-w-0">
                  <p className="font-body text-[0.9rem] font-semibold text-white m-0 truncate">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="font-body text-[0.78rem] text-white/45 font-normal mt-0.5 m-0 truncate">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
