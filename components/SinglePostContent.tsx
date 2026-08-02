'use client'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

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

const portableComponents = {
  types: {
    image: ({ value }: { value: { asset: never; alt?: string; caption?: string } }) => (
      <div className="text-center my-10">
        <img
          src={urlFor(value.asset).url()}
          alt={value.alt ?? 'Article image'}
          className="max-w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] mx-auto transition-transform duration-300 hover:scale-[1.02]"
        />
        {value.caption && (
          <p className="text-sm text-gray-500 italic mt-4 px-4 leading-relaxed">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-[#1f2937] font-extrabold text-4xl mt-10 mb-6 leading-tight border-b-[3px] border-[#667eea] pb-2 max-md:text-[2rem]">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-[#1f2937] font-bold text-[1.875rem] mt-8 mb-4 leading-snug max-md:text-[1.75rem]">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-[#1f2937] font-semibold text-2xl mt-7 mb-4 leading-snug max-md:text-[1.375rem]">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-[#1f2937] font-semibold text-xl mt-6 mb-3 leading-snug max-md:text-[1.125rem]">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#667eea] px-8 py-6 my-8 italic text-[#4b5563] bg-gradient-to-br from-[rgba(102,126,234,0.05)] to-[rgba(102,126,234,0.02)] rounded-r-xl relative overflow-visible">
        <span className="absolute -top-2 left-5 text-[4rem] text-[#667eea] opacity-30 font-serif leading-none select-none" aria-hidden="true">&ldquo;</span>
        <p className="mb-0 text-lg">{children}</p>
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 last:mb-0 leading-[1.8]">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-[#1f2937]">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic text-[#4b5563]">{children}</em>,
    underline: ({ children }: { children?: React.ReactNode }) => <span className="underline decoration-[#667eea] decoration-2 underline-offset-2">{children}</span>,
    'strike-through': ({ children }: { children?: React.ReactNode }) => <span className="line-through decoration-red-500/70">{children}</span>,
    code: ({ children }: { children?: React.ReactNode }) => <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-[0.875em] text-[#667eea] border border-gray-200">{children}</code>,
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#667eea] font-medium border-b border-transparent hover:text-[#5a67d8] hover:border-[#5a67d8] transition-all duration-300">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-6 pl-8 list-none space-y-3">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-6 pl-8 space-y-3">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="relative leading-[1.7] before:content-['•'] before:text-[#667eea] before:font-bold before:absolute before:-left-6 before:text-[1.2em]">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-[1.7] [&::marker]:text-[#667eea] [&::marker]:font-semibold">{children}</li>
    ),
  },
}

export default function SinglePostContent({ post, slug }: Props) {
  const readingTime = calcReadingTime(post.body)
  const displayDate = post.publishedAt ?? post._createdAt

  return (
    <div
      className="relative min-h-screen w-full pt-[80px]"
      style={{
        backgroundImage: 'linear-gradient(rgba(20,20,30,0.75),rgba(20,20,30,0.75)),url(/images/mainbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative z-10 max-w-[1000px] mx-auto px-8 max-md:px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/90 no-underline font-medium mb-8 px-6 py-3 bg-white/10 backdrop-blur-[10px] rounded-[25px] border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-x-1"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <article className="bg-white/95 backdrop-blur-[20px] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] mb-8 animate-[fadeInUp_0.8s_ease-out]">
          {/* Hero image */}
          {post.mainImage?.asset?.url && (
            <div className="relative w-full h-[400px] overflow-hidden max-md:h-[250px]">
              <img src={post.mainImage.asset.url} alt={post.mainImage.alt ?? post.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          <header className={`${post.mainImage ? 'p-8 max-md:p-6' : 'pt-12 px-8 pb-8 max-md:pt-8 max-md:px-6'}`}>
            {/* Author + meta */}
            <div className="flex items-center gap-4 mb-6">
              {!!post.authorImage && post.name && (
                <>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-[3px] border-gray-100 flex-shrink-0">
                    <img src={urlFor(post.authorImage as never).url()} alt={post.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#1f2937] text-[1.1rem] font-semibold m-0">{post.name}</h3>
                    <div className="flex gap-6 flex-wrap">
                      <span className="flex items-center gap-[0.4rem] text-gray-500 text-[0.9rem]">
                        <FiCalendar size={14} className="text-[#667eea]" />
                        {new Date(displayDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-[0.4rem] text-gray-500 text-[0.9rem]">
                        <FiClock size={14} className="text-[#667eea]" />
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <h1 className="text-[#1f2937] text-[2.5rem] font-extrabold leading-tight m-0 max-md:text-[2rem] max-[480px]:text-[1.75rem]">
              {post.title}
            </h1>
          </header>

          {/* Body */}
          <div className="px-8 pb-12 text-[#374151] leading-[1.8] text-[1.1rem] max-md:px-6 max-md:pb-8 max-md:text-base">
            <PortableText value={post.body as never} components={portableComponents} />
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
