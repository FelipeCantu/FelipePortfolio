# Notes: creating-stunning-3d-websites-with-three-js-a-beginner-s-guide

Slug kept. New title: "Three.js for Beginners: Build Your First 3D Website the Modern Way". Excerpt is exactly 155 characters. Body is about 1,900 words of prose (about 2,330 including code).

## Most important items to check

1. **The import map pins `three@0.187.0`.** It's the latest version on npm (published 2026-10-30, checked on registry.npmjs.org on 2026-11-22). The last release on GitHub is r186, so r187 is newer than that page showed. Three.js ships a new release every couple of months, so check the version again before publishing, and bump it in the article whenever you refresh the post. The CDN path layout (`build/three.module.js`, `examples/jsm/`) matches the 0.187.0 tarball.
2. **The status of WebGPU is changing fast.** The official manual page (threejs.org/manual/pages/webgpurenderer.html) still calls `WebGPURenderer` "experimental". It says `ShaderMaterial`, `RawShaderMaterial`, `onBeforeCompile` and `EffectComposer` aren't supported, and that `WebGLRenderer` is still maintained and recommended for WebGL 2 apps. The browser-support line (on by default in Chrome, Edge and Safari, with Firefox still rolling out) comes from a third-party post (utsubo.com, "What's New in Three.js (2026)"): Safari 26, Chrome 113+ desktop and 121+ Android, and Firefox on Windows since 141 with macOS partial. Re-check this section each time you update the post.
3. **I didn't run the code.** I checked the APIs against the three 0.187.0 source: the setters on `GLTFLoader`, `DRACOLoader` and `KTX2Loader` return `this`, so the chained calls work, `KTX2Loader.detectSupport(renderer)` exists, `WebGL.isWebGL2Available()` exists, `THREE.Timer` is in core, and `Clock` logs a deprecation warning as of r183. I didn't execute any of it in a browser. Please run the starter (`npm create vite@latest`, vanilla template) and the R3F snippet once before publishing.

## Other claims to double-check

- **Installation:** `npm install three`, the Vite workflow and the `three/addons/` import paths come from the official installation page (threejs.org/manual/en/installation.html).
- **`setAnimationLoop`:** that it's the recommended loop and that it handles async init for `WebGPURenderer` comes from the official WebGPURenderer manual page. That the callback receives a millisecond timestamp is standard rAF behaviour, not verified separately.
- **`@react-three/fiber`:** latest is 9.8.2, and its peer dependency is `react >=19 <19.4` (from the npm registry). The article only says "current R3F targets React 19", with no version number.
- **gltf-transform:** the official npm page only shows `--texture-compress webp`. The `--compress meshopt` flag and the note that KTX2 output needs KTX-Software come from memory, so confirm with `npx @gltf-transform/cli optimize --help`.
- **Meshopt vs Draco:** that Meshopt decodes faster and handles animation, while Draco often produces smaller meshes, is general community guidance (unverified).
- **Numbers:** "a few hundred draw calls is fine, thousands stutter on phones" is a rule of thumb (unverified). The 4096x4096 texture is about 64 MB uncompressed RGBA, which is arithmetic (4096 x 4096 x 4 bytes), before mipmaps.
- **"Hundreds of kilobytes to a megabyte or more"** for a WebGL hero is a rough estimate (unverified). The minified three.module.js alone is several hundred KB before gzip.
- **Physics:** Rapier is suggested as the first option, and cannon-es as the maintained fork of cannon.js. That's my opinion, with the maintenance status not re-checked.
- **Lights:** the line about the "physically correct light units" change, and old tutorials' intensities being off, refers to the r155 lighting change (from memory).
- **Anakupto:** mentioned in general terms only, with no details beyond "3D work like Anakupto".

## Dropped from the original, and why

- **The r128 `<script>` tag and global `THREE`:** outdated. Three.js has been ES-module-only for a long time, and addons can't be loaded that way. Replaced with npm + Vite and an import map.
- **The cannon.js recommendation:** the original package is unmaintained. Replaced with Rapier and cannon-es.
- **The "Why learn Three.js in 2024" section:** dated, and mostly hype. The useful part became "When a 3D website is worth it (and when it isn't)".
- **The freeCodeCamp video link:** I couldn't confirm which video it was or whether it's current, and older videos use the r128-era setup. Kept the threejs.org docs and Three.js Journey. The course is linked by its proper name, even though the style guide bans the word "journey".
- **The "Key Improvements & Why They Work" AI editing notes and the hashtags:** removed as leftovers.
- **"Shaders" as a next step:** folded into the WebGPU/TSL section instead of a separate GLSL teaser. A beginner writing new shaders today should know about the TSL vs `ShaderMaterial` split first.
