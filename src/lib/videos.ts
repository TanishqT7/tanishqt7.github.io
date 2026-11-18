import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryKey } from './taxonomy';

export { categories } from './taxonomy';
export type { CategoryKey } from './taxonomy';
export type Video = CollectionEntry<'videos'>;

// Max videos per section on the home page.
export const HOME_COUNT = 3;

// Prefixes the base path (if any) so links work in dev and production.
export const url = (path = '/') => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

export async function getVideos(): Promise<Video[]> {
  const all = await getCollection('videos');
  return all.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));
}

export const inCategory = (videos: Video[], key: CategoryKey) =>
  videos.filter((v) => v.data.categories.includes(key));

const slot = (v: Video, key: CategoryKey): number | undefined => v.data.homepage[key];
const picked = (items: Video[], key: CategoryKey) =>
  items.filter((v) => slot(v, key) !== undefined).sort((a, b) => slot(a, key)! - slot(b, key)!);

// Home page: the videos you gave a slot, in slot order (max 3).
// A category with no slots at all falls back to its newest videos so a section is never empty.
export function homepagePicks(items: Video[], key: CategoryKey) {
  const p = picked(items, key);
  return (p.length ? p : items).slice(0, HOME_COUNT);
}

// "See all" page: your picks first in slot order, then everything else newest first.
export function seeAllOrder(items: Video[], key: CategoryKey) {
  return [...picked(items, key), ...items.filter((v) => slot(v, key) === undefined)];
}