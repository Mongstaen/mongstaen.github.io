// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mongstad.dev',
  output: 'static',
  i18n: {
    locales: ['nb', 'en'],
    defaultLocale: 'nb',
    routing: { prefixDefaultLocale: false },
  },
});
