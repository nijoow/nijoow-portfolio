import type { ProjectType, Work } from '@/features/works/data/worksData';

export function filterWorks(
  works: readonly Work[],
  filters: { type: ProjectType | 'all'; tag: string | null },
): readonly Work[] {
  return works.filter(
    (work) =>
      (filters.type === 'all' || work.projectType === filters.type) &&
      (filters.tag === null || work.tags.includes(filters.tag)),
  );
}
