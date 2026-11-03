export const languages = { nb: 'Norsk', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'nb';

export const ui = {
  nb: {
    'nav.home': 'Hjem',
    'nav.about': 'Om',
    'nav.blog': 'Blogg',
    'site.description': 'Thomas Mongstad – rådgivning og programmering innen radio, kringkasting, web og IT.',
    'footer.org': 'Org.nr.',
    'home.lede': 'Jeg hjelper radiostasjoner og små bedrifter med teknikken bak.',
    'home.intro': 'Jeg har jobbet mye med radio- og sendeautomasjon: studioer, avvikling, lydruting og alt som skal gå av seg selv klokka tre om natta. Den samme nysgjerrigheten bruker jeg på nettsider, små systemer og vanlig IT.',
    'home.work.h': 'Hva jeg gjør',
    'home.work.radio.t': 'Radio og kringkasting',
    'home.work.radio.d': 'Rådgivning og oppsett av avviklingssystemer som mAirlist, studioteknikk, skript og integrasjoner som sparer deg for manuelt arbeid.',
    'home.work.web.t': 'Web og IT',
    'home.work.web.d': 'Programmering av nettsider og små verktøy, og praktisk IT-hjelp – nettverk, DNS og maskinoppsett.',
    'home.posts.h': 'Siste innlegg',
    'home.posts.all': 'Alle innlegg',
    'blog.title': 'Blogg',
    'blog.intro': 'Notater om radioautomasjon, lyd, nett og det jeg ellers holder på med. Innleggene er på engelsk.',
    'blog.back': 'Alle innlegg',
    '404.title': 'Fant ikke siden',
    '404.body': 'Siden du lette etter finnes ikke, eller den har flyttet.',
    '404.home': 'Til forsiden',
    '404.blog': 'Se alle innlegg',
    'home.contact.h': 'Kontakt',
    'home.contact.p': 'Lurer du på noe, eller har du et prosjekt? Send meg en e-post på',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'site.description': 'Thomas Mongstad – consulting and programming for radio, broadcast, web and IT.',
    'footer.org': 'Org. no.',
    'home.lede': 'I help radio stations and small businesses with the tech behind the scenes.',
    'home.intro': 'Much of my work has been in radio and broadcast automation: studios, playout, audio routing and everything that has to run on its own at three in the morning. I bring the same curiosity to websites, small systems and everyday IT.',
    'home.work.h': 'What I do',
    'home.work.radio.t': 'Radio and broadcast',
    'home.work.radio.d': 'Advice on and setup of playout systems like mAirlist, studio tech, scripts and integrations that save you manual work.',
    'home.work.web.t': 'Web and IT',
    'home.work.web.d': 'Programming websites and small tools, plus practical IT help: networking, DNS and machine setup.',
    'home.posts.h': 'Latest posts',
    'home.posts.all': 'All posts',
    'blog.title': 'Blog',
    'blog.intro': 'Notes on radio automation, audio, the web and whatever else I’m working on.',
    'blog.back': 'All posts',
    '404.title': 'Page not found',
    '404.body': 'The page you were looking for doesn’t exist, or it has moved.',
    '404.home': 'Go to the front page',
    '404.blog': 'See all posts',
    'home.contact.h': 'Contact',
    'home.contact.p': 'Have a question or a project? Email me at',
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
