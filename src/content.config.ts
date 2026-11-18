import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categories, EDIT_TYPES, type CategoryKey } from './lib/taxonomy';

const categoryKeys = categories.map((c) => c.key) as unknown as [CategoryKey, ...CategoryKey[]];

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z
    .object({
      title: z.string(),
      youtubeId: z.string(),
      // Which "see all" pages this video appears on.
      categories: z.array(z.enum(categoryKeys)).min(1),
      // What the edit includes (shown as tags on the card).
      edits: z.array(z.enum(EDIT_TYPES)).default([]),
      // Home page slot per category: 1 = first. Leave a category out to keep it off the home page.
      homepage: z.record(z.string(), z.number().int().positive()).default({}),
      // Upload date. Newest first wherever order isn't set by `homepage`.
      date: z.coerce.date().optional(),
    })
    .refine((d) => Object.keys(d.homepage).every((k) => (d.categories as string[]).includes(k)), {
      message: '`homepage` can only use categories that are listed in `categories`',
      path: ['homepage'],
    }),
});

export const collections = { videos };