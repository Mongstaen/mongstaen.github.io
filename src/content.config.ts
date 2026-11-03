import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reads the existing posts in place. Migrating them into src/ is a separate task.
const posts = defineCollection({
  loader: glob({ pattern: ['*.md', '*/index.md'], base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    // Hugo files sometimes hold an empty `-` entry; drop those.
    tags: z.array(z.string().nullable()).nullish().transform((t) => (t ?? []).filter((x): x is string => !!x?.trim())),
    lang: z.enum(['nb', 'en']).default('en'),
  }),
});

export const collections = { posts };
