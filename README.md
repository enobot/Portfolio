# CS portfolio

A one-page portfolio you can edit and deploy. All visible content lives in `src/data.js`.

## Edit

Open `src/data.js` and replace the sample name, projects, skills, and links. Leave `repo`, `demo`, or `resume` as `""` until you have a URL — those links stay hidden.

Add a resume by putting `resume.pdf` in `public/` and setting `resume` to `"./resume.pdf"`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site is written to `dist/`. Asset paths are relative, so that folder can be hosted at a domain root or a project subpath.

## Deploy

**Netlify.** Push the repo and let Netlify use `netlify.toml` (`npm run build`, publish `dist`). Or drag the `dist` folder onto the Netlify drop page.

**GitHub Pages.** Push the `main` branch. In the repo, open Settings → Pages and set Source to GitHub Actions. `.github/workflows/pages.yml` builds and deploys on every push to `main`.

**Anywhere else.** Upload the contents of `dist/` to any static host.
