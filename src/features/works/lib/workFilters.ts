import { parseAsBoolean, parseAsStringLiteral } from 'nuqs';

export const WORK_FILTER_TAGS = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'iOS',
] as const;
export const WORK_TYPE_OPTIONS = [
  { value: 'all', label: 'All Projects' },
  { value: 'business', label: 'Business Projects' },
  { value: 'side', label: 'Side Projects' },
] as const;
export const workFilterParser = parseAsStringLiteral(
  WORK_FILTER_TAGS,
).withOptions({ history: 'replace' });
export const workTypeParser = parseAsStringLiteral([
  'all',
  'business',
  'side',
] as const)
  .withDefault('all')
  .withOptions({ history: 'replace' });
export const featuredParser = parseAsBoolean
  .withDefault(false)
  .withOptions({ history: 'replace' });
