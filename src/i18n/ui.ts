export const languages = { nb: 'Norsk', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'nb';

export const ui = {
  nb: {
    'nav.home': 'Hjem',
    'nav.about': 'Om',
    'nav.blog': 'Blogg',
    'site.description': 'Rådgivning og programmering.',
    'footer.org': 'Org.nr.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'site.description': 'Consulting and software development.',
    'footer.org': 'Org. no.',
  },
} as const;

export type UIKey = keyof (typeof ui)['nb'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Prefix a path for the given language. */
export function localizePath(path: string, lang: Lang) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** Strip a language prefix from a pathname. */
export function stripLang(pathname: string) {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}
