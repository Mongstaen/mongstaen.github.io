import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { latestPosts, postUrl, postDescription } from './posts';

export async function feed(context: APIContext) {
  const posts = await latestPosts();
  return rss({
    title: 'Thomas Mongstad',
    description: 'Notes on radio automation, audio, the web and IT.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: postDescription(p),
      link: postUrl(p),
      categories: p.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
