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

export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(featured desc, order asc, date desc) {
  _id,
  title,
  slug,
  description,
  excerpt,
  featured,
  status,
  projectType,
  techStack,
  date,
  place,
  githubUrl,
  liveUrl,
  _updatedAt,
  mainImage { asset->{ _id, url }, alt },
  gallery[]{ asset->{ _id, url }, alt, caption }
}`

export const ALL_PROJECTS_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  excerpt,
  featured,
  status,
  projectType,
  techStack,
  date,
  place,
  githubUrl,
  liveUrl,
  _updatedAt,
  mainImage { asset->{ _id, url }, alt },
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
