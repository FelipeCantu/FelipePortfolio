# Notes: mastering-the-art-of-web-development-with-tailwind-css

Slug kept. New title: "Tailwind CSS v4 for Developers Who Already Know CSS". Word count: about 1,940 including code, about 1,670 of prose. [IMAGE 1] stays at the start of the setup section, where the old "Installation" section began.

## (a) Claims to double-check

1. **The current version is v4.3.** The docs site shows v4.3 and the v4.3 post is dated May 8, 2026. The article says "v4" and never names a minor version, so it won't go stale after a minor release. If Tailwind v5 comes out, the article needs another pass. Sources: https://tailwindcss.com/docs/installation/using-vite and https://tailwindcss.com/blog/tailwindcss-v4-3
2. **Setup commands.** The Vite packages and `vite.config.ts`, the PostCSS packages and `postcss.config.mjs`, and `@import "tailwindcss"` all come from the official install guides and the upgrade guide. The claim that `autoprefixer` and `postcss-import` are no longer needed also comes from the upgrade guide. Source: https://tailwindcss.com/docs/upgrade-guide
3. **Automatic content detection.** These are skipped: `.gitignore`, `node_modules`, binary files, CSS files and lock files. `@source` syntax and the rule that class names must appear whole are in the docs. Source: https://tailwindcss.com/docs/detecting-classes-in-source-files
4. **Class-based dark mode.** `@custom-variant dark (&:where(.dark, .dark *));` is in the docs. Source: https://tailwindcss.com/docs/dark-mode
5. **Container queries.** `@md` equals 28rem, and the named and max variants are in the docs. Source: https://tailwindcss.com/docs/responsive-design
6. **Upgrade facts.** The upgrade tool is `npx @tailwindcss/upgrade` and needs Node 20 or newer. Supported browsers are Safari 16.4+, Chrome 111+ and Firefox 128+. The docs cover the shadow/rounded/blur renames, `outline-none` becoming `outline-hidden`, borders defaulting to currentColor, the 1px ring and `@config`. Source: https://tailwindcss.com/docs/upgrade-guide
7. **Prettier plugin options.** `tailwindStylesheet` and `tailwindFunctions` are documented in the plugin README. The README's example only shows `clsx`. Adding `"cn"` should work the same way, but I didn't find it documented. Source: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
8. **Not checked against a source this session:**
   - The `bg-(--my-color)` shorthand for CSS variables in arbitrary values. I believe this is v4 syntax; v3 used `bg-[--my-color]`.
   - That `tailwind-merge` (current major) supports v4 class names.
   - That `@utility content-auto` works with variants.
   - That `--color-*: initial` resets the default palette. The docs show the same pattern for breakpoints.
   - That `@tailwindcss/typography` and the IntelliSense extension are still the official names.

   Running the code samples in a fresh Vite or Next.js project would settle all of these.
9. **Personal lines.**
   - "Mine are" (still on a v3-style config) relies on the brief saying Felipe's own site is on a v3-style config.
   - "The one that sold me" and "the feature I reach for most" are opinions written in Felipe's voice, with no invented history behind them. Cut them if he doesn't agree.

## (b) Dropped from the original, and why

- **`npm install tailwindcss` plus `npx tailwindcss init`.** This is v3 setup, and `init` no longer exists in v4. It's replaced by the build-tool plugin and `@import "tailwindcss"`.
- **Customizing through `tailwind.config.js`.** It's replaced by `@theme`. The JS config appears only as a migration fallback (`@config`).
- **PurgeCSS and the "JIT mode" sections.** These are obsolete. The article now explains that generating only the classes you use is the default.
- **The "small output" selling point.** It's folded into the content-detection section. The article gives no file-size numbers, since I had no source for any.
- **The generic "plugins" section.** The only plugin mentioned is `@tailwindcss/typography`, in the "wrong choice" section, because it solves a real problem there. Custom utilities are covered with `@utility` instead.
- **The original button's `rounded` class.** v4 renamed it (it's now `rounded-sm`), so the example uses `rounded-md` with focus-visible styles.
- **The generic "readability" claim.** It's replaced with honest advice on managing long class lists: components, `cn`, and the Prettier plugin.
