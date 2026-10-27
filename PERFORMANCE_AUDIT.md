# Portfolio performance audit

Date: 2026-10-26. Site: [tracythutran.com](https://tracythutran.com).

**Old** is commit `66a3e86`, which is what tracythutran.com serves. Its production build has the same file hashes as the live site (`index-BDFtV7HW.js`, `index-C2Eu7L1v.css`). **New** is that commit plus the changes in [section 6](#6-changes).

Every number in this report was measured on the machine in [section 2](#2-test-environment). Load metrics come from Lighthouse, whose network and CPU slowdown are simulated. [Section 13](#13-what-was-and-wasnt-tested) lists what was measured, what was simulated and what wasn't tested.

## 1. Executive summary

The site now loads much faster everywhere and is much calmer on desktop. Taps on a phone respond about the same as before; they were already reasonable once measured fairly.

Same session, old and new builds alternating (Lighthouse medians):

| | Old | New |
|---|---|---|
| Mobile Lighthouse score | 63 | **93** |
| Mobile largest contentful paint | 5.3 s | **2.6 s** |
| Mobile first contentful paint | 2.5 s | **1.5 s** |
| Mobile total blocking time | 466 ms | **222 ms** |
| Desktop Lighthouse score | 95 | **100** |
| Desktop largest contentful paint | 1.17 s | **0.73 s** |
| Download at load | 821 KB | **636 KB** |
| DOM elements at load | 2,142 | **711** |

Desktop runtime (1440×900):

- **The bonsai's animation.** It used to force a layout on every frame whenever anything else on the page moved, keeping the main thread about 40% busy during clicks and scrolling. Now it's about 12% busy with no layouts. With nothing else moving: 3.5% before, 0.8% now.
- **Opening things.** The old build stalled when opening the résumé (one frame took 4.2 s) and the laptop (648 ms to the next paint). The new build has no long tasks on any desk object.
- **Résumé scrolling.** 53 fps before, 85 fps now.

Everything else:

- **Main-thread work per interaction** (4x CPU slowdown) is 18–48% lower, with 2–6 times fewer layouts and paints.
- **Slow phone (390×844, 4x CPU).** Tap-to-paint times are within run-to-run spread of the old build. Résumé scrolling no longer drops frames: the worst frame went from 35–47 ms to 24 ms.
- **Clean results:** no memory growth in DOM nodes or listeners, no console errors, and no overflow or blank space at 390×844, 768×1024, 1440×900 or 1920×1080. Layout shift is unchanged at about 0.02.
- **Small costs:**
  - JavaScript boot-up during load went from 370 to 526 ms on mobile, because the desk now builds in separate tasks after the welcome screen paints. Blocking time still halved.
  - Opening the name tag on a slow phone is about 25 ms slower (120–128 vs 88–104 ms), still well inside the 200 ms "good" limit for interaction latency.

**Measurement note.** An earlier same-day baseline showed much larger stalls, for example a 1.65 s task when opening the laptop. It was recorded while the system drive was out of space, and a clean side-by-side run couldn't reproduce it. So it isn't used as a "before" number anywhere. A run where one local server had silently stopped was also thrown out. Every before/after comparison comes from the final side-by-side session.

## 2. Test environment

| | |
|---|---|
| Machine | Windows 10 Home (build 19045), Intel Core i7-6800K at 3.4 GHz (6 cores, 12 threads), 16 GB RAM |
| Browser | Microsoft Edge 156.0.4314.42 (Chromium), headless (`--headless=new`), driven over the Chrome DevTools Protocol |
| Rendering | GPU: NVIDIA GeForce GTX 1080 through ANGLE/Direct3D 11, with GPU compositing and rasterization on (confirmed with `SystemInfo.getInfo`) |
| Tools | Node.js 25.8.0, Lighthouse 12.8.2 (npm), Python 3.12 |
| Live site | Vercel, HTTP/2, gzip |
| Local builds | `vite build`, served by `vite preview` (HTTP/1.1, gzip): old on port 5176, new on port 5175. Before every run, both servers were checked for the right build. |

Test profiles:

- **Lighthouse mobile.** Default simulated throttling: 150 ms round trip, about 1.6 Mbps down, 4x CPU slowdown, emulated phone screen.
- **Lighthouse desktop.** `--preset=desktop`: 40 ms round trip, about 10 Mbps, no CPU slowdown.
- **Desktop interaction runs.** 1440×900 at device pixel ratio 1, no CPU slowdown.
- **Slow-phone interaction runs.** 390×844 at device pixel ratio 3, touch and mobile emulation, 4x CPU slowdown. At this width the bonsai and AirPods are hidden by the layout, so phones never paid for them.
- **Interaction runs in general.** No network throttling; files come from the local server.

Other work was running on the machine during part of the final session. Old and new runs alternated, so it affected both builds alike, but it adds noise.

## 3. Tools and commands

The scripts live in `G:\Portfolio-perf\lh`, outside the repository.

| What | How |
|---|---|
| Load metrics | `npx lighthouse <url> [--preset=desktop] --only-categories=performance --output=json`. Old and new alternate: mobile 3 runs each, desktop 2 runs each. |
| Interactions, scrolling, memory, console | `node bench.mjs <url> <label> <cpu> <width> <height> <mobile>`: opens and closes the résumé, laptop, name tag and phone with trusted mouse and keyboard input sent over DevTools |
| Main-thread work per interaction | `node trace.mjs <url> <label> 4`: a DevTools performance trace around each interaction at 1440×900 with 4x CPU slowdown, summed by event type |
| Idle cost per effect | `node idle.mjs <url> <cpu>` and `node idle2.mjs <url>`: main-thread busy time while idle, with each animation switched off in turn, both on a quiet page and while a per-frame callback runs |
| Screen sizes | `node sizes.mjs <url> <label>`: 390×844, 768×1024, 1440×900 and 1920×1080; page size against the window, wheel scrolling, object placement, every object opened, console output, screenshots |
| Old vs new | `ab.sh`: runs the above against both builds in alternating order |
| Rendering mode | `node gpuinfo.mjs` |

What `bench.mjs` records for each interaction:

- **Input to next paint.** From the Event Timing API: the time from the click or key press until the browser painted the result. This is the same measurement INP uses.
- **Longest task.** From the Long Tasks API: the longest main-thread task over 50 ms.
- **Worst frame.** From `requestAnimationFrame` over the 1.5 s after the input.
- **Résumé scrolling.** 20 mouse-wheel steps of 120 px, 80 ms apart, inside the opened résumé; frames per second, worst frame, and frames over 25 ms ("dropped").
- **Idle.** Main-thread busy time and layout count over 4 s with nothing happening.
- **Memory.** 8 rounds of opening and closing all four objects, with forced garbage collection before and after: JavaScript heap, DOM nodes and event listeners.

## 4. Baseline (old build)

### Load

Lighthouse, medians.

| Run | Score | FCP | LCP | TBT | CLS | Speed Index | Bytes |
|---|---|---|---|---|---|---|---|
| Live site, mobile (3 runs) | 49 | 2.87 s | 5.66 s | 773 ms | 0 | 6.65 s | 826 KB |
| Live site, desktop (3 runs) | 85 | 0.97 s | 1.36 s | 122 ms | 0.02 | 3.87 s | 826 KB |
| Local old build, mobile (side by side, 3 runs) | 63 | 2.54 s | 5.34 s | 466 ms | 0.023 | 4.45 s | 821 KB |
| Local old build, desktop (side by side, 2 runs) | 95 | 0.75 s | 1.17 s | 16 ms | 0.021 | 2.01 s | 821 KB |

The live site scores a little lower than the same build served locally because of real network distance to Vercel. The live runs were taken earlier the same day, not side by side.

What Lighthouse attributed it to (live, mobile):

- **LCP was the welcome title, and 89% of its time was render delay.** The title only existed once the 409 KB script had downloaded, run, and built the entire desk.
- **Two requests blocked rendering:** the Google Fonts stylesheet (about 850 ms) and the app stylesheet (about 165 ms).
- **2,142 DOM elements at load.** The element with the most children was a bonsai SVG group.
- **Images.**
  - The wood photo was a 332 KB JPEG; Lighthouse estimated 215 KB saved as WebP.
  - The two About photos (106 KB and 80 KB) downloaded at startup.
- **About 4.2 s of main-thread time:** style and layout 2.1 s, other 1.2 s, script evaluation 0.6 s. The largest of nine long tasks was 701 ms.
- **Already fine:** compression, cache headers on hashed files, `font-display`, no legacy polyfills, no duplicated modules.

### Runtime

Measured: the old build in the side-by-side session.

| Desktop, 1440×900, 1x CPU (1 run) | Input to next paint | Longest task | Worst frame |
|---|---|---|---|
| Résumé open | not recorded* | 156 ms | 4,238 ms |
| Résumé close | 144 ms | — | 106 ms |
| Laptop open | 648 ms | 272 ms | 400 ms |
| Laptop close | 384 ms | — | 306 ms |
| Name tag open / close | 112 / 208 ms | — | 47 / 153 ms |
| Phone open / close | 160 / 80 ms | — | 106 / 35 ms |
| Résumé scrolling | 53.1 fps, worst frame 24 ms | | |
| Idle (4 s) | 59.5% main thread busy, 339 layouts | | |

\*The Event Timing API reported no entry for this click; the stall came in the frames after it.

| Slow phone, 390×844, 4x CPU (2 runs, range) | Input to next paint | Longest task |
|---|---|---|
| Résumé open / close | 240–312 / 168–200 ms | 97–187 / 0–56 ms |
| Laptop open / close | 256–288 / 480–584 ms | 90–115 / 55–60 ms |
| Name tag open / close | 88–104 / 248–296 ms | 0 / 0–83 ms |
| Phone open / close | 120–160 / 216–232 ms | 50–53 / 0–67 ms |
| Résumé scrolling | 80.2–81.8 fps, worst frame 35–47 ms, 1–2 dropped | |
| Idle (4 s) | 6.5–9.4% busy, 0 layouts | |

## 5. Problems found

| # | Problem | Severity | Evidence | Root cause |
|---|---|---|---|---|
| 1 | Slow first paint on phones | High | Mobile LCP 5.3 s (simulated), 89% render delay | The welcome title was drawn by React only after the whole desk (about 2,100 elements) was built in the same task, and the Google Fonts stylesheet blocked rendering. |
| 2 | The bonsai's animation loaded the main thread on desktop | High | With nothing else moving: 3.5% busy, 26 layouts in 4 s. Whenever anything else animates (a click's lift, scrolling): 39–69% busy with a layout on every frame. With only the bonsai animation switched off: 0–2%. | The bonsai was about 1,400 live SVG nodes animated with transforms on inner SVG elements, which forces style, layout and paint. Its cost landed exactly when the page was busiest, during every desktop click. |
| 3 | Stalls when opening objects on desktop | High | Résumé open: a 4.2 s frame. Laptop open: 648 ms to the next paint and a 272 ms task. | The idle work above, plus the Projects, About and readable résumé content mounting at the moment of the click, during the lift animation. |
| 4 | Scrolling the open résumé stuttered | Medium | Desktop 53 fps. Phone worst frame 35–47 ms. With only the glow switched off (phone, 4x CPU), 74.5 → 85.7 fps and worst frame 47 → 12 ms. | The glow animated `text-shadow`, which repaints the text on every frame while you scroll. |
| 5 | Heavy image bytes | Low | 332 KB JPEG background | High-quality JPEG |
| 6 | Render-blocking web fonts | Low (part of #1) | About 850 ms on simulated mobile | The stylesheet `<link>` blocks the first paint |

Not found:

- **Memory leaks:** none ([section 8](#8-memory)).
- **Console errors or warnings:** none, in either build, at any size.
- **Overflow or blank space:** none at any tested size ([section 9](#9-screen-sizes-and-browsers)). The blank space below the page that used to appear on mobile is already fixed in the live build.

## 6. Changes

None of these change the design.

| File | Change | Why |
|---|---|---|
| `index.html` | The welcome title is in the HTML, inside `#root`; React replaces it on mount. | It paints before any JavaScript runs, which fixes LCP. |
| `index.html` | The Google Fonts stylesheet loads with `rel="preload"` and swaps to a stylesheet on load, with a `<noscript>` fallback. | It no longer blocks the first paint. Text shows in the fallback font until the web fonts arrive, as `display=swap` already allowed. |
| `src/App.jsx` | The desk renders after the welcome screen's first paint, in a `startTransition`. The hidden content (readable résumé, About, Projects) renders 400 ms later, also as a transition. | Neither the first paint nor the first click pays for building everything. |
| `src/App.jsx` | Steady `useCallback` handlers for the résumé's buttons. | The memoized résumé doesn't re-render on every desk state change. |
| `src/App.jsx`, `NameTag.jsx`, `DeskDevices.jsx` | Removed the inline `borderRadius` styles on the four lifting objects. | With the radius inline, Motion rewrites it on every frame of a layout animation to undo the scale. The stylesheet already sets the same radius. |
| `src/desk/NameTag.jsx`, `DeskDevices.jsx` | A `prepared` prop mounts About and Projects ahead of time. | Opening no longer mounts a whole screen during the animation. |
| `src/desk/DeskDecor.jsx`, `Desk.css` | The bonsai is drawn once into three images (pot, back canopy, front canopy) plus seven small petal elements, instead of about 1,400 live SVG nodes. The sway and falling petals use `transform` and `opacity` only. | The same drawing, without the per-frame layout and paint. A per-frame style update remains (section 10). |
| `src/index.css`, `ResumePaper.jsx` | The glow is now a copy of the text (`::after`, from a `data-glow` attribute) whose opacity pulses. The text keeps a soft static glow. Hover, focus and reduced motion still stop it. | Opacity animates on the compositor; `text-shadow` repainted the text every frame. |
| `src/index.css`, `src/oak-desk.webp` | The wood background is WebP at quality 86 (146 KB instead of 332 KB). The original JPEG stays in the repo as the source. | Smaller download; compared side by side with the JPEG at desk size. |

Tried and not kept:

- **`will-change: transform` on the four desk objects.** On the slow phone, résumé open went from 712 to 952 ms input-to-paint (an intermediate build, back-to-back runs), because of the extra layers.

The same commit also adds the Shouldn't Wouldn't walkthrough, a separate feature. Its code (15 KB) and styles (3.7 KB) are separate chunks that load only when the walkthrough opens. The startup script grew by about 0.5 KB, and the startup stylesheet is unchanged.

## 7. Before and after

All from the side-by-side session.

### Load (Lighthouse)

| | Old mobile | New mobile | Old desktop | New desktop |
|---|---|---|---|---|
| Runs | 3 | 3 | 2 | 2 |
| Score (each run) | 61, 66, 63 | 93, 89, 93 | 95, 94 | 100, 100 |
| First contentful paint | 2.54 s | **1.51 s** | 0.75 s | **0.38 s** |
| Largest contentful paint | 5.34 s | **2.57 s** | 1.17 s | **0.73 s** |
| Total blocking time | 466 ms | **222 ms** | 16 ms | 21 ms |
| Cumulative layout shift | 0.023 | 0.025 | 0.021 | 0.021 |
| Speed Index | 4.45 s | **1.66 s** | 2.01 s | **0.46 s** |
| JavaScript boot-up | 370 ms | 526 ms | 115 ms | 120 ms |
| Main-thread work during load | 1.94 s | 2.15 s | 0.68 s | 0.59 s |
| Bytes | 821 KB | **636 KB** | 821 KB | **636 KB** |
| DOM elements | 2,142 | **711** | 2,179 | **748** |
| Render-blocking | fonts + app CSS | app CSS only | fonts + app CSS | app CSS only |

Values are medians; for the 2-run desktop columns that is the higher run. The LCP element is the welcome title in both builds.

### Desktop interactions (1440×900, 1x CPU, 1 run each)

| | Old: to paint / longest task / worst frame | New: to paint / longest task / worst frame |
|---|---|---|
| Résumé open | not recorded / 156 ms / 4,238 ms | **200 ms / none / 106 ms** |
| Résumé close | 144 ms / none / 106 ms | 128 ms / none / 59 ms |
| Laptop open | 648 ms / 272 ms / 400 ms | **304 ms / none / 247 ms** |
| Laptop close | 384 ms / none / 306 ms | 368 ms / none / 259 ms |
| Name tag open | 112 ms / none / 47 ms | 88 ms / none / 47 ms |
| Name tag close | 208 ms / none / 153 ms | 176 ms / none / 106 ms |
| Phone open | 160 ms / none / 106 ms | 192 ms / none / 94 ms |
| Phone close | 80 ms / none / 35 ms | 88 ms / none / 35 ms |
| Résumé scrolling | 53.1 fps, worst 24 ms | **85.1 fps, worst 12 ms** |
| Idle, 4 s | 59.5% busy, 339 layouts | **10.9% busy, 0 layouts** |

The idle row above was measured with a callback running on every frame, the way the page behaves while anything else is animating. `idle2.mjs` separates the two cases. Desktop, 1x CPU, main-thread busy over 4 s:

| | Old | New |
|---|---|---|
| Nothing else moving | 3.5%, 26 layouts | **0.8%, 0 layouts** |
| Nothing else moving, bonsai animation off | 0.0% | 0.0% |
| While something else animates | 39.4%, 341 layouts | **11.8%, 0 layouts** (341 style updates) |
| While something else animates, bonsai animation off | 2.0% | 2.1% |

Other desktop runs the same day agree: old 39.7% and 68.6% busy with 248–280 layouts; new 9.5% and 15.9% busy with no layouts.

### Slow-phone interactions (390×844, 4x CPU, 2 runs each, range)

| | Old: to paint | New: to paint | Old: longest task | New: longest task |
|---|---|---|---|---|
| Résumé open | 240–312 ms | 248–288 ms | 97–187 ms | 160–183 ms |
| Résumé close | 168–200 ms | 176–208 ms | 0–56 ms | 59–67 ms |
| Laptop open | 256–288 ms | 248–272 ms | 90–115 ms | 114–119 ms |
| Laptop close | 480–584 ms | 480–528 ms | 55–60 ms | 0–52 ms |
| Name tag open | 88–104 ms | 120–128 ms | none | 54–62 ms |
| Name tag close | 248–296 ms | 248–304 ms | 0–83 ms | none |
| Phone open | 120–160 ms | 120–128 ms | 50–53 ms | 52–67 ms |
| Phone close | 216–232 ms | 176–216 ms | 0–67 ms | none |
| Résumé scrolling | 80.2–81.8 fps, worst 35–47 ms, 1–2 dropped | **84.5 fps, worst 24 ms, 0 dropped** | | |

On phones the old and new builds overlap except for scrolling (better) and name tag open (about 25 ms slower).

### Main-thread work per interaction

From `trace.mjs` at 1440×900 with 4x CPU slowdown. Each figure is the main-thread time summed over the 1.2–1.5 s after the input, with the layout and paint counts.

| | Old | New | Change |
|---|---|---|---|
| Idle (2 s) | 123 ms, 3 layouts, 6 paints | 42 ms, 0 layouts, 0 paints | −66% |
| Laptop open | 1,743 ms, 64 / 126 | 908 ms, 21 / 59 | −48% |
| Laptop close | 858 ms, 40 / 57 | 617 ms, 24 / 20 | −28% |
| Résumé open | 2,302 ms, 72 / 156 | 1,258 ms, 37 / 25 | −45% |
| Résumé close | 1,051 ms, 48 / 68 | 758 ms, 24 / 21 | −28% |
| Name tag open | 1,433 ms, 66 / 133 | 961 ms, 26 / 38 | −33% |
| Name tag close | 1,277 ms, 65 / 111 | 812 ms, 26 / 39 | −36% |
| Phone open | 1,250 ms, 61 / 111 | 714 ms, 23 / 42 | −43% |
| Phone close | 864 ms, 45 / 65 | 702 ms, 22 / 29 | −19% |

## 8. Memory

8 rounds of opening and closing all four objects (32 opens and 32 closes), with forced garbage collection before and after.

| | JS heap before → after | DOM nodes | Event listeners |
|---|---|---|---|
| Old, phone | 4.02 → 4.55 MB | 2,659 → 2,659 | 173 → 173 |
| New, phone | 3.72 → 4.26 MB | 2,693 → 2,693 | 180 → 180 |
| Old, desktop | 4.01 → 4.57 MB | 2,696 → 2,696 | 177 → 177 |
| New, desktop | 3.72 → 4.25 MB | 2,733 → 2,733 | 184 → 184 |

DOM nodes and listeners don't grow, so nothing is left attached after closing. The heap grows about 0.5 MB in both builds and doesn't keep climbing from round to round. That fits warm caches (compiled code, Motion's measurements) rather than a leak. A much longer run would settle it for certain.

## 9. Screen sizes and browsers

From `sizes.mjs` on both builds; the results were identical.

| Size | Page vs window | Wheel scroll on the page | Overflow | Opened objects | Console |
|---|---|---|---|---|---|
| 390×844 (phone) | 390×844 = 390×844 | none | none | all inside the window; résumé and About scroll inside themselves; the laptop opens to a full-screen Projects list | clean |
| 768×1024 (tablet) | exact fit | none | none | all inside; résumé and About scroll | clean |
| 1440×900 | exact fit | none | none | all inside; résumé and About scroll | clean |
| 1920×1080 | exact fit | none | the AirPods' empty bounding box crosses the top edge; the drawing is fully visible | all inside | clean |

- **The old mobile blank space.** The page is exactly the window's size at every tested size, and the wheel can't scroll it, so there's no strip of empty page below the desk. The live build already behaves this way. It wasn't checked on a real iPhone, where the browser's own toolbars change the window height (see section 13).
- **While an object is open,** the page behind it is locked (`overflow: hidden` on `body`).
- **Browsers.** Only Chromium was tested (Edge 156). Chrome is installed but uses the same engine, so it wasn't run separately. Firefox isn't installed. Safari isn't available on Windows.

## 10. Remaining issues

| Issue | Severity | Detail |
|---|---|---|
| Closing the laptop on a slow phone takes about 0.5 s to paint | Medium | 480–528 ms in both builds, past the 200 ms "good" mark. On a phone the laptop opens to a full-screen Projects list, and closing it repaints the whole screen during the animation. |
| Opening the résumé is still the most main-thread work | Low | 1,258 ms of work at 4x CPU spread across the animation. Time to paint is fine (200–290 ms). |
| JavaScript boot-up during load | Low | Up from 370 to 526 ms on simulated mobile, because the desk builds in separate tasks after the first paint. Blocking time still halved. |
| Unused JavaScript at load | Low | Lighthouse estimates about 63 KB of the 134 KB gzipped script isn't used at load (mostly animation code and desk components). |
| Source Serif 4 font file | Low | 119 KB, because it is a variable font with the optical-size axis. |
| About photos | Low | 186 KB, now downloading during the welcome screen instead of competing with the first paint. |
| The bonsai still costs something while other things animate | Medium | Desktop, 1x CPU: 11.8% busy with a style update every frame, against 2.1% with its animation off. No layouts or paints. A likely cause is that the petal and sway keyframes compute positions from CSS variables, which keeps those animations on the main thread. Precomputed keyframes or the Web Animations API should move them to the compositor; not tried yet. |
| Name tag open on a slow phone | Low | About 25 ms slower than before (120–128 ms); About is mounted ahead of time, so there is more to show. |

## 11. Recommendations

None of these were done; each needs a decision or a larger change.

1. **Test on real devices:** an iPhone in Safari, a mid-range Android phone in Chrome, and Firefox on desktop. Recruiters often open links on an iPhone or a Mac, and none of those were covered here.
2. **Laptop close on phones:** on narrow screens, fade the Projects list out instead of animating the full-screen layout back to the desk. This changes how the close looks, so it needs your approval.
3. **Give the bonsai's petals and sway fixed keyframes** (or Web Animations API calls with computed pixel values) so the browser can run them off the main thread. Re-measure with `idle2.mjs`; the look should not change.
4. **Self-host and subset the fonts,** or request Source Serif 4 without the optical-size axis. That saves about 100 KB and a connection to Google.
5. **Load the About photos only when About opens,** and serve WebP at twice the displayed size.
6. **Add real-user monitoring** (Vercel Speed Insights or the `web-vitals` library) to see LCP and INP from actual visitors rather than lab runs.
7. **Re-run `ab.sh`** after any visual change to the desk; the scripts are kept for that.

## 12. Recruiter readiness

**Ready to share.**

- **First screen.** On a simulated mid-range phone the first screen paints at about 1.5 s and is complete at 2.6 s. On desktop both happen in under 0.75 s.
- **Clicks.** Most respond in 90–300 ms.
- **Errors and layout.** No errors at any tested size, and nothing overflows.
- **The one notable rough spot** is closing the laptop on a slow phone, at about half a second.
- **The biggest unknown is Safari and iOS.** Try the site once on an iPhone before sending the link widely.

## 13. What was and wasn't tested

**Measured** (headless Edge 156 with GPU rendering, on this machine):

- Lighthouse runs (local, side by side; live site earlier the same day).
- Interaction timings with trusted input.
- Main-thread traces.
- Idle cost.
- Résumé scrolling.
- Memory over 64 open/close actions.
- Console output.
- Page fit at four sizes.
- The rendering mode.

**Simulated:**

- Lighthouse's network speeds and CPU slowdown.
- The 4x CPU slowdown in the interaction runs (DevTools CPU throttling, not a real phone CPU).
- Touch and phone screen emulation.

**Not tested:**

- Firefox, Safari, and Chrome as a separate browser (same engine as Edge).
- Real phones and tablets, including iOS Safari's changing toolbar height.
- Real-user data.
- Slow networks in the interaction runs.
- Screen readers.
- `prefers-reduced-motion`: the rules are in the CSS and were read in code, but weren't measured in this pass.
