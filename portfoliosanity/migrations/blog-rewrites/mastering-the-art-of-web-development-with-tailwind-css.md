---
title: "Tailwind CSS v4 for Developers Who Already Know CSS"
excerpt: "A practical guide to Tailwind CSS v4: CSS-first setup with @theme, dark mode, container queries, readable class lists, and when to skip it."
---

If you already write good CSS, Tailwind can look like a step backwards. Long class strings in your markup, a new vocabulary to memorize, and a lot of blog posts that still tell you to configure PurgeCSS and turn on JIT mode.

Most of those posts are out of date. Tailwind v4 changed how you set it up and where your configuration lives, and a lot of the old advice now gets in the way. This guide is for developers who know CSS and want to see how current Tailwind actually works, what it's good at, and where it isn't worth it. I use Tailwind on most of my Next.js and React projects, so this is the version of the guide I'd want if I were starting today.

## What Tailwind changes about how you write CSS

Tailwind gives you small, single-purpose classes (`flex`, `px-4`, `text-sm`, `hover:bg-blue-600`) and you compose them in your markup instead of writing a new selector for every component. You still need to understand the box model, flexbox, grid and the cascade. Tailwind doesn't replace CSS knowledge; it replaces the step where you invent a class name and switch files.

Here is a button:

```html
<button class="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
  Save changes
</button>
```

Everything about that button is visible in one place, including its hover and focus states. Nothing else on the page can accidentally restyle it, and deleting it deletes its styles. That last point is the one that sold me: on a long-running project, the CSS doesn't grow forever because nobody is sure which rules are still used.

The cost is that markup gets noisy. I'll come back to how to manage that, because it's the part most tutorials skip.

## Setting up Tailwind v4 in a new project

[IMAGE 1]

There's no `tailwind.config.js` and no `npx tailwindcss init` anymore. You install a plugin for your build tool and import Tailwind from your CSS file.

For a Vite project (React, Vue, Svelte, plain HTML):

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

For Next.js, or anything else that runs PostCSS, use the PostCSS plugin instead:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

```css
/* app/globals.css */
@import "tailwindcss";
```

You don't need `autoprefixer` or `postcss-import` either. Tailwind handles imports and vendor prefixes itself.

### You don't list your content files anymore

In v3 you had to give Tailwind a `content` array of globs so it knew where to look for class names. In v4, it scans your project automatically. It skips anything in `.gitignore`, `node_modules`, binary files, CSS files and lock files.

If you need it to scan something it ignores, such as a UI package in `node_modules` that ships Tailwind classes, add it with `@source`:

```css
@import "tailwindcss";
@source "../node_modules/@acme/ui";
```

There's also nothing to configure for "JIT mode" or purging. Tailwind only generates the classes it finds in your files, on demand, during development and in production builds. That's simply how it works now, so you can drop any PurgeCSS setup you copied from an old tutorial.

The one rule that still matters: Tailwind reads your files as plain text, so class names have to appear whole. `` `bg-${color}-600` `` will never work, because `bg-red-600` never appears in your code. Map values to complete class names instead:

```ts
const tone = {
  danger: "bg-red-600 hover:bg-red-500",
  success: "bg-green-600 hover:bg-green-500",
} as const;
```

## Your design tokens live in CSS now

Customization moved from a JavaScript object to the `@theme` directive in your CSS. Each variable you define there creates the matching utilities.

```css
@import "tailwindcss";

@theme {
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-brand-500: oklch(0.62 0.19 255);
  --color-brand-600: oklch(0.55 0.2 255);
  --breakpoint-3xl: 120rem;
}
```

That gives you `font-display`, `bg-brand-500`, `text-brand-600`, `border-brand-500` and a `3xl:` breakpoint, with no extra wiring. The variable prefix decides what kind of utility you get: `--color-*` for colors, `--font-*` for font families, `--breakpoint-*` for responsive variants, `--container-*` for container query sizes, and so on.

Two things I like about this. First, every theme value is also a real CSS custom property, so you can use `var(--color-brand-500)` in a regular stylesheet, an inline style or a canvas drawing without importing anything. Second, your whole design system lives in one file a designer can read.

If you want to drop Tailwind's default palette and use only your own colors, reset the namespace first with `--color-*: initial;` inside `@theme`, then define yours. Keep breakpoints in `rem` like the defaults; mixing units can make breakpoint classes sort in a surprising order.

For a small reusable rule that doesn't fit a theme variable, `@utility` lets you add your own class that works with every variant:

```css
@utility content-auto {
  content-visibility: auto;
}
```

Now `content-auto` and `lg:content-auto` both work.

## Dark mode, container queries and one-off values

### Dark mode

The `dark:` variant works out of the box and follows the user's system setting through `prefers-color-scheme`. Write `bg-white dark:bg-zinc-900` and you're done.

Most sites I build want a toggle instead, which means dark mode should follow a class on `<html>`. In v4 you override the variant in CSS:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Then add or remove `class="dark"` on the `html` element. To avoid a flash of the wrong theme, set that class in a small inline script in the `<head>` before the page paints, reading the user's saved choice and falling back to `prefers-color-scheme`. The [dark mode docs](https://tailwindcss.com/docs/dark-mode) have a short version of that script you can copy.

### Container queries

