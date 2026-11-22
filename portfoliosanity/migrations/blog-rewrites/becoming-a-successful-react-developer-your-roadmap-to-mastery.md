---
title: "Becoming a Successful React Developer: A 2026 Roadmap"
excerpt: "A current React roadmap: hooks, where state lives, fewer effects, React 19 Actions, Server Components, the React Compiler, testing and portfolio projects."
---

Most React roadmaps you find are frozen around 2020. They tell you to master `componentDidMount`, pick between Redux and MobX, and reach for `useMemo` whenever something feels slow. If you follow that path today, you'll spend months learning things the rest of the industry has moved past.

This is the roadmap I'd hand someone today, whether you're writing your first component or trying to move from "I can follow a tutorial" to "I can ship a client project." It's built around how React actually works now, as of React 19.3, and how I use it with Next.js on projects like SkateSpot and my own client portal.

## Learn modern React, not the 2019 version

Start with JavaScript itself. You need to be comfortable with arrays and objects, `map`/`filter`/`reduce`, destructuring, spread, modules, closures, and `async`/`await` with `fetch`. React is mostly JavaScript with a rendering model on top; when people struggle with React, the real gap is usually here.

Then learn React with **function components and hooks only**. Class components and lifecycle methods like `componentDidMount` still exist, and you'll meet them in older codebases. Learn to read them when that day comes, but don't write new ones and don't study them first.

For setup, skip Create React App. The React team deprecated it for new apps in early 2025. Use Vite if you want a plain client-side app to learn in, or a framework like Next.js if you're building something real with routing, server rendering and a backend. I use Next.js for nearly everything I ship.

Use TypeScript from the start. It feels slower for a week, then it starts catching the bugs you'd otherwise find in production: a prop you forgot to pass, an API field that might be `null`, a typo in an event handler. Most professional React codebases are written in it now, and it's my default for new client work.

## Think in components and decide where state lives

The core React skill isn't syntax. It's looking at a design and seeing the component tree, then deciding which component owns each piece of state.

The rule I follow: keep state as close as possible to where it's used, and lift it only to the nearest common parent of the components that need it. A search input's text lives in the search component. A selected filter that both the sidebar and the results list read lives in their shared parent, or better, in the URL as a search param so it survives a refresh and can be shared.

Equally important is knowing what **isn't** state. If you can calculate a value from props or other state, calculate it during render. Storing it separately means two sources of truth that will eventually disagree.

```tsx
type Todo = { id: string; title: string; done: boolean }

export function TodoSummary({ todos }: { todos: Todo[] }) {
  // Derived during render: no useState, no useEffect
  const remaining = todos.filter((todo) => !todo.done)

  return <p>{remaining.length} of {todos.length} left</p>
}
```

The beginner version of this component keeps `remaining` in `useState` and syncs it with a `useEffect` whenever `todos` changes. It works, but it renders twice and shows stale data for a frame. Learn to spot that pattern; you'll see it in a lot of code reviews.

Two more habits to build early: give list items stable `key`s from your data (not the array index when items can be reordered or removed), and use a `key` change to reset a component's state instead of writing an effect to clear it.

## Use fewer effects than you think

`useEffect` is for synchronizing with something **outside** React: a WebSocket, a third-party map widget, a browser API, an analytics call. It's not for transforming data, responding to a button click, or resetting state when a prop changes. The official guide [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) is the single most useful page in the React docs, and I'd read it twice.

A quick test: if the code runs because the user did something, it belongs in the event handler. If it runs because the component appeared on screen and needs to stay in sync with an external system, it's an effect. When I added Leaflet maps to SkateSpot, the map setup was a legitimate effect, because Leaflet manages its own DOM outside React. The logic for filtering which spots to show was not.

### Fetch data with a framework or a data library

Writing `useEffect` + `fetch` + `useState` in every component is how most people learn data fetching, and it's where a lot of React bugs live: race conditions when inputs change quickly, no caching, no retries, loading flags scattered everywhere.

