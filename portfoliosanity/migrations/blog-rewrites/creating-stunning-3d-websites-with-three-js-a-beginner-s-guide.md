---
title: "Three.js for Beginners: Build Your First 3D Website the Modern Way"
excerpt: "Set up Three.js with Vite or an import map, render a responsive 3D scene, load glTF models, and keep it fast and accessible. A practical beginner's guide."
---

Most 3D tutorials you find still start with a `<script>` tag pointing at an old copy of Three.js and a global `THREE` object. That code still runs, but it isn't how Three.js works now, and you'll fight it the moment you try to load a model or add camera controls.

This guide sets you up the current way. You'll build a small scene that resizes properly, looks sharp on high-density screens, respects users who turn off animation, and doesn't fall over on a mid-range phone. These are the parts I care about most when I build 3D work like Anakupto, because the spinning cube is easy and everything around it is where projects go wrong.

## When a 3D website is worth it (and when it isn't)

3D earns its place when depth or interaction *is* the content: a product someone wants to rotate, a portfolio piece that shows how you think, an interactive story, a configurator. In those cases a scene communicates something a photo can't.

It's a bad trade when it decorates a page whose job is to be read or to convert. A WebGL hero section adds hundreds of kilobytes to a megabyte or more of JavaScript and assets, keeps the GPU busy, and drains batteries. If a looping video or a CSS animation tells the same story, use that.

My rule: if removing the 3D wouldn't change what the visitor understands or can do, don't ship it.

If it does pass that test, Three.js is where I'd start. It's a JavaScript library that sits on top of WebGL (and, increasingly, WebGPU). Writing raw WebGL means managing buffers, shaders and matrices by hand. Three.js gives you a scene graph instead: you create a **scene**, put **meshes** in it (a geometry plus a material), add **lights**, point a **camera** at it, and hand all of that to a **renderer** that draws it to a `<canvas>`.

Everything else in this article (models, controls, post-processing, physics) is built from those five pieces.

## Install Three.js: npm with Vite, or an import map

Three.js is published as ES modules. The core lives in `three`, and the extras (loaders, camera controls, helpers) live under `three/addons/`. You don't install addons separately, but you do import each one.

### Option 1: npm and Vite (what I recommend)

For anything beyond a quick experiment, use a bundler. Vite is the setup the official docs walk through:

```bash
npm create vite@latest my-3d-site -- --template vanilla
cd my-3d-site
npm install three
npm run dev
```

Then import what you need:

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

If you use TypeScript, add `@types/three` as a dev dependency.

### Option 2: an import map, no build step

For a CodePen-style page with no tooling, an import map lets you write the same `import` statements against a CDN. Put this in `<head>`, before your module script:

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.187.0/examples/jsm/"
    }
  }
</script>
<script type="module" src="./main.js"></script>
```

Pin one exact version and use it for both entries. Mixing versions between the core and the addons causes confusing errors. Check [npm](https://www.npmjs.com/package/three?activeTab=versions) for the latest release when you set this up; Three.js ships a new numbered release every couple of months and occasionally renames or removes things, so read the [migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide) before you upgrade.

## Your first scene, done properly

Here's a complete starter. It uses a `<canvas>` you place in your own HTML, so the 3D can live inside a normal page layout instead of taking over `document.body`.

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Three.js starter</title>
    <style>
      html, body { margin: 0; height: 100%; }
      #scene { display: block; width: 100%; height: 100vh; }
    </style>
  </head>
  <body>
    <canvas id="scene" role="img" aria-label="A blue cube rotating slowly"></canvas>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

`main.js`:

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#scene');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f172a');

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.set(2, 1.5, 3);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#3b82f6', roughness: 0.4 })
);
scene.add(cube);

scene.add(new THREE.HemisphereLight('#ffffff', '#334155', 1));
const sun = new THREE.DirectionalLight('#ffffff', 2);
sun.position.set(3, 4, 2);
scene.add(sun);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Match the drawing buffer to the canvas's CSS size.
function resize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(canvas);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

renderer.setAnimationLoop((time) => {
  if (!reduceMotion.matches) {
    cube.rotation.x = time * 0.0004;
    cube.rotation.y = time * 0.0006;
  }
  controls.update();
  renderer.render(scene, camera);
});
```

A few lines here are doing more than they look like.

