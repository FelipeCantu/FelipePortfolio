import type { PortableTextReactComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

/**
 * Shared Portable Text renderers for blog posts and project case studies.
 * Typography (headings, paragraphs, lists, quotes, code) is styled once by the
 * `.prose-pt` class in app/globals.css; these overrides only add what plain
 * HTML can't express: figures with captions, code blocks and external-link attributes.
 */

type ImageValue = { asset: never; alt?: string; caption?: string }
type CodeValue = { code?: string; language?: string }

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <figure className="!mt-10 !mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value.asset).url()}
          alt={value.alt ?? 'Article image'}
          loading="lazy"
          className="mx-auto w-full rounded-card border border-line/15 shadow-lift"
        />
        {value.caption && (
          <figcaption className="mt-3 px-4 text-center text-small italic text-subtle">{value.caption}</figcaption>
        )}
      </figure>
    ),
    code: ({ value }: { value: CodeValue }) => (
      <figure className="!my-8">
        {value.language && value.language !== 'text' && (
          <figcaption className="mb-1.5 font-mono text-[0.72rem] uppercase tracking-wider text-subtle">{value.language}</figcaption>
        )}
        {/* The inline `code` style from .prose-pt is reset so the block reads as one panel */}
        <pre tabIndex={0} aria-label={value.language ? `${value.language} code` : 'Code'} className="!my-0">
          <code className="!border-0 !bg-transparent !p-0 !text-[0.85rem] !leading-relaxed !text-fg/90">{value.code}</code>
        </pre>
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline decoration-accent decoration-2 underline-offset-4">{children}</span>
    ),
    'strike-through': ({ children }: { children?: React.ReactNode }) => (
      <span className="line-through decoration-danger/70">{children}</span>
    ),
  },
}
