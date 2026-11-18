import content from './generalResume.json';
import { getWork } from '@/features/works/data/worksData';

export const resumeContent = content;
export type ResumeCareer = (typeof content.careers)[number];
export type ResumeProject = ResumeCareer['projects'][number];
export type ResumeRichText = readonly { text: string; strong?: boolean }[];

export function getResumeProjectHref(slug: string) {
  const work = getWork(slug);
  return work?.status === 'published' ? `/works/${work.pageName}` : undefined;
}
