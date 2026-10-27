# tracythutran.com

My interactive résumé, at **[tracythutran.com](https://www.tracythutran.com)**. The page is a wooden desk: pick up the résumé, the laptop, the phone or the name tag and it lifts toward you and opens into something you can read.

| On the desk | Opens into |
|---|---|
| Résumé paper | The full résumé. Project names open their walkthroughs. |
| Laptop | Projects, with links and walkthroughs |
| Phone | Contact: email, LinkedIn, GitHub |
| Name tag | About me |

The project walkthroughs run in the browser:

- **Tracer:** freeze the screen, drag a box around an error, and get an example answer.
- **FITTMM:** recorded clips of the web app and the Android progress.
- **BLU:** a demo with sample players.
- **Shouldn't Wouldn't:** the Chrome extension's reminders and popup on sample forms.

## Built with

- **React 19 and Vite 8**
- **Motion** for the lift animations, which run as layout animations so each object grows from where it sits on the desk
- **react-mockframe** for the MacBook and iPhone frames
- **Plain CSS** with container-query units, so the desk scales as one scene from a phone to a wide monitor
- **Vercel** hosting, with Cloudflare DNS for the domain

## Performance

The desk loads the first screen from static HTML, builds the 3D scene after the first paint, and keeps its idle animations on the GPU compositor. Compared side by side with the previous version:

| | Before | After |
|---|---|---|
| Lighthouse mobile (live site) | 49 | 84 |
| Largest contentful paint, mobile (live site) | 5.7 s | 3.1 s |
| Lighthouse desktop (live site) | 85 | 100 |
| Page weight | 826 KB | 641 KB |
| Main-thread work per interaction | | 18–48% less |

Methods, raw numbers and what's still slow are in [PERFORMANCE_AUDIT.md](PERFORMANCE_AUDIT.md).

## Accessibility

- Every desk object is a real button.
- Opened objects and dialogs keep keyboard focus inside them, and Escape closes them.
- Focus returns to whatever opened them.
- `prefers-reduced-motion` turns the lifting, swaying and glowing off.

## Where things are

| Path | What it holds |
|---|---|
| `src/data.js` | All résumé and About text |
| `src/desk/projectDetails.js` | Project links and status lines |
| `src/App.jsx` | The desk: which object is open, focus handling, loading order |
| `src/desk/` | The desk objects (`ResumePaper`, `DeskDevices`, `NameTag`, `DeskDecor`) and their styles in `Desk.css` |
| `src/*Modal.jsx` | The project walkthroughs, loaded only when opened |
| `public/` | Photos and the FITTMM clips |

## Run it

```bash
npm install
npm run dev
```

Production build, written to `dist/`:

```bash
npm run build
npm run preview
```

## Deploy

Every push to `main` deploys to Vercel. `.github/workflows/pages.yml` also publishes the same build to GitHub Pages. Asset paths are relative, so `dist/` works at a domain root or a subpath on any static host.