In Next.js, fetch on the server in a Server Component and the problem mostly disappears (more on that below). In a client-side app, use [TanStack Query](https://tanstack.com/query/latest):

```tsx
import { useQuery } from '@tanstack/react-query'

type Spot = { id: string; name: string }

async function fetchSpots(): Promise<Spot[]> {
  const res = await fetch('/api/spots')
  if (!res.ok) throw new Error('Failed to load spots')
  return res.json()
}

export function SpotList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['spots'],
    queryFn: fetchSpots,
  })

  if (isPending) return <p>Loading spots…</p>
  if (error) return <p>Could not load spots.</p>

  return (
    <ul>
      {data.map((spot) => (
        <li key={spot.id}>{spot.name}</li>
      ))}
    </ul>
  )
}
```

Wrap your app in a `QueryClientProvider` once, and you get caching, deduplication, background refetching and retries for free. That's a lot of hand-written code you'll never have to debug.

## Learn React 19 the way frameworks use it

React 19 changed how you handle mutations and forms. These are the pieces worth learning properly.

**Actions.** Any async function you run inside a transition is an Action, and React tracks its pending state for you. You can pass a function directly to a form's `action` prop, and React handles the submission, the pending state and resetting the form.

**`useActionState`** gives you the result of the last Action plus an `isPending` flag. It's the cleanest way to show validation errors from a form. Here's a Next.js App Router example with a Server Function:

```ts
// app/subscribe/actions.ts
'use server'

export type SubscribeState = { error?: string; ok?: boolean }

export async function subscribe(
  prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get('email')
  if (typeof email !== 'string' || !email.includes('@')) {
    return { error: 'Enter a valid email address.' }
  }
  // Save the email to your database or mailing list here
  return { ok: true }
}
```

```tsx
// app/subscribe/subscribe-form.tsx
'use client'

import { useActionState } from 'react'
import { subscribe, type SubscribeState } from './actions'

const initialState: SubscribeState = {}

export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState)

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Subscribing…' : 'Subscribe'}
      </button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.ok && <p>Thanks, you're on the list.</p>}
    </form>
  )
}
```

**`useOptimistic`** shows the result of an Action before the server confirms it, like a "liked" heart that fills instantly, and rolls back automatically if the Action fails. Its setter must be called inside an Action or `startTransition`, or React warns and the optimistic value disappears immediately.

**The `use` API** reads a promise or a context during render. The pattern you'll see most is a Server Component starting a fetch and passing the promise to a Client Component, which calls `use(promise)` inside a `<Suspense>` boundary. Unlike hooks, `use` can be called conditionally.

**`ref` as a prop.** Function components now receive `ref` like any other prop, so you no longer need `forwardRef` for new components:

```tsx
import type { ComponentProps } from 'react'

type TextFieldProps = ComponentProps<'input'> & { label: string }

export function TextField({ label, ref, ...props }: TextFieldProps) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
    </label>
  )
}
```

### Server Components through a framework

React Server Components run only on the server. They can be `async`, read a database or call an API directly, and send no JavaScript to the browser for themselves. You mark interactive parts with `'use client'`.

```tsx
// app/spots/page.tsx (a Server Component by default)
type Spot = { id: string; name: string }

export default async function SpotsPage() {
  const res = await fetch('https://api.example.com/spots')
  if (!res.ok) throw new Error('Failed to load spots')
  const spots: Spot[] = await res.json()

  return (
    <ul>
      {spots.map((spot) => (
        <li key={spot.id}>{spot.name}</li>
      ))}
    </ul>
  )
}
```

You use Server Components through a framework, and the Next.js App Router is where most people meet them. The mental shift is deciding, for each component, whether it needs the browser (state, event handlers, browser APIs) or not. In my client portal, pages that list invoices and proposals are Server Components; the e-signature pad and file approval buttons are Client Components inside them.

> Server Components and Server Functions run code on your server, so treat every Server Function like a public API endpoint: validate input, check that the user is allowed to do it, and keep React and Next.js patched. React shipped urgent security fixes for Server Components in December 2025.

## Let the compiler handle memoization

The React Compiler reached v1.0 in October 2025. It's a build-time tool that memoizes your components and hooks automatically, which covers most of what people used to do by hand with `useMemo`, `useCallback` and `React.memo`. In Next.js 16 it's a stable top-level option, though not on by default:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

You also need `babel-plugin-react-compiler` installed as a dev dependency. For Vite and other setups, follow the [React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

What this means for you: in new code, write plain components and let the compiler do the memoizing. Use `useMemo` or `useCallback` only where you need precise control, such as a value used as an effect dependency. In existing code, don't rip out memoization in bulk; the React team's advice is to leave it or remove it carefully with tests.

The compiler only works on code that follows the Rules of React, so turn on `eslint-plugin-react-hooks` with its recommended preset. It now includes compiler-powered rules that flag things like calling `setState` inside an effect, and it works even if you haven't enabled the compiler yet.

When something is actually slow, measure before you fix. The Profiler in React DevTools shows which components render and how long they take. The fix is usually structural: move state down, split a big component, or virtualize a long list.

## Choose state, forms and styling by the problem

Pick the smallest tool that handles what you have.

- **Local state** (`useState`, `useReducer`): the default for anything one component or a small subtree uses.
- **Context**: values that many components read but that change rarely, like the current user, theme or locale.
- **Zustand**: shared client state that changes often, like a cart, a multi-step editor or a map's selected marker. Small API, no provider needed.
- **Redux Toolkit**: large apps with many developers, complex client-side state and a need for strict patterns and devtools. Skip legacy hand-written Redux entirely.

Server data (anything that comes from an API) isn't really client state. Keep it in Server Components or TanStack Query and you'll find your global store gets much smaller.

For **forms**, start with native form elements, the `action` prop and `useActionState`, as above. For long or highly interactive forms, React Hook Form with a Zod schema is still the combination I'd reach for, and the same Zod schema can validate on the server.

For **styling**, I use Tailwind CSS on almost every project because it keeps styles next to the markup and the output small. CSS Modules are a solid, zero-dependency alternative. If you want prebuilt accessible components, look at shadcn/ui or a headless library like Radix rather than heavy theme-based kits. Be careful with runtime CSS-in-JS libraries such as styled-components in App Router projects: they need extra setup and only work in Client Components.

## Test what users actually do

Use **Vitest** (or Jest, if the project already has it) with **React Testing Library** for component tests, and **Playwright** for end-to-end tests that drive a real browser.

React Testing Library pushes you to test behaviour instead of implementation: find elements by role and label the way a user or screen reader would. For a `Counter` component that renders an "Add" button and the text "Count: n":

```tsx
// Counter.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Counter } from './Counter'

test('increments when Add is clicked', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  await user.click(screen.getByRole('button', { name: 'Add' }))

  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

This needs `environment: 'jsdom'` in your Vitest config and `@testing-library/jest-dom` imported in a setup file for `toBeInTheDocument`.

Async Server Components aren't well supported by unit-test tools yet, so cover those flows with Playwright. My rule of thumb: a handful of Playwright tests for the paths that would cost money if they broke (sign-up, checkout, submitting a form), and component tests for logic-heavy UI.

## Build portfolio projects that prove you can ship

A to-do app proves you finished a tutorial. A convincing React project proves you can handle what real apps deal with:

- Real data and authentication, not hard-coded arrays.
- Loading, empty and error states for every screen.
- Mutations with validation and feedback, ideally with optimistic updates.
- Accessible markup: labels, keyboard navigation, focus management.
- A live deployment, a clean README, and a Git history with small, readable commits.
- A few tests on the flows that matter.

SkateSpot is a good example of the scope I mean: a Next.js and TypeScript app with Prisma, authentication through NextAuth.js, and an interactive Leaflet map. None of those pieces is exotic, but together they force you to solve routing, data modeling, auth and third-party integration in one codebase. That's what reviewers and clients want to see.

Pick one project in a domain you care about and keep improving it rather than starting five. In interviews, the strongest thing you can do is walk through a decision you made in it: why state lives where it does, why a component is server or client, what you'd change next. That's also where soft skills show up. Explaining trade-offs clearly is most of the job.

To put this into practice this month: read "You Might Not Need an Effect," build one feature with a Server Component and a `useActionState` form, turn on the React Compiler and the hooks lint rules, and write one Playwright test for your most important flow. Then keep reading the [React blog](https://react.dev/blog), because this roadmap will need updating too.

If you'd rather have a React or Next.js project built for you than learn it all first, [get in touch](https://felipecantujr.com/get-started).
