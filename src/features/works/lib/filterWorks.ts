import type { ProjectType, Work } from '@/features/works/data/worksData';
import { FEATURED_WORK_PAGE_NAMES } from '@/features/works/data/featuredWorks';

export function filterWorks(
  works: readonly Work[],
  filters: { type: ProjectType | 'all'; tag: string | null; featured: boolean },
): readonly Work[] {
  return works.filter(
    (work) =>
      (filters.type === 'all' || work.projectType === filters.type) &&
      (filters.tag === null || work.tags.includes(filters.tag)) &&
      (!filters.featured || FEATURED_WORK_PAGE_NAMES.includes(work.pageName)),
  );
}
