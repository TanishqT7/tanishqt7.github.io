// Single source of truth for sections and edit types.
// Add a category here (and it appears in the schema, nav and pages automatically).

export const categories = [
  { key: 'talking-head', label: 'Talking head', color: '#6aa0e8' },
  { key: 'motion-graphics', label: 'Motion graphics', color: '#b58cf0' },
  { key: 'drone', label: 'Drone', color: '#58c29b' },
  { key: 'skit', label: 'Skit', color: '#f176e7' },
  { key: 'slideshow', label: 'Slideshow', color: '#e9f176' },
] as const;

export type CategoryKey = (typeof categories)[number]['key'];

// What a video's edit includes. Only these exact strings are allowed in a video's `edits`.
export const EDIT_TYPES = [
  'Cuts and pacing',
  'Green screen',
  '3D background',
  'Color correction',
  'B-roll',
  'Dynamic zooms',
  'Text animation',
  'Motion graphics',
  'Sound design',
  'Compositing',
  'Drone',
  'Transitions',
  'Tracking',
] as const;