// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mongstad.dev',
  output: 'static',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'nb', locales: { nb: 'nb-NO', en: 'en' } },
      // Skip redirect stubs for old Hugo URLs.
      filter: (page) => !/mongstad\.dev\/(\d{4}|posts|tags)\//.test(page),
    }),
  ],
  redirects: { '/posts': '/blog/', '/tags': '/en/blog/' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  i18n: {
    locales: ['nb', 'en'],
    defaultLocale: 'nb',
    routing: { prefixDefaultLocale: false },
  },
});
