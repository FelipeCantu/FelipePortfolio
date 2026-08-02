import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanity, POST_BY_SLUG_QUERY, ALL_POSTS_SLUGS_QUERY } from '@/lib/sanity'
import SinglePostContent from '@/components/SinglePostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts: Array<{ slug: string }> = await sanity.fetch(ALL_POSTS_SLUGS_QUERY)
  return posts.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanity.fetch(POST_BY_SLUG_QUERY, { slug })
  if (!post) return { title: 'Post Not Found' }

  const firstBlock = post.body?.find((b: { _type: string }) => b._type === 'block')
  const bodyText =
    firstBlock?.children
      ?.filter((c: { _type: string }) => c._type === 'span')
      .map((c: { text: string }) => c.text)
      .join('') ?? ''

  const description =
    post.excerpt ?? (bodyText ? bodyText.slice(0, 155) : `Read "${post.title}" by Felipe Cantu Jr.`)

  return {
    title: post.title,
    description,
    alternates: { canonical: `https://felipecantujr.com/post/${slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} | Felipe Cantu Jr`,
      description,
      url: `https://felipecantujr.com/post/${slug}`,
      images: post.mainImage?.asset?.url ? [{ url: post.mainImage.asset.url }] : [],
      publishedTime: post.publishedAt ?? post._createdAt,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await sanity.fetch(POST_BY_SLUG_QUERY, { slug })
  if (!post) notFound()
  return <SinglePostContent post={post} slug={slug} />
}
