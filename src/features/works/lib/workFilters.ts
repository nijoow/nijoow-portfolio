import { parseAsStringLiteral } from 'nuqs';

export const WORK_FILTER_TAGS = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'iOS',
  'AI 활용 개발',
  'Business Project',
  'Side Project',
] as const;

export const workFilterParser = parseAsStringLiteral(
  WORK_FILTER_TAGS,
).withOptions({
  history: 'replace',
});
