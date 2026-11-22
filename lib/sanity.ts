import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanity = createClient({
  projectId: 'pnm3puk3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanity)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── GROQ Queries ──────────────────────────────────────────────────────────

export const ALL_POSTS_QUERY = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  _createdAt,
  _updatedAt,
  mainImage { asset->{ _id, url }, alt },
  body,
  "name": author->name,
  "authorImage": author->image
}`

export const ALL_POSTS_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  _createdAt,
  _updatedAt,
  mainImage { asset->{ _id, url }, alt },
  body,
  "name": author->name,
  "authorImage": author->image
}`

// Only curated projects (`showcase` in the Studio) are public: the portfolio,
// case-study pages and sitemap all filter on this, so hidden ones 404.
const SHOWCASED = `_type == "project" && showcase == true && defined(slug.current)`

export const SHOWCASE_PROJECTS_QUERY = `*[${SHOWCASED}] | order(order asc, date desc)[0...5] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  role,
  status,
  "techStack": tags[0...4],
  date,
  place,
  "liveUrl": link,
  "image": image {
    alt,
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`

export const ALL_PROJECTS_SLUGS_QUERY = `*[${SHOWCASED}]{ "slug": slug.current, _updatedAt }`

export const PROJECT_BY_SLUG_QUERY = `*[${SHOWCASED} && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  role,
  status,
  "techStack": tags,
  date,
  place,
  "githubUrl": githubLink,
  "liveUrl": link,
  _updatedAt,
  "mainImage": image { asset->{ _id, url }, alt },
  body,
  gallery[]{ asset->{ _id, url }, alt, caption }
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(order asc)[0...6] {
  _id,
  name,
  role,
  company,
  quote,
  rating,
  avatar { asset->{ _id, url } }
}`
