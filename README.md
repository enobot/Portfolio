# tracythutran.com

My portfolio and interactive résumé, live at **[tracythutran.com](https://www.tracythutran.com)**.

## Overview

I wanted a portfolio that shows my background, my résumé, my projects and my design taste in one place, and that a recruiter would actually remember. So the page is a wooden desk seen from above. Pick up the résumé, the laptop, the phone or the name tag and it lifts toward you and opens into something you can read. The site is for recruiters, hiring managers and engineers who want to look at my work.

## Features

| On the desk | Opens into |
|---|---|
| Résumé paper | The full résumé. Project names open their walkthroughs. |
| Laptop | Projects, with links and walkthroughs |
| Phone | Contact: email, LinkedIn, GitHub, and a copy-email button |
| Name tag | About me |

Walkthroughs run in the browser:

- **Tracer:** freeze the screen, drag a box around an error, and get an example answer.
- **FITTMM:** recorded clips of the web app and the Android progress.
- **BLU:** a demo with sample players.
- **Shouldn't Wouldn't:** the extension's reminders and popup on sample forms, using its real wording and rules.
- **Drawgorithms:** recorded clips of the app: a tree drawn as it's typed, a binary search step by step, heap, graph, union-find, trie and deque drawings, and the practice checks.

Other features:

- **A welcome screen** with falling cherry blossoms that move away from the cursor, and a cherry blossom loading bar that gains a petal as each part of the page finishes loading.
- **"Get in touch"** opens a short form that turns into an email in your own mail app. Nothing is sent to a server.
- **On phones and narrow windows** the desk rearranges, and the laptop opens straight into a full-screen Projects list.

## Technologies

- **React 19 and Vite 8:** components and the build.
- **Motion (`motion/react`):** the lift animations. They're layout animations, so each object grows out of the spot where it sits on the desk.
- **react-mockframe:** the MacBook and iPhone frames.
- **Plain CSS with container-query units:** the whole desk is sized in one "inch" unit derived from the window, so it scales as one scene from a phone to a wide monitor.
- **Vercel** for hosting, **Cloudflare** for DNS.

## Architecture

```
index.html ─ static welcome title (paints before any JavaScript runs)
   │
main.jsx ─▶ App.jsx ── state: which object is open, posed, ready
              │
              ├─ LoadingScreen        welcome screen, petals, blossom loader
              ├─ desk-world           built right after the first paint
              │    ├─ ResumePaper     résumé text from data.js
              │    ├─ MacBook         Projects (ProjectsBody)
              │    ├─ DeskPhone       Contact
              │    ├─ NameTag         About (AboutBody)
              │    └─ DeskDecor       bonsai and AirPods (pre-drawn images)
              └─ walkthrough modals   lazy-loaded the first time one opens
```

- **Load order.** The welcome screen paints first. The desk is built in a React transition right after that, and the hidden screens (the readable résumé, About and Projects) are prepared 400 ms later. Opening something then doesn't have to build it.
- **Loading blossom.** The welcome screen waits for five steps: the fonts, the desk, the wood photo, the desk's pictures and the hidden screens. Its blossom gains a petal for each, at least 0.7 s apart so it visibly grows. The screen stays up for at least 4.3 s, and after 10 s it fills the blossom and leaves anyway, so one slow file can't keep anyone out. A file that fails to load counts as done and logs a warning. The steps are watched in `src/loadProgress.js`.
- **Opening an object.** `openDesk` records what was clicked and sets `which` and `posed`. Motion animates the object from its place on the desk to the center. When the animation finishes, `ready` turns on, and keyboard focus moves into the open object.
- **Content.** All résumé, About and project text lives in `src/data.js` and `src/desk/projectDetails.js`, separate from the components.

## Project structure

```
src/
  App.jsx                desk state, focus handling, load order
  data.js                résumé, About and project text
  index.css              base styles, résumé paper, dialogs
  desk/
    Desk.css             desk scene, layouts for each screen shape
    ResumePaper.jsx      the résumé
    DeskDevices.jsx      laptop and phone
    NameTag.jsx          name tag and About
    DeskDecor.jsx        bonsai, petals, AirPods
    projectDetails.js    project links and status lines
  *Modal.jsx             project walkthroughs, loaded on demand
  formSafety.js          limits and cleanup for the Get in touch form
  loadProgress.js        what the loading blossom waits for, and its timing
  loadProgress.test.js   tests for the blossom's timing rules
public/
  photos/                About photos
  fittmm/                FITTMM demo clips
  drawgorithms/          Drawgorithms demo clips and their poster stills
PERFORMANCE_AUDIT.md     measurements behind the performance work
```

## Run it locally

You need Node.js 20 or newer.

```bash
git clone https://github.com/enobot/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Production build (written to `dist/`):

```bash
npm run build
npm run preview
```

Automated tests (Node's built-in test runner, no extra packages):

```bash
npm test
```

There are no environment variables or secrets.

## How to use

Wait for the welcome screen, then click (or Tab to) anything on the desk. Escape or the Close button puts it back. Inside the résumé, glowing project names open their walkthroughs.

## Testing and validation

`npm test` runs the automated tests. So far they cover the loading blossom's timing rules: the pace between petals, the 4.3 s minimum, waiting for slow steps, the 10 s limit, and reduced motion. Everything else below was checked by hand.

**Loading blossom**, checked on Oct 31, 2026, on the production build with a local test server that could delay or block the wood photo. With the photo delayed 7 s, the last petal waited for it and the screen left at 7.8 s. With the photo held back, the screen gave up at 10 s. With the photo missing (404), it counted as done and logged a warning. With everything fast, the screen left at 4.4 s, as it did before the blossom. The title stays in the same place as the static HTML title at 375, 1440 and 1920 px wide.

**Performance**, measured on Oct 26, 2026. Full method and raw numbers are in [PERFORMANCE_AUDIT.md](PERFORMANCE_AUDIT.md).
- **Lighthouse on the live site,** 3 runs each, medians:

  | | Before | After |
  |---|---|---|
  | Mobile score | 49 | 84 |
  | Largest contentful paint, mobile | 5.7 s | 3.1 s |
  | Desktop score | 85 | 100 |
  | Page weight | 826 KB | 641 KB |

- **Side-by-side runs of the old and new builds** on the same machine, alternating:
  - main-thread work per interaction is 18–48% lower;
  - desktop résumé scrolling went from 53 to 85 fps;
  - idle animation no longer forces a layout every frame.
- **Memory:** 64 open and close actions with no growth in DOM nodes or event listeners.

**Screen sizes:** checked at 390×844, 768×1024, 1440×900 and 1920×1080. No overflow, no blank space below the page, and every opened object fits inside the window.

**Console:** no errors or warnings in a fresh browser, including opening and closing the walkthroughs.

**Interaction checks:** Escape closes only the topmost open thing, and focus returns to what opened it.

**Not tested yet:** Firefox, Safari (including iOS), real phones and tablets, and screen readers. All automated checks ran in Chromium (Microsoft Edge 156).

## Security and privacy

- **No backend, no database, no cookies, no analytics.** It's a static site.
- **The "Get in touch" form never leaves your browser.** It strips control characters, limits each field's length, checks the email format, and then builds a `mailto:` link.
- **External links** open in a new tab with `rel="noopener noreferrer"`.
- **No secrets** are in the code.

## Challenges and what I learned

- **Making one scene fit every screen.** Earlier versions patched sizes per breakpoint and never looked right. Sizing everything from one unit derived from the window fixed it, so the desk scales as a whole.
- **Slow first paint on phones.** The welcome title only appeared once React had built the entire desk, and the font stylesheet blocked rendering. Moving the title into the HTML and loading the desk afterwards cut mobile LCP from about 5.7 s to 3.1 s.
- **Animations that looked cheap but weren't.** The bonsai was about 1,400 SVG nodes, and swaying them forced the browser to recompute layout every frame. The glow on project names animated `text-shadow`, which repaints text. Redrawing the tree as images and fading a copy of the glowing text fixed both. I learned to check what an animation costs, not just how it looks.
- **Not every optimization helps.** Adding `will-change: transform` to the desk objects made opening the résumé slower on a slow phone (712 → 952 ms), so I took it out.
- **Measuring carefully.** One benchmark ran while my disk was full, and another ran after a local server had stopped. Both gave misleading numbers. Testing old and new builds side by side, and checking the servers before every run, fixed that.

## Limitations and future work

- **Closing the laptop on a slow phone** takes about half a second to paint. Fading the Projects screen instead of animating it back to the desk would help.
- **The bonsai's animations** still cause a style recalculation every frame while other things move.
- **Testing:** no automated tests yet. Component tests for opening, closing and focus would be the first ones to add.
- **Not yet tested** on Safari, Firefox or real devices.
- **Unused code at load:** about 63 KB of the gzipped script.

## Development Transparency

I designed and architected this site, including the desk concept, the features, the visual design, the interactions and its technical direction. I used AI-assisted development tools for parts of the implementation, debugging, performance testing and documentation. I reviewed what they produced against my design and remain responsible for the site's decisions, behavior and known limitations.

## Author

Tracy Tran, Computer Science student at California State University, Fullerton (graduating May 2027).
[tracythutran.com](https://www.tracythutran.com) · [GitHub](https://github.com/enobot) · [LinkedIn](https://www.linkedin.com/in/tracythutran/)
