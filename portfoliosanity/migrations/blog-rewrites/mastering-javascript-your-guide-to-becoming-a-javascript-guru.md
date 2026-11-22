---
title: "Beyond the Basics: How to Get Genuinely Good at JavaScript"
excerpt: "A practical path from intermediate to strong JavaScript: the event loop, closures, this, async done right, modern methods, DevTools and TypeScript."
---

You can already build things with JavaScript. You know variables, loops, functions, and how to grab an element and change its text. But every so often something behaves in a way you can't explain: a log prints in the wrong order, `this` is suddenly `undefined`, a list re-renders with stale data. You fix it by moving code around until it works.

That gap, between code that works and code you understand, is what separates an intermediate developer from a strong one. The good news is that it comes down to a fairly short list of ideas. This is the path I'd follow, with small examples you can paste into a browser console and run.

[IMAGE 1]

## Learn how the event loop orders your code

Most "JavaScript is weird" moments are really event loop moments. JavaScript runs one piece of code at a time on a single call stack. When that stack is empty, the runtime first drains the **microtask queue** (promise callbacks, `queueMicrotask`), and only then takes the next **task** (timers, events, network callbacks).

Predict the output before you run this:

```js
console.log('1: sync');

setTimeout(() => console.log('2: timeout'), 0);

Promise.resolve().then(() => console.log('3: promise'));

queueMicrotask(() => console.log('4: microtask'));

console.log('5: sync');
```

It prints 1, 5, 3, 4, 2. The synchronous lines run first. Then every microtask runs, in the order they were queued. The `setTimeout` callback waits for the next task, even with a delay of `0`.

Two practical consequences. First, `setTimeout(fn, 0)` doesn't mean "now", it means "after everything currently queued, including all pending promise work." Second, a long synchronous loop blocks everything: clicks, rendering, timers. If the page freezes while you process a big array, the fix isn't a faster loop, it's breaking the work up or moving it to a Web Worker.

Everything after `await` in an async function is a microtask too. Once that clicks, async code stops feeling random.

## Understand closures and scope, not just the definitions

A closure is a function that keeps access to the variables from the place it was created. You use them constantly, usually without noticing. The classic bug shows why it matters:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 3, 3, 3

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// 0, 1, 2
```

`var` is function-scoped, so all three callbacks close over the same `i`, which is `3` by the time they run. `let` is block-scoped, and each loop iteration gets a fresh binding. This is the main reason to use `const` by default, `let` when you need to reassign, and `var` never.

Closures are also how you keep state private without a class:

```js
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    current: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.current()); // 2
```

Nothing outside can touch `count` directly. If you've written React, a stale closure is the same idea biting you: an effect or event handler captured an old value of state because it was created during an earlier render.

## Know what `this` points to (and when to avoid it)

`this` is not about where a function is written. For regular functions, it's decided by how the function is **called**. Arrow functions don't have their own `this`; they use the one from the surrounding code.

Here's the mistake I see most often:

```js
class Cart {
  items = [];

  add(item) {
    this.items.push(item);
  }
}

const cart = new Cart();
const button = document.querySelector('button');

button.addEventListener('click', cart.add);
// When clicked: `this` is the button, not the cart.
// TypeError: Cannot read properties of undefined (reading 'push')
```

Passing `cart.add` hands over the function alone, detached from `cart`. The event listener calls it with `this` set to the button. There are three fixes, and I'd reach for them in this order:

- Wrap it: `button.addEventListener('click', () => cart.add('shirt'))`.
- Define the method as an arrow class field: `add = (item) => { this.items.push(item); }`.
- Bind it once: `cart.add = cart.add.bind(cart)`.

The rules are short: a method called as `obj.method()` gets `obj`; a plain function call gets `undefined` in strict mode (which includes all ES modules and classes); `new` creates a fresh object; `call`, `apply` and `bind` set it explicitly. In modern code with modules and function components you'll write `this` less and less, and that's fine. You still need to read it.

## Write async code that fails well

Knowing `async`/`await` syntax is the easy part. Strong developers get three other things right: running work in parallel, handling failure, and cancelling requests nobody needs anymore.

### Run independent work in parallel

```js
// Slow: the second request waits for the first
const user = await getJson('/api/user');
const orders = await getJson('/api/orders');

