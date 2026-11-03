// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mongstad.dev',
  output: 'static',
  redirects: { '/posts': '/blog/' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  i18n: {
    locales: ['nb', 'en'],
    defaultLocale: 'nb',
    routing: { prefixDefaultLocale: false },
  },
});