**`setPixelRatio(Math.min(window.devicePixelRatio, 2))`** makes the scene sharp on Retina and phone screens. The cap matters: some phones report a ratio of 3, and rendering at 3x means drawing more than twice as many pixels as 2x for a difference most people can't see. That cap is one of the cheapest performance wins you'll ever get.

**`renderer.setSize(width, height, false)`** resizes the drawing buffer without touching the canvas's CSS. Your stylesheet decides how big the canvas is, and Three.js follows. A `ResizeObserver` on the canvas catches every size change, including layout shifts that a `window` resize listener misses. Forget `updateProjectionMatrix()` and your scene will look stretched after the first resize.

**`renderer.setAnimationLoop()`** is the render loop to use now. It's a wrapper around `requestAnimationFrame` that pauses in background tabs, works with WebXR, and is what the newer WebGPU renderer expects. The callback receives a timestamp in milliseconds, which is why the rotation is based on `time` instead of adding a fixed amount per frame. That keeps the speed the same on 60 Hz and 120 Hz screens. (If you need a delta between frames, use `THREE.Timer`; the old `Clock` class is deprecated.)

**Lighting.** `MeshStandardMaterial` is physically based, so with no lights it renders black. A hemisphere light for soft fill plus one directional light is a good default. Since Three.js moved to physically correct light units, intensities from old tutorials are often way off, so tune by eye.

## Beyond the cube: models, interaction and React

### Load real models with GLTFLoader

Cubes get you started; real projects use models made in Blender or another tool. Export them as **glTF**, preferably the single-file `.glb` version. It's the format Three.js handles best, and it carries meshes, materials, textures and animations in one file.

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltf = await loader.loadAsync('/models/chair.glb');
scene.add(gltf.scene);
```

Put the file in Vite's `public/` folder so it's served as-is. If the model shows up black, you probably have no lights or no environment map. If it's tiny or enormous, the exporter's unit scale is off; fix it in Blender rather than scaling in code.

Once the model is in, the next pieces most projects need are:

- `OrbitControls` (already in the starter) for drag-to-rotate and zoom.
- `THREE.Raycaster` for hover and click: cast a ray from the pointer through the camera and see which mesh it hits.
- `AnimationMixer` to play animations baked into the glTF.
- A physics engine when objects need to collide or fall. Rapier is the one I'd look at first today; cannon-es (the maintained fork of cannon.js) is simpler for basic cases.

### When to reach for React Three Fiber

If your site is already a React or Next.js app, look at [React Three Fiber](https://r3f.docs.pmnd.rs/) (R3F). It's a React renderer for Three.js: same objects, written as JSX, with the render loop, resizing and pixel ratio handled for you. The companion library Drei gives you ready-made controls, loaders and helpers.

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Hero3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [2, 1.5, 3], fov: 50 }}>
      <hemisphereLight args={['#ffffff', '#334155', 1]} />
      <directionalLight position={[3, 4, 2]} intensity={2} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <OrbitControls enableDamping />
    </Canvas>
  );
}
```

The `'use client'` line is for the Next.js App Router; WebGL only runs in the browser. Current R3F targets React 19, so check that your React version matches before installing.

My take: use R3F when the 3D shares state with the rest of a React UI (a configurator whose options live in React, for example). Use plain Three.js for a standalone experience or when you're still learning, because every R3F problem eventually turns into a Three.js problem, and you'll debug it faster if you know the layer underneath.

## Keep it fast: the numbers that matter

Three.js performance problems almost always come from four places.

**Draw calls.** Every separate mesh-and-material pair is roughly one draw call, and the CPU cost of issuing them adds up long before the GPU is busy. Log `renderer.info.render.calls` while you build. A few hundred is fine on most devices; thousands will stutter on phones. Merge static meshes, share materials, and use `InstancedMesh` when you have many copies of the same object.

**Texture size.** A texture's file size isn't its memory cost. A 4096 x 4096 PNG might be a few megabytes on disk, but on the GPU it unpacks to around 64 MB before mipmaps. Use 2048 or smaller unless something fills the screen, and keep dimensions as powers of two.

**Compression.** This is where the biggest wins are:

- **KTX2 (Basis Universal)** textures stay compressed on the GPU, unlike PNG or JPEG. Load them with `KTX2Loader`.
- **Draco** or **Meshopt** shrink geometry. Meshopt decodes faster and also compresses animations well; Draco often produces smaller mesh files. Pick one.

