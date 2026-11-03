# mongstad.dev

Personal site and blog for Thomas Mongstad, built with [Astro](https://astro.build).
Norwegian at `/`, English at `/en/`.

```sh
npm install
npm run dev     # local dev server
npm run build   # static build to dist/
```

- Posts: `content/posts` (Markdown, read by the `posts` collection in `src/content.config.ts`)
- UI strings: `src/i18n/ui.ts`
- Deploys to GitHub Pages on push to `main` (`.github/workflows/deploy.yml`)
