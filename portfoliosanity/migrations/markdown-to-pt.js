// Markdown subset -> Portable Text, shared by the content loaders in this folder
// (rewrite-posts.js, rewrite-case-studies.js).
// ## / ### headings, paragraphs, - and 1. lists, > callouts, ```lang code blocks,
// **bold**, *italic*, `code`, [links](https://…) and [IMAGE n] markers that keep a
// document's existing inline images.
import crypto from 'node:crypto'

const key = () => crypto.randomBytes(6).toString('hex')

/* ───────────── Markdown → Portable Text ───────────── */

/** Inline text → spans + link markDefs. Handles **bold**, *em*, `code`, ``code with ` inside``, [text](url), nested. */
function inline(text, markDefs, marks = []) {
  const spans = []
  const push = (t, m) => {
    if (!t) return
    const last = spans[spans.length - 1]
    if (last && last.marks.join() === m.join()) last.text += t
    else spans.push({_type: 'span', _key: key(), text: t, marks: m})
  }
  const re = /``\s?(?<dcode>.+?)\s?``|`(?<code>[^`]+)`|\*\*(?<strong>.+?)\*\*|\[(?<label>[^\]]+)\]\((?<href>[^)\s]+)\)|\*(?<em>[^*\s][^*]*?)\*/
  let rest = text
  while (rest) {
    const m = rest.match(re)
    if (!m) {
      push(rest, marks)
      break
    }
    push(rest.slice(0, m.index), marks)
    const g = m.groups
    const nested = (t, mark) => inline(t, markDefs, [...marks, mark]).forEach((s) => push(s.text, s.marks))
    if (g.dcode !== undefined || g.code !== undefined) push(g.dcode ?? g.code, [...marks, 'code'])
    else if (g.strong !== undefined) nested(g.strong, 'strong')
    else if (g.label !== undefined) {
      const def = {_type: 'link', _key: key(), href: g.href}
      markDefs.push(def)
      nested(g.label, def._key)
    } else nested(g.em, 'em')
    rest = rest.slice(m.index + m[0].length)
  }
  return spans
}

function block(text, extra = {}) {
  const markDefs = []
  const children = inline(text.trim(), markDefs)
  return {_type: 'block', _key: key(), style: 'normal', markDefs, children, ...extra}
}

/** Parses the frontmatter and converts the body. `images` are the post's existing inline image blocks, in order. */
export function convert(markdown, images = []) {
  const src = markdown.replace(/\r\n/g, '\n')
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fm) throw new Error('Missing --- frontmatter --- block')
  const meta = {}
  for (const line of fm[1].split('\n')) {
    const m = line.match(/^(\w+):\s*"(.*)"\s*$/)
    if (m) meta[m[1]] = m[2].replace(/\\"/g, '"')
  }
  if (!meta.title) throw new Error('Frontmatter needs a title')
  if (meta.excerpt && meta.excerpt.length > 155) throw new Error(`Excerpt is ${meta.excerpt.length} characters (max 155)`)

  const lines = src.slice(fm[0].length).split('\n')
  const body = []
  const used = new Set()
  let para = []
  const flush = () => {
    if (para.length) body.push(block(para.join(' ')))
    para = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fence = line.match(/^```\s*([\w+-]*)\s*$/)
    if (fence) {
      flush()
      const code = []
      i++
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++])
      if (i >= lines.length) throw new Error('A ``` code block is never closed')
      body.push({_type: 'code', _key: key(), language: fence[1] || 'text', code: code.join('\n')})
      continue
    }
    if (!line.trim()) {
      flush()
      continue
    }
    const img = line.trim().match(/^\[IMAGE (\d+)\]$/)
    if (img) {
      flush()
      const n = Number(img[1])
      if (!images[n - 1]) throw new Error(`[IMAGE ${n}] but the live post only has ${images.length} inline image(s)`)
      if (used.has(n)) throw new Error(`[IMAGE ${n}] is used twice`)
      used.add(n)
      body.push({...images[n - 1], _key: key()})
      continue
    }
    let m
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flush()
      body.push(block(m[2], {style: `h${m[1].length}`}))
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flush()
      const quote = [m[1]]
      while (i + 1 < lines.length && /^>/.test(lines[i + 1])) quote.push(lines[++i].replace(/^>\s?/, ''))
      body.push(block(quote.join(' '), {style: 'blockquote'}))
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flush()
      body.push(block(m[1], {listItem: 'bullet', level: 1}))
    } else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {
      flush()
      body.push(block(m[1], {listItem: 'number', level: 1}))
    } else if (/^#\s/.test(line)) {
      throw new Error(`Line ${i + 1}: use ## for headings (the title is already the H1)`)
    } else {
      para.push(line.trim())
    }
  }
  flush()
  return {title: meta.title.trim(), excerpt: meta.excerpt?.trim(), body}
}
