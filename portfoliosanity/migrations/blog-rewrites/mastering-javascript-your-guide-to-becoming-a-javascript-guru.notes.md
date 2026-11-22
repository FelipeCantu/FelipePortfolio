# Notes: mastering-javascript-your-guide-to-becoming-a-javascript-guru

Word count: about 2,230 including code blocks (prose alone is well under 2,200). Excerpt: 147 characters. Slug kept; title changed to drop "guru".

## (a) Claims to double-check

1. **Node.js runs .ts files directly (type stripping).** Node docs: enabled by default in v23.6.0 / v22.18.0, no warning from v24.3.0, marked stable in v25.2.0 / v24.12.0. `enum`, runtime namespaces, parameter properties and `.tsx` are unsupported; Node ignores tsconfig and does not type check. The article says "current Node.js versions" without a version number. Source: https://nodejs.org/api/typescript.html
2. **Object.groupBy / Map.groupBy.** Baseline "widely available" since 2026-09-05; Chrome 117, Firefox 119, Safari 17.4. The article says Safari added it in 17.4 and suggests a polyfill for older targets. Source: https://web-platform-dx.github.io/web-features-explorer/features/array-group
3. **toSorted / toReversed / toSpliced / with, structuredClone, AbortSignal.timeout, AbortSignal.any.** Described as working in all current major browsers and Node. From my knowledge these are ES2023 / Baseline 2022–2024 features. I found the MDN/web-features pages for them in search but did not open each one to read the exact dates. Worth a quick look at the Baseline badges on MDN: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static and https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static
4. **Error names.** A manual `controller.abort()` rejects fetch with a DOMException named `AbortError`; `AbortSignal.timeout()` rejects with `TimeoutError`, including when combined through `AbortSignal.any`. Matches the MDN docs as I know them; not re-read today.
5. **Cart / `this` example.** The TypeError text ("Cannot read properties of undefined (reading 'push')") is Chrome's wording. Firefox and Safari word it differently. The behavior (`this` is the button) is standard.
6. **Event loop output order (1, 5, 3, 4, 2).** Standard behavior; easy to confirm by pasting it into a console.
7. **Chrome DevTools features** (conditional breakpoints, logpoints, pause on caught/uncaught exceptions, DOM "Break on" subtree modifications, Fetch/XHR breakpoints, long tasks in the Performance panel). From my knowledge of current DevTools; menu labels can shift between Chrome versions.
8. **"TypeScript is the default in most Next.js and React setups."** True for `create-next-app` (TypeScript is the default) and the common Vite React templates as far as I know. Unverified as a general statistic; it's phrased loosely on purpose.
9. **"I use it on every client project."** Based on the stack in the agent brief (TypeScript is listed). Change it if any client project was plain JS.

I left out features I couldn't confirm as widely supported: Temporal, iterator helpers, Set methods, `Promise.try`, and `using` / explicit resource management.

## (b) Dropped or reworked from the original

- **"Basics" section (variables, types, conditionals, loops, functions):** dropped as its own section. The readers already know it. Scope, `let`/`const` vs `var`, and functions come back in the closures section.
- **DOM manipulation:** no longer its own section. It shows up in the examples (`querySelector`, `addEventListener`, module scripts, DOM breakpoints).
- **"AJAX":** the term is dropped. It's covered by the `fetch` / `response.ok` / `AbortController` material, and XMLHttpRequest isn't taught.
- **Callbacks:** no separate subsection. The event loop section explains callback timing, and the async section goes straight to promises and async/await.
- **Frameworks (React, Angular, Vue):** cut down to advice in the "keep up" section (pick one, learn the JS underneath). There's no comparison, since one would go stale and it isn't what this audience needs.
- **Performance:** no longer its own section. It's covered through long tasks/Web Workers in the event loop section, the Performance panel in debugging, and dynamic `import()` for loading code on demand.
- **"Consuming REST APIs and libraries":** folded into the fetch helper and the TypeScript example (typing API responses, Zod for runtime validation).
- **"Guru" wording:** removed from the title and text.
- **Images:** [IMAGE 1] stays after the intro. [IMAGE 2] is now before the final "What to practice next" section.
