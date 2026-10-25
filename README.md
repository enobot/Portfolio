# Tracy Tran — resume site

The homepage is a single resume page. Copy lives in `src/data.js`.

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

**Netlify.** Push the repo and let Netlify use `netlify.toml` (`npm run build`, publish `dist`).

**GitHub Pages.** Push the `main` branch. In the repo, open Settings → Pages and set Source to GitHub Actions. `.github/workflows/pages.yml` builds and deploys on every push to `main`.

**Anywhere else.** Upload the contents of `dist/` to any static host.
