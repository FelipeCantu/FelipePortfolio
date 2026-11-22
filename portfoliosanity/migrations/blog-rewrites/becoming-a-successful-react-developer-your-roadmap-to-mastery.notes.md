# Notes: becoming-a-successful-react-developer-your-roadmap-to-mastery

Researched November 22, 2026. Word count: about 2,040 words of prose (about 2,460 including code blocks).

## Top 3 things to check before publishing

1. **Version claims are dated.** The article says "as of React 19.3" (released September 9, 2026, per https://react.dev/blog/2026/09/09/react-19-3) and "Next.js 16" for the stable `reactCompiler` option (https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler, version history: stabilized in v16.0.0). If a newer React or Next.js major lands before you publish, update those two lines.
2. **React 19 code samples.** I verified `useActionState` (returns `[state, dispatchAction, isPending]`; action receives `(previousState, payload)`) and `useOptimistic` (setter must run inside an Action or `startTransition`) against the react.dev Markdown reference pages (https://react.dev/reference/react/useActionState.md, https://react.dev/reference/react/useOptimistic.md). The normal HTML reference pages were blocked for me, so it's worth running the Next.js `SubscribeForm` example once in a real project. One detail to check: `actions.ts` has `'use server'` and also does `export type SubscribeState`. TypeScript strips type exports so this should be fine, but if your build complains, move the type into a separate file.
3. **Personal project details.** I only used approved facts: SkateSpot (Next.js, TypeScript, Prisma, Leaflet, NextAuth.js) and the client portal (proposals, invoices, e-signature, file approvals). Two lines describe how they're *built*, and you should confirm they're true: (a) Leaflet map setup in SkateSpot runs in an effect and spot filtering doesn't; (b) the portal's invoice and proposal list pages are Server Components and the e-signature pad and file approval buttons are Client Components. Also confirm you're happy with "TypeScript is my default for new client work" and "I use Tailwind CSS on almost every project."

## Other claims and their sources

- React Compiler v1.0 stable, October 7, 2025. New code should rely on the compiler and use `useMemo`/`useCallback` only where precise control is needed; existing memoization should be left alone or removed carefully. It needs `babel-plugin-react-compiler`. The lint rules ship in `eslint-plugin-react-hooks` `recommended`, and the linter works without the compiler. Source: https://react.dev/blog/2025/10/07/react-compiler-1
- Compiler not on by default in Next.js or Vite (Expo enables it by default from SDK 54). Sources: same post, and the Next.js reactCompiler doc above.
- Link to `https://react.dev/learn/react-compiler/installation`: I didn't open this URL. The Next.js docs link to `/learn/react-compiler/introduction`, so the installation page should exist, but click it before you publish.
- Create React App deprecated for new apps, February 14, 2025. Source: https://react.dev/blog/2025/02/14/sunsetting-create-react-app (listed on https://react.dev/blog)
- RSC security fixes in December 2025 (Dec 3 critical RCE, Dec 11 DoS / source exposure). Source: https://react.dev/blog listing.
- TanStack Query is at v5 and uses the object form `useQuery({ queryKey, queryFn })` with `isPending`. Source: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
- `ref` as a prop for function components (React 19). `use` can be called conditionally (react.dev; the 19.3 post also mentions it). Verified from general React 19 docs knowledge plus the 19.3 post; the `TextField` sample uses `ComponentProps<'input'>`, which includes `ref` in `@types/react` 19.
- "Async Server Components aren't well supported by unit-test tools yet": this matches the Next.js testing docs as I know them, but I didn't check them this session. **Unverified for November 2026.**
- styled-components in the App Router needs extra registry setup and only works in Client Components: based on the Next.js CSS-in-JS docs. **Not re-checked this session.**
- Library recommendations (Zustand, Redux Toolkit, React Hook Form + Zod, shadcn/ui, Radix, Vitest, Playwright) are opinions. I didn't state any version numbers for them.

## Dropped from the original, and why

- **Class lifecycle methods (componentDidMount/componentDidUpdate), PureComponent:** outdated. These are now mentioned only as something you'll see in legacy code.
- **Redux or MobX as the default:** replaced with local state / context / Zustand / Redux Toolkit, with when to use each. MobX dropped because it's rarely the right first pick now.
- **Bootstrap and Material-UI as styling defaults:** replaced with Tailwind, CSS Modules and shadcn/ui or Radix. styled-components is kept only as a caution for App Router projects.
- **Manual memoization as the main performance advice:** replaced by the React Compiler plus profiling with DevTools.
- **React Router as its own section:** routing is covered by choosing a framework (Next.js) or Vite. I left React Router out to stay within length. Add a line if you want to mention it for Vite apps.
- **React Native and GraphQL ecosystem section, open source, "applying for jobs," "lifelong learning":** shortened to a few lines in the portfolio section and the wrap-up, or dropped. Generic career advice was padding next to the technical roadmap.
- **ESLint/Prettier:** ESLint is kept through `eslint-plugin-react-hooks`. Prettier dropped as too minor to need its own point.
- **[IMAGE 1]:** dropped. It was a generic illustration at the end and didn't support any section.
