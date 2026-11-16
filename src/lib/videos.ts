import { getCollection, type CollectionEntry } from 'astro:content';

export type Video = CollectionEntry<'videos'>;

// Order here = order of sections on the page and in the nav.
export const categories = [
  { key: 'talking-head', label: 'Talking head' },
  { key: 'motion-graphics', label: 'Motion graphics' },
  { key: 'drone', label: 'Drone' },
] as const;

export type CategoryKey = (typeof categories)[number]['key'];

// How many videos each section shows on the home page.
export const FEATURED_COUNT = 3;

// Prefixes the GitHub Pages base path ('/Portfolio') so links work in dev and production.
export const url = (path = '/') => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

export async function getVideos(): Promise<Video[]> {
  const all = await getCollection('videos');
  return all.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));
}

export const inCategory = (videos: Video[], key: CategoryKey) =>
  videos.filter((v) => v.data.categories.includes(key));

// Featured videos first, then newest, capped at n. If you feature 3, you get exactly those 3.
export function featuredFirst(items: Video[], n = FEATURED_COUNT) {
  return [...items.filter((v) => v.data.featured), ...items.filter((v) => !v.data.featured)].slice(0, n);
}