This is the feature I reach for most that v3 didn't have built in. Viewport breakpoints are the wrong tool for a card that might sit in a wide main column on one page and a narrow sidebar on another. Mark the parent as a container and use `@` variants on the children:

```html
<div class="@container">
  <article class="flex flex-col gap-4 @md:flex-row">
    <img class="w-full rounded-lg @md:w-48" src="/cover.jpg" alt="" />
    <div>...</div>
  </article>
</div>
```

`@md:` here means "when this container is at least 28rem wide," not the screen. You can also name containers (`@container/sidebar` with `@md/sidebar:`) and use max variants like `@max-md:`.

### Arbitrary values

When you need a value that isn't on the scale, use square brackets: `top-[117px]`, `grid-cols-[200px_1fr]`, `bg-[#1da1f2]`, `w-[50cqw]`. Underscores become spaces. You can also point at a CSS variable with `bg-(--my-color)`.

Arbitrary values are an escape hatch, not a design system. If you write the same bracketed value three times, it belongs in `@theme`.

## Keeping class lists readable

Long class strings are the honest downside of Tailwind. These are the habits that keep them manageable on real projects.

**Extract components, not classes.** When a pattern repeats, the fix is a React component, a partial or a template include, not a new CSS class. One `Button` component with its classes in one place beats `@apply`-ing utilities into `.btn`, which brings back the naming and file-hopping you were trying to avoid. I use `@apply` rarely, mostly for styling HTML I don't control.

**Use a `cn` helper for conditional classes.** Combine `clsx` (for conditions) with `tailwind-merge` (so a `className` prop can override a default without both classes fighting):

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// components/Button.tsx
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn("rounded-md px-4 py-2 font-semibold disabled:opacity-50", variants[variant], className)}
      {...props}
    />
  );
}
```

Now `<Button className="px-6">` gives you `px-6`, not both `px-4` and `px-6`.

**Let Prettier sort the classes.** The official `prettier-plugin-tailwindcss` puts classes in a consistent order, so diffs stay small and you always know where to look for the hover state:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./app/globals.css",
  "tailwindFunctions": ["clsx", "cn"]
}
```

`tailwindStylesheet` points the plugin at your v4 CSS entry so it knows about your custom theme values. `tailwindFunctions` tells it to sort strings inside those helpers too.

Also install the official Tailwind CSS IntelliSense extension for your editor. Autocomplete and hover previews of the generated CSS make the vocabulary much less of a barrier.

## When Tailwind is the wrong choice

Tailwind is my default, but not for everything.

- **Content you don't write as markup.** Blog posts from a CMS or Markdown come out as plain `<h2>` and `<p>` tags with no classes. Use the official `@tailwindcss/typography` plugin (`prose`) or a small regular stylesheet for that content.
- **A team that already has a working CSS system.** If your team is productive with CSS Modules or a well-kept design system, rewriting everything into utilities costs a lot and buys little. Consistency matters more than which tool won.
- **Very small or throwaway pages.** A one-page landing page with twenty rules doesn't need a build step.
- **Older browsers.** v4 relies on modern CSS features and targets Safari 16.4+, Chrome 111+ and Firefox 128+. If you have to support older browsers, stay on v3.4 or use plain CSS.
- **Styles driven by runtime data.** If colors or sizes come from user settings or an API, set them as CSS variables in a `style` attribute and reference them from classes (`bg-(--user-accent)`). Trying to generate classes from runtime values won't work, for the same reason `` `bg-${color}-600` `` doesn't.

The fair alternative to weigh is CSS Modules or plain modern CSS with nesting, cascade layers and custom properties. Plain CSS is far better than it was a few years ago. Tailwind's advantage is speed and consistency on teams and long projects, not something CSS can't do.

## Moving a v3 project to v4

Projects you maintain may still be on a v3-style `tailwind.config.js`. Mine are. That still works on v3.4, and there's no emergency, but the upgrade is mostly automated.

1. Make sure you're on Node.js 20 or newer, and create a new branch.
2. Run `npx @tailwindcss/upgrade` from the project root.
3. Review the diff. The tool updates your dependencies, moves your config into CSS and renames changed utilities in your templates.
4. Check the pages visually, especially borders, rings, shadows and rounded corners.

The renames are where surprises hide. The scale shifted by one step: v3's `shadow-sm` is now `shadow-xs` and `shadow` is now `shadow-sm`, and the same happened with `rounded`, `blur` and `drop-shadow`. `outline-none` became `outline-hidden`. Borders now default to `currentColor` instead of gray, and a bare `ring` is 1px instead of 3px. The tool handles most of this in your templates, but classes built in JavaScript strings or stored in a CMS won't be caught.

If you can't move your JavaScript config yet, load it explicitly from CSS with `@config "../tailwind.config.js";` and migrate it later. The [upgrade guide](https://tailwindcss.com/docs/upgrade-guide) lists every change.

For a new project, start on v4. For an existing one, set aside an afternoon, run the tool on a branch, and compare pages side by side before you merge. Then set up the Prettier plugin and a `cn` helper, and put your brand colors and fonts in `@theme` so the rest of your team uses the same tokens.

If you'd rather have someone build or upgrade your site for you, [get in touch](https://felipecantujr.com/get-started).
