'use client'

import Link from 'next/link'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SanityBlock {
  _type: string
  children?: Array<{ _type: string; text: string }>
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  _createdAt: string
  mainImage?: {
    asset: { url: string }
    alt?: string
  }
  body?: SanityBlock[]
  name?: string
}

interface ProcessedPost extends SanityPost {
  displayDate: string
  estimatedReadingTime: number
  computedExcerpt: string
}

interface BlogGridProps {
  posts: SanityPost[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeReadingTime(body: SanityBlock[] | undefined): number {
  if (!body) return 1
  const charCount = body.reduce((acc, block) => {
    if (block._type === 'block' && block.children) {
      const text = block.children
        .filter((child) => child._type === 'span')
        .map((span) => span.text)
        .join('')
      return acc + text.length
    }
    return acc
  }, 0)
  return Math.max(1, Math.round(charCount / 1000))
}

function computeExcerpt(post: SanityPost): string {
  if (post.excerpt) return post.excerpt
  if (!post.body) return 'Click to read this article...'
  return (
    post.body
      .filter((block) => block._type === 'block' && block.children)
      .slice(0, 2)
      .map((block) =>
        (block.children ?? [])
          .filter((child) => child._type === 'span')
          .map((span) => span.text)
          .join('')
      )
      .join(' ')
      .substring(0, 150) + '...'
  )
}

function processPost(post: SanityPost): ProcessedPost {
  return {
    ...post,
    displayDate: post.publishedAt ?? post._createdAt,
    estimatedReadingTime: computeReadingTime(post.body),
    computedExcerpt: computeExcerpt(post),
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogGrid({ posts }: BlogGridProps) {
  // If no posts, show empty state — no fetch needed, data comes from parent
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No Posts Yet</h3>
        <p className="text-white/50">Check back soon for new articles and insights!</p>
      </div>
    )
  }

  const processedPosts = posts.map(processPost)

  return (
    <div className="w-full pt-[calc(var(--navbar-h,60px)+2rem)] pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Section header */}
      <div className="text-center mb-12 max-md:mb-8 max-[480px]:mb-6">
        <h2 className="text-[2.5rem] max-md:text-[2rem] max-[480px]:text-2xl font-bold text-white mb-2">
          Recent Posts
        </h2>
        <p className="text-white/50 text-base max-[480px]:text-sm">
          {posts.length} article{posts.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Post grid */}
      <div
        className="grid gap-8 max-md:gap-4 max-[480px]:gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))' }}
      >
        {processedPosts.map((post, index) => (
          <article
            key={post.slug.current}
            className={[
              'bg-white/[0.06] rounded-2xl max-[480px]:rounded-xl overflow-hidden',
              'border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
              'transition-all duration-[400ms] cubic-bezier(0.25,0.8,0.25,1)',
              'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]',
              'hover:border-[rgba(52,152,219,0.3)]',
              'group',
            ].join(' ')}
            // Staggered entrance animation via inline style
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <Link
              href={`/post/${post.slug.current}`}
              className="block text-[inherit] no-underline h-full"
            >
              {/* Image container */}
              <div className="relative w-full h-[220px] max-[480px]:h-[140px] overflow-hidden">
                {post.mainImage ? (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt ?? post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[600ms] cubic-bezier(0.25,0.8,0.25,1) group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center relative overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                    <span className="text-5xl max-[480px]:text-4xl opacity-80">📄</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-white text-[#667eea] px-6 py-3 max-[480px]:px-3 max-[480px]:py-2 rounded-full font-semibold text-sm max-[480px]:text-xs translate-y-2.5 group-hover:translate-y-0 transition-transform duration-300">
                    <span>Read Article</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Post content */}
              <div className="p-6 max-[480px]:p-3 flex flex-col h-[calc(100%-220px)] max-[480px]:h-[calc(100%-140px)]">
                {/* Meta row */}
                <div className="flex gap-4 max-[480px]:gap-2 mb-4 max-[480px]:mb-2.5 flex-wrap">
                  <div className="flex items-center gap-1.5 max-[480px]:gap-1 text-white/45 text-[0.85rem] max-[480px]:text-[0.65rem]">
                    <FiCalendar size={14} className="text-[#667eea] max-[480px]:w-2.5 max-[480px]:h-2.5" />
                    <span>
                      {new Date(post.displayDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 max-[480px]:gap-1 text-white/45 text-[0.85rem] max-[480px]:text-[0.65rem]">
                    <FiClock size={14} className="text-[#667eea] max-[480px]:w-2.5 max-[480px]:h-2.5" />
                    <span>{post.estimatedReadingTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[1.4rem] max-md:text-[1.1rem] max-[480px]:text-[0.9rem] font-bold text-white mb-4 max-md:mb-2.5 max-[480px]:mb-2 leading-[1.3] max-[480px]:leading-[1.2] line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt — hidden on mobile */}
                {post.computedExcerpt && (
                  <p className="text-white/55 leading-relaxed mb-6 max-md:mb-4 flex-grow text-[0.95rem] max-md:text-[0.85rem] line-clamp-3 max-md:line-clamp-2 max-[480px]:hidden">
                    {post.computedExcerpt}
                  </p>
                )}

                {/* Read more link */}
                <div className="flex items-center gap-2 max-[480px]:gap-1.5 text-[#667eea] font-semibold text-[0.9rem] max-[480px]:text-[0.7rem] mt-auto transition-all duration-300 group-hover:text-[#5a67d8]">
                  <span>Continue Reading</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1 max-[480px]:w-3 max-[480px]:h-3" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Keyframe for staggered card entrance */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
