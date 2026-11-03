import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reads the existing posts in place. Migrating them into src/ is a separate task.
const posts = defineCollection({
  loader: glob({ pattern: ['*.md', '*/index.md'], base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    lang: z.enum(['nb', 'en']).default('en'),
  }),
});

export const collections = { posts };
