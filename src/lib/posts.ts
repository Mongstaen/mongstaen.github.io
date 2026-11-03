import { getCollection, type CollectionEntry } from 'astro:content';
import { localizePath } from '../i18n/ui';

export type Post = CollectionEntry<'posts'>;

export async function latestPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** A post lives under its own language: English posts at /en/blog/<id>/. */
export function postUrl(p: Post) {
  return localizePath(`/blog/${legacySlug(p)}/`, p.data.lang);
}

/** Hugo's old permalink was /:year/:title/ with the title urlized. */
export function legacySlug(p: Post) {
  return p.data.title.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-');
}

export const dateFormat = (lang: 'nb' | 'en') =>
  new Intl.DateTimeFormat(lang === 'nb' ? 'nb-NO' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const tagSlug = (tag: string) => tag.toLowerCase().trim().replace(/\s+/g, '-');

/** All tags with their display name (first spelling seen) and posts. */
export async function allTags() {
  const map = new Map<string, { name: string; posts: Post[] }>();
  for (const p of await latestPosts()) {
    for (const tag of p.data.tags) {
      const key = tagSlug(tag);
      if (!map.has(key)) map.set(key, { name: tag, posts: [] });
      map.get(key)!.posts.push(p);
    }
  }
  return [...map.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name));
}

export const postDescription = (p: Post) => p.data.description || p.data.summary || undefined;
