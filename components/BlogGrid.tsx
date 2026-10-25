'use client'

import Link from 'next/link'
import { FiCalendar, FiClock, FiArrowRight, FiFileText } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'

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
  // If no posts, show empty state: data comes from the parent, no fetch needed
  if (!posts || posts.length === 0) {
    return (
      <div className="container-page page-top section-y">
        <div className="card mx-auto flex max-w-lg flex-col items-center px-8 py-14 text-center">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light">
            <FiFileText size={24} aria-hidden="true" />
          </span>
          <h1 className="text-h3 text-fg">No posts yet</h1>
          <p className="mt-2 text-muted">Check back soon for new articles and insights.</p>
        </div>
      </div>
    )
  }

  const processedPosts = posts.map(processPost)

  return (
    <div className="container-page page-top pb-section">
      {/* Section header */}
      <header className="mx-auto mb-12 max-w-2xl text-center max-md:mb-8">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-3 text-h1 text-fg">Recent posts</h1>
        <p className="lead mt-3">
          {posts.length} article{posts.length !== 1 ? 's' : ''} on web development, tooling, and building for the web.
        </p>
      </header>

      {/* Post grid */}
      <ul
        className="grid list-none gap-6 p-0 max-sm:gap-5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(21rem, 100%), 1fr))' }}
      >
        {processedPosts.map((post, index) => (
          <Reveal as="li" key={post.slug.current} delay={Math.min(index, 5) * 0.06} className="h-full">
            <article className="card-interactive group h-full overflow-hidden">
              <Link href={`/post/${post.slug.current}`} className="flex h-full flex-col text-[inherit] no-underline">
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-raised">
                  {post.mainImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt ?? post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-accent-dark/40 via-surface to-accent/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-safe:animate-shimmer" />
                      <FiFileText size={40} className="relative text-accent-light/80" aria-hidden="true" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 max-sm:p-5">
                  <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-subtle">
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar size={13} className="text-accent-light" aria-hidden="true" />
                      <time dateTime={post.displayDate}>
                        {new Date(post.displayDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock size={13} className="text-accent-light" aria-hidden="true" />
                      {post.estimatedReadingTime} min read
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-h3 text-fg transition-colors group-hover:text-accent-light">
                    {post.title}
                  </h2>

                  {post.computedExcerpt && (
                    <p className="mb-6 mt-3 line-clamp-3 flex-1 text-small text-muted">{post.computedExcerpt}</p>
                  )}

                  <span className="mt-auto inline-flex items-center gap-2 text-small font-semibold text-accent-light">
                    Continue reading
                    <FiArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
