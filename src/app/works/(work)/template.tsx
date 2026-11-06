'use client';

import Section from '@/components/Section/Section';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import { getWork, publicWorks } from '@/features/works/data/worksData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore, type ReactNode } from 'react';
import { getWorksReturn } from '@/features/works/lib/worksReturn';
import WorksBreadCrumb from '../_container/WorksBreadCrumb';

const orderedWorks = [...publicWorks].reverse();
const subscribeToReturn = () => () => {};
const getServerReturn = () => null;

const getAdjacentWorks = (slug: string) => {
  const currentIndex = orderedWorks.findIndex((item) => item.pageName === slug);
  if (currentIndex < 0) {
    return { prevWork: null, nextWork: null };
  }

  return {
    prevWork: currentIndex > 0 ? orderedWorks[currentIndex - 1] : null,
    nextWork:
      currentIndex < orderedWorks.length - 1
        ? orderedWorks[currentIndex + 1]
        : null,
  };
};

const AdjacentWorkCards = ({ slug }: { slug: string }) => {
  const { prevWork, nextWork } = getAdjacentWorks(slug);
  if (!prevWork && !nextWork) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prevWork ? (
        <Link
          href={`/works/${prevWork.pageName}#work-overview`}
          className="focus-visible:ring-brand-lavender group flex min-h-28 flex-col justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors outline-none hover:border-white/25 hover:bg-white/[0.06] focus-visible:ring-2"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-ink-muted inline-flex items-center gap-1.5 text-xs font-semibold">
              <ArrowLeft
                size={14}
                aria-hidden
                className="transition-transform group-hover:-translate-x-0.5"
              />
              이전 작업
            </span>
            <ProjectTypeChip
              projectType={prevWork.projectType}
              isFreelance={prevWork.isFreelance}
            />
          </div>
          <div>
            <p className="group-hover:text-brand-lavender text-ink-primary font-bold transition-colors">
              {prevWork.name}
            </p>
            {prevWork.description ? (
              <p className="text-ink-muted mt-0.5 line-clamp-1 text-xs">
                {prevWork.description}
              </p>
            ) : null}
          </div>
        </Link>
      ) : (
        <div
          role="group"
          aria-label="이전 작업 없음"
          aria-disabled="true"
          className="min-h-28 rounded-2xl border border-white/8 bg-white/[0.015]"
        />
      )}

      {nextWork ? (
        <Link
          href={`/works/${nextWork.pageName}#work-overview`}
          className="focus-visible:ring-brand-lavender group flex min-h-28 flex-col justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors outline-none hover:border-white/25 hover:bg-white/[0.06] focus-visible:ring-2 sm:items-end sm:text-right"
        >
          <div className="flex w-full items-center justify-between gap-2 sm:flex-row-reverse">
            <span className="text-ink-muted inline-flex items-center gap-1.5 text-xs font-semibold">
              다음 작업
              <ArrowRight
                size={14}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
            <ProjectTypeChip
              projectType={nextWork.projectType}
              isFreelance={nextWork.isFreelance}
            />
          </div>
          <div>
            <p className="group-hover:text-brand-lavender text-ink-primary font-bold transition-colors">
              {nextWork.name}
            </p>
            {nextWork.description ? (
              <p className="text-ink-muted mt-0.5 line-clamp-1 text-xs">
                {nextWork.description}
              </p>
            ) : null}
          </div>
        </Link>
      ) : (
        <div
          role="group"
          aria-label="다음 작업 없음"
          aria-disabled="true"
          className="min-h-28 rounded-2xl border border-white/8 bg-white/[0.015]"
        />
      )}
    </div>
  );
};

export default function Template({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const slug = pathName.split('/works/')[1] ?? '';
  const work = getWork(slug);
  const returnHref = useSyncExternalStore(
    subscribeToReturn,
    () => getWorksReturn(slug),
    getServerReturn,
  );

  return (
    <div>
      <div id="work-overview" tabIndex={-1} className="outline-none">
        {returnHref ? (
          <Link
            href={returnHref}
            scroll={false}
            className="text-brand-lavender focus-visible:ring-brand-lavender mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold focus-visible:ring-2"
          >
            <ArrowLeft size={16} aria-hidden /> 목록으로 돌아가기
          </Link>
        ) : null}
        <Section>
          <WorksBreadCrumb work={work} slug={slug} />
        </Section>
      </div>
      <div className="work-detail-body bg-surface-ink/80 rounded-3xl p-5 sm:p-7">
        <Section alignItems="items-start">{children}</Section>
      </div>
      <nav
        aria-label="다른 작업 탐색"
        className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8"
      >
        <AdjacentWorkCards slug={slug} />
        <Link
          href={returnHref ?? '/works'}
          scroll={returnHref ? false : undefined}
          className="focus-visible:ring-brand-lavender text-ink-secondary inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-bold outline-none hover:text-white focus-visible:ring-2"
        >
          <ArrowLeft size={16} aria-hidden />
          목록으로 돌아가기
        </Link>
      </nav>
    </div>
  );
}