// Faster: both start at once
const [user2, orders2] = await Promise.all([
  getJson('/api/user'),
  getJson('/api/orders'),
]);
```

`Promise.all` rejects as soon as any promise rejects. When you want every result regardless, like loading several dashboard widgets where one failing shouldn't blank the page, use `Promise.allSettled`:

```js
const results = await Promise.allSettled([
  getJson('/api/stats'),
  getJson('/api/notifications'),
]);

for (const result of results) {
  if (result.status === 'fulfilled') render(result.value);
  else console.error(result.reason);
}
```

### Treat fetch errors as two different problems

`fetch` only rejects on network failure or cancellation. A 404 or 500 resolves normally, so you have to check `response.ok` yourself. This helper is the one I'd put in every project:

```js
async function getJson(url, { signal } = {}) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}
```

Also watch for `await` inside `forEach`. `array.forEach(async (id) => { await save(id); })` doesn't wait for anything, and errors thrown inside escape your `try`/`catch`. Use `for...of` for sequential work or `Promise.all(array.map(...))` for parallel work.

> An `async` function without a `try`/`catch` somewhere up the chain turns errors into unhandled promise rejections. Decide where each error gets handled (show a message, retry, or log it) instead of letting it vanish into the console.

### Cancel what you no longer need

If a user types into a search box, each keystroke can start a request, and an old slow response can land after a newer one. `AbortController` fixes that, and `AbortSignal.timeout()` gives you a time limit without writing your own timer:

```js
let controller;

async function search(query) {
  controller?.abort(); // cancel the previous request
  controller = new AbortController();

  const signal = AbortSignal.any([
    controller.signal,
    AbortSignal.timeout(5000),
  ]);

  try {
    const results = await getJson(`/api/search?q=${encodeURIComponent(query)}`, { signal });
    renderResults(results);
  } catch (error) {
    if (error.name === 'AbortError') return; // replaced by a newer search
    if (error.name === 'TimeoutError') showMessage('Search is taking too long.');
    else showMessage('Search failed. Try again.');
  }
}
```

In React, the same pattern goes in an effect: create a controller, pass its signal to `fetch`, and call `controller.abort()` in the cleanup function. That one habit removes a whole class of "wrong data flashed on screen" bugs.

## Use modules and modern methods to keep data predictable

ES modules are the standard way to split code. Each file has its own scope, runs in strict mode, and shares only what it exports. In the browser, `<script type="module" src="/main.js"></script>` is enough to use `import` and `export` with no build step. Prefer named exports; they make renames and auto-imports more reliable. And remember `import()` returns a promise, so you can load heavy code only when it's needed:

```js
button.addEventListener('click', async () => {
  const { openEditor } = await import('./editor.js');
  openEditor();
});
```

The other habit worth building is not mutating data you don't own. `const` only stops reassignment; the array itself can still change. `sort()`, `reverse()` and `splice()` all modify the original, which is how a sorted list in one component quietly reorders data everywhere else. The newer copying methods return a new array instead:

```js
const prices = [30, 10, 20];

const sorted = prices.toSorted((a, b) => a - b); // [10, 20, 30]
const updated = prices.with(1, 15);               // [30, 15, 20]
console.log(prices);                              // [30, 10, 20], untouched

const user = { name: 'Ana', address: { city: 'Dallas' } };
const copy = { ...user };            // shallow: copy.address is the same object
const deep = structuredClone(user);  // deep copy

