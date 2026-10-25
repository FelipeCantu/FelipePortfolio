'use client'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import { portableTextComponents } from '@/components/portableTextComponents'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  _createdAt: string
  mainImage?: { asset: { _id: string; url: string }; alt?: string }
  body: unknown[]
  name?: string
  authorImage?: unknown
}

interface Props {
  post: Post
  slug: string
}

function calcReadingTime(body: unknown[]): number {
  const wordCount = (body as Array<{ _type: string; children?: Array<{ _type: string; text: string }> }>).reduce((acc, block) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.filter(c => c._type === 'span').map(c => c.text).join('')
      return acc + text.split(' ').length
    }
    return acc
  }, 0)
  return Math.max(1, Math.round(wordCount / 200))
}

export default function SinglePostContent({ post, slug }: Props) {
  const readingTime = calcReadingTime(post.body)
  const displayDate = post.publishedAt ?? post._createdAt

  return (
    <div className="page-top pb-section">
      <div className="container-page max-w-3xl">
        <Link href="/blog" className="btn btn-ghost btn-sm -ml-4 mb-6 group">
          <FiArrowLeft aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to blog
        </Link>

        <article>
          <header>
            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar size={14} className="text-accent-light" aria-hidden="true" />
                <time dateTime={displayDate}>
                  {new Date(displayDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock size={14} className="text-accent-light" aria-hidden="true" />
                {readingTime} min read
              </span>
            </div>

            <h1 className="text-h1 text-fg">{post.title}</h1>

            {(!!post.authorImage || post.name) && (
              <div className="mt-7 flex items-center gap-3 border-t border-line/15 pt-6">
                {!!post.authorImage && post.name && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(post.authorImage as never).width(96).height(96).fit('crop').url()}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 flex-shrink-0 rounded-full border border-line/30 object-cover"
                  />
                )}
                {post.name && (
                  <p className="font-semibold text-fg">{post.name}</p>
                )}
              </div>
            )}
          </header>

          {post.mainImage?.asset?.url && (
            <figure className="mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt ?? post.title}
                className="aspect-[16/9] w-full rounded-card border border-line/15 object-cover shadow-lift"
              />
            </figure>
          )}

          {/* Body */}
          <div className="prose-pt mt-12 max-md:text-base">
            <PortableText value={post.body as never} components={portableTextComponents} />
          </div>
        </article>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt ?? '',
              url: `https://felipecantujr.com/post/${slug}`,
              author: { '@type': 'Person', name: 'Felipe Cantu Jr', url: 'https://felipecantujr.com' },
              publisher: { '@type': 'Person', name: 'Felipe Cantu Jr', url: 'https://felipecantujr.com' },
              ...(post.mainImage?.asset?.url && { image: post.mainImage.asset.url }),
              ...(displayDate && { datePublished: displayDate }),
            }),
          }}
        />
      </div>
    </div>
  )
}
