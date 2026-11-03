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
    'home.lede': 'Jeg hjelper radiostasjoner og små bedrifter med teknikken bak.',
    'home.intro': 'Jeg har jobbet mye med radio- og sendeautomasjon: studioer, avvikling, lydruting og alt som skal gå av seg selv klokka tre om natta. Den samme nysgjerrigheten bruker jeg på nettsider, små systemer og vanlig IT.',
    'home.work.h': 'Hva jeg gjør',
    'home.work.radio.t': 'Radio og kringkasting',
    'home.work.radio.d': 'Rådgivning og oppsett av avviklingssystemer som mAirlist, studioteknikk, skript og integrasjoner som sparer deg for manuelt arbeid.',
    'home.work.web.t': 'Web og IT',
    'home.work.web.d': 'Programmering av nettsider og små verktøy, og praktisk IT-hjelp – nettverk, DNS og maskinoppsett.',
    'home.work.garden': 'Ved siden av tar jeg også litt landskapspleie.',
    'home.posts.h': 'Siste innlegg',
    'home.posts.all': 'Alle innlegg',
    'home.contact.h': 'Kontakt',
    'home.contact.p': 'Lurer du på noe, eller har du et prosjekt? Send meg en e-post på',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'site.description': 'Consulting and software development.',
    'footer.org': 'Org. no.',
    'home.lede': 'I help radio stations and small businesses with the tech behind the scenes.',
    'home.intro': 'Much of my work has been in radio and broadcast automation: studios, playout, audio routing and everything that has to run on its own at three in the morning. I bring the same curiosity to websites, small systems and everyday IT.',
    'home.work.h': 'What I do',
    'home.work.radio.t': 'Radio and broadcast',
    'home.work.radio.d': 'Advice on and setup of playout systems like mAirlist, studio tech, scripts and integrations that save you manual work.',
    'home.work.web.t': 'Web and IT',
    'home.work.web.d': 'Programming websites and small tools, plus practical IT help: networking, DNS and machine setup.',
    'home.work.garden': 'On the side, I also take on some landscaping work.',
    'home.posts.h': 'Latest posts',
    'home.posts.all': 'All posts',
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