const orders = [
  { id: 1, status: 'paid' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'paid' },
];
const byStatus = Object.groupBy(orders, (order) => order.status);
// { paid: [{...}, {...}], pending: [{...}] }
```

`toSorted`, `toReversed`, `toSpliced` and `with` are in all current major browsers and Node.js. `structuredClone` is too, though it can't copy functions or DOM nodes. `Object.groupBy` is newer (Safari added it in 17.4), so if you support older browsers, check your target list or include a polyfill.

## Debug with breakpoints, not just console.log

`console.log` is fine for a quick look. But when you don't know where the problem is, logging turns into guessing. The debugger shows you every variable in scope at the moment things go wrong, and lets you step forward one line at a time.

In Chrome DevTools, open the **Sources** panel, find your file, and click a line number to set a breakpoint. When execution pauses there, you can inspect the scope, hover over values, and step over or into function calls. A few features I use all the time:

- **Conditional breakpoints**: right-click a line number and add a condition like `item.id === 42`, so the debugger only pauses on the iteration you care about.
- **Logpoints**: same menu, but they log a message without pausing, and without you editing and reloading the code.
- **Pause on exceptions**: in the Breakpoints pane, so the debugger stops at the line that throws rather than where you eventually see the error.
- **DOM breakpoints**: in the Elements panel, right-click a node and choose "Break on" subtree modifications to find out which script keeps changing it.
- **Fetch/XHR breakpoints**: pause whenever a request to a matching URL starts.

You can also drop a `debugger;` statement in your code; it pauses there whenever DevTools is open. For performance problems, record a session in the **Performance** panel and look for long tasks (the red-flagged blocks on the main thread). That's the event loop section again: one long task means nothing else could run.

## Make TypeScript your next step

Once the ideas above feel natural, TypeScript is the highest-value thing you can learn next. It catches the mistakes we've just covered before they reach the browser: calling a method that doesn't exist, forgetting that a value might be `undefined`, passing the wrong shape of object to a function. I use it on every client project, and it's the default in most Next.js and React setups.

Start by typing the edges of your code, the data coming from APIs, and let inference do the rest:

```ts
type Order = {
  id: number;
  status: 'paid' | 'pending' | 'refunded';
  total: number;
};

async function getOrders(signal?: AbortSignal): Promise<Order[]> {
  const response = await fetch('/api/orders', { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

const orders = await getOrders();
orders[0].stauts; // Error: Property 'stauts' does not exist. Did you mean 'status'?
```

One honest caveat: that return type is a promise you're making, not something TypeScript checks at runtime. If the API might send something unexpected, validate it with a schema library such as Zod.

Getting started is easier than it used to be. Current Node.js versions can run a `.ts` file directly by stripping the types, as long as you avoid syntax that generates code, like `enum`. Node doesn't type check, so run `tsc --noEmit` (or let your editor do it) to catch errors. The [Node.js TypeScript docs](https://nodejs.org/api/typescript.html) list what's supported.

## Keep up without chasing every framework

React, Angular and Vue all solve the same problems with different trade-offs. Pick one, get good at it, and you'll find the others much easier to pick up later, because the hard parts are the JavaScript underneath. I build mostly with React and Next.js, and the time I spent on closures and async code has paid off more than any framework-specific trick.

To stay current without burning out:

- Follow the language, not the hype. A feature is part of JavaScript when it reaches stage 4 at [TC39](https://github.com/tc39/proposals); before that, it can still change.
- Check the **Baseline** status at the top of an [MDN](https://developer.mozilla.org/) page before using something new. "Widely available" means you can use it without worry in current browsers.
- Read the release notes for the tools you actually use: your framework, Node.js, TypeScript. That covers most of what affects your work.
- Rebuild something small every so often with no framework at all. It's the quickest way to find out what you really understand.

[IMAGE 2]

## What to practice next

Don't try to learn all of this at once. Take one section a week and use it in real code: rewrite a fetch call with `response.ok` checks and an `AbortController`, replace a mutating `sort()` with `toSorted()`, or debug your next bug with a breakpoint before reaching for `console.log`. Then convert one small project to TypeScript. A month of that and you'll understand why your code works, not just that it does.

And if you'd rather have an experienced developer build your site or app for you, [get in touch](https://felipecantujr.com/get-started).