[glTF Transform](https://gltf-transform.dev/) can apply all of this from the command line:

```bash
npx @gltf-transform/cli optimize input.glb output.glb --compress meshopt --texture-compress webp
```

(KTX2 output needs the KTX-Software tools installed; WebP is the easy first step.) Then tell `GLTFLoader` how to decode whatever you used. Copy the decoder folders from `node_modules/three/examples/jsm/libs/draco/` and `libs/basis/` into `public/`:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const draco = new DRACOLoader().setDecoderPath('/draco/');
const ktx2 = new KTX2Loader().setTranscoderPath('/basis/').detectSupport(renderer);

const loader = new GLTFLoader()
  .setDRACOLoader(draco)
  .setKTX2Loader(ktx2)
  .setMeshoptDecoder(MeshoptDecoder);
```

**Disposal.** Three.js doesn't free GPU memory when you remove an object from the scene. If your scene is torn down (a route change in a single-page app, a modal that closes), call `.dispose()` on geometries, materials and textures, and on the renderer itself when the canvas goes away. Skip this and memory climbs every time the user navigates back to the page. R3F does this automatically when components unmount.

> Test on a real mid-range Android phone, not just your laptop. A scene that holds 120 fps on an M-series Mac can drop to a slideshow on the devices a lot of your visitors actually use.

Two more habits: lazy-load the 3D code (a dynamic `import()` once the canvas scrolls into view) so it doesn't block the rest of the page, and stop rendering when nothing changes. If the scene is static until the user drags, render only on the controls' `change` event instead of 60 times a second.

## Make it accessible, with a fallback

A canvas is a picture to a screen reader. Give it `role="img"` and an `aria-label` that says what's shown, as in the starter, and keep real content (headings, product names, prices, buttons) in HTML, not painted into the scene.

Respect `prefers-reduced-motion`. The starter stops the auto-rotation when it's set but still lets the user drag the model. For bigger experiences with camera fly-throughs or scroll-driven motion, swap in a still image or a static camera instead.

Plan for WebGL not being available, too: old hardware, locked-down corporate browsers, or a GPU process that crashed. Three.js ships a check:

```js
import WebGL from 'three/addons/capabilities/WebGL.js';

if (!WebGL.isWebGL2Available()) {
  canvas.replaceWith(Object.assign(new Image(), {
    src: '/images/hero-fallback.jpg',
    alt: 'A blue cube on a dark background',
  }));
}
```

Run it before any of the setup code and skip creating the renderer when it fails; otherwise the WebGL context error will still throw. And don't hijack scrolling: if the canvas covers the page, make sure touch users can still scroll past it.

## Where WebGPU fits right now

Three.js now has a second renderer, `WebGPURenderer`, imported from `three/webgpu`. It uses WebGPU where the browser supports it and falls back to WebGL 2 automatically, so you don't have to write two versions. WebGPU is on by default in current Chrome, Edge and Safari, with Firefox support still rolling out across platforms.

The catch is shaders and post-processing. `WebGPURenderer` uses node materials and TSL (Three.js Shading Language, written in JavaScript), and it doesn't support `ShaderMaterial`, `onBeforeCompile` or the classic `EffectComposer`. The official docs still describe it as experimental and note that `WebGLRenderer` can be faster for some scenes. It also initializes asynchronously, which `setAnimationLoop` handles for you; if you need it ready earlier, `await renderer.init()`.

What I'd do as a beginner: learn on `WebGLRenderer`. It's stable, maintained, and almost every tutorial and example targets it. Everything in this article (scenes, cameras, lights, loaders) carries over unchanged. Try `WebGPURenderer` when you start writing custom shaders, because TSL is where that work is heading.

## What to do next

Get the starter running, then replace the cube with a `.glb` model, run it through glTF Transform, and check `renderer.info` on your phone. That one loop (build, compress, measure on a real device) will teach you more than any number of spinning-cube demos.

For learning material, the [official manual and docs](https://threejs.org/manual/) are good and the [examples page](https://threejs.org/examples/) is the best reference there is: every example's source is one click away. Bruno Simon's [Three.js Journey](https://threejs-journey.com/) is the most thorough paid course and covers R3F and shaders too.

If you'd rather have a 3D site built for you than learn the stack, [get in touch](https://felipecantujr.com/get-started).
