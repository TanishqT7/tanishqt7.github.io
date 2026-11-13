import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    categories: z.array(z.enum(['talking-head', 'motion-graphics', 'drone'])).min(1),
    featured: z.boolean().default(false),
    tools: z.array(z.string()).default([]),
  }),
});

export const collections = { videos };