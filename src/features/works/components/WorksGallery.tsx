'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { LimitedProjectCover } from '@/features/works/components/LimitedProject';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import { publicWorks, type Work } from '@/features/works/data/worksData';
import { filterWorks } from '@/features/works/lib/filterWorks';
import {
  WORK_FILTER_TAGS,
  WORK_TYPE_OPTIONS,
  workTypeParser,
  workFilterParser,
} from '@/features/works/lib/workFilters';
import { FEATURED_WORK_PAGE_NAMES } from '@/features/works/data/featuredWorks';
import { cn } from '@/lib/utils';
import { AnimatePresence, m, type Transition } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { rememberWorksReturn, restoreWorksReturn } from '../lib/worksReturn';

const newestFirstWorks = [...publicWorks].reverse().sort((a, b) => {
  const aIndex = FEATURED_WORK_PAGE_NAMES.indexOf(a.pageName);
  const bIndex = FEATURED_WORK_PAGE_NAMES.indexOf(b.pageName);
  return (aIndex < 0 ? Infinity : aIndex) - (bIndex < 0 ? Infinity : bIndex);
});
const CARD_INITIAL = { opacity: 0, y: 12, scale: 0.98 };
const CARD_ANIMATE = { opacity: 1, y: 0, scale: 1 };
const CARD_EXIT = { opacity: 0, scale: 0.96 };
const CARD_TRANSITION: Transition = { duration: 0.3, ease: 'easeOut' };

function WorkCard({ work, eager }: { work: Work; eager: boolean }) {
  let previewContent = null;

  if (work.disclosure === 'limited') {
    previewContent = <LimitedProjectCover className="h-full w-full" />;
  } else if (work.imgSrc) {
    previewContent = (
      <Image
        src={`/images/works/${work.imgSrc}`}
        alt={`${work.name} 작업 미리보기`}
        fill
        loading={eager ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 100vw, 448px"
        className="object-contain transition-transform duration-500 group-hover/work:scale-105"
      />
    );
  }

  return (
    <m.article
      data-work-card={work.pageName}
      layout
      initial={CARD_INITIAL}
      animate={CARD_ANIMATE}
      exit={CARD_EXIT}
      transition={CARD_TRANSITION}
      className="min-w-0"
    >
      <GlassCard className="group/work h-full">
        <Link
          href={`/works/${work.pageName}#work-overview`}
          onNavigate={() => rememberWorksReturn(work.pageName)}
          aria-label={`${work.name} 작업 상세 보기${
            work.disclosure === 'limited' ? ', 보안상 화면 비공개' : ''
          }`}
          className="focus-visible:ring-brand-lavender flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          <div className="from-atmosphere-navy/20 relative aspect-video w-full overflow-hidden border-b border-white/10 bg-linear-to-br via-black/20 to-white/5">
            {previewContent}
            <span className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
              <ProjectTypeChip
                projectType={work.projectType}
                isFreelance={work.isFreelance}
              />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="group-hover/work:text-brand-lavender text-ink-primary line-clamp-2 text-lg leading-snug font-bold transition-colors">
                  {work.name}
                </h2>
                {work.description ? (
                  <p className="text-ink-muted mt-1 line-clamp-2 text-sm leading-relaxed break-keep">
                    {work.description}
                  </p>
                ) : null}
              </div>
              <span className="group-hover/work:border-brand-lavender/40 group-hover/work:text-brand-lavender text-ink-faint flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors">
                <ArrowUpRight size={14} />
              </span>
            </div>

            {work.role ? (
              <p className="text-ink-secondary text-xs">{work.role}</p>
            ) : null}
            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
              {work.projectType === 'business' && work.period ? (
                <span className="text-ink-muted ml-auto text-xs">
                  {work.period}
                </span>
              ) : null}
            </div>
          </div>
        </Link>

        {work.projectType === 'side' && (work.liveUrl || work.repoUrl) ? (
          <div className="absolute top-3 right-3 z-20 flex gap-1">
            {work.liveUrl ? (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.name} ${work.liveLabel ?? '사이트'} 열기`}
                className="focus-visible:ring-brand-lavender text-ink-secondary flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/70 backdrop-blur-sm hover:text-white focus-visible:ring-2"
              >
                <ExternalLink size={16} aria-hidden />
              </a>
            ) : null}
            {work.repoUrl ? (
              <a
                href={work.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.name} GitHub 열기`}
                className="focus-visible:ring-brand-lavender text-ink-secondary flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/70 backdrop-blur-sm hover:text-white focus-visible:ring-2"
              >
                <GithubIcon size={16} />
              </a>
            ) : null}
          </div>
        ) : null}
      </GlassCard>
    </m.article>
  );
}

export function WorksGallery() {
  const [filters, setFilters] = useQueryStates({
    tag: workFilterParser,
    type: workTypeParser,
  });
  const selectedTag = filters.tag;
  const filteredWorks = filterWorks(newestFirstWorks, filters);
  const clearFilters = () => setFilters({ tag: null, type: 'all' });
  useEffect(() => restoreWorksReturn(), []);
  const firstImageIndex = filteredWorks.findIndex((work) => work.imgSrc);

  function getFilterClass(isActive: boolean): string {
    return cn(
      'min-h-11 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender',
      isActive
        ? 'border-brand-lavender/35 bg-brand-deep/55 text-white'
        : 'border-white/10 bg-white/5 text-ink-muted hover:border-white/20 hover:bg-white/8 hover:text-white',
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="works-filter-header">
        <div
          role="group"
          aria-label="프로젝트 유형"
          className="works-type-filter"
        >
          {WORK_TYPE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filters.type === value}
              onClick={() => setFilters({ type: value })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <details className="group sm:hidden">
        <summary className="text-ink-secondary focus-visible:ring-brand-lavender min-h-11 cursor-pointer py-3 text-sm font-bold focus-visible:ring-2">
          기술·분야 필터 {selectedTag ? `· ${selectedTag} 적용 중` : ''}{' '}
          <span className="group-open:hidden">펼치기</span>
          <span className="hidden group-open:inline">접기</span>
        </summary>
        <FilterTags
          selectedTag={selectedTag}
          setTag={(tag) => setFilters({ tag })}
          getFilterClass={getFilterClass}
        />
      </details>
      <div className="hidden sm:block">
        <FilterTags
          selectedTag={selectedTag}
          setTag={(tag) => setFilters({ tag })}
          getFilterClass={getFilterClass}
        />
      </div>

      <p
        role="status"
        aria-live="polite"
        className="text-ink-secondary text-sm"
      >
        {filteredWorks.length}개 프로젝트 / 전체 {publicWorks.length}개
      </p>
      {filteredWorks.length > 0 ? (
        <m.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredWorks.map((work, index) => (
              <WorkCard
                key={work.pageName}
                work={work}
                eager={index === firstImageIndex}
              />
            ))}
          </AnimatePresence>
        </m.div>
      ) : (
        <div
          role="status"
          className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 text-center"
        >
          <p className="text-ink-muted text-sm">
            해당 필터에 공개된 작업이 없습니다.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="focus-visible:ring-brand-lavender text-brand-lavender min-h-11 rounded-full border border-white/10 px-4 text-sm font-bold outline-none hover:bg-white/5 focus-visible:ring-2"
          >
            전체 작업 보기
          </button>
        </div>
      )}
    </div>
  );
}

function FilterTags({
  selectedTag,
  setTag,
  getFilterClass,
}: {
  selectedTag: string | null;
  setTag: (tag: (typeof WORK_FILTER_TAGS)[number] | null) => void;
  getFilterClass: (active: boolean) => string;
}) {
  return (
    <div
      role="group"
      aria-label="기술·분야 필터"
      className="flex flex-wrap gap-1.5"
    >
      <button
        type="button"
        aria-pressed={selectedTag === null}
        onClick={() => setTag(null)}
        className={getFilterClass(selectedTag === null)}
      >
        전체 기술·분야
      </button>
      {WORK_FILTER_TAGS.map((tag) => (
        <button
          key={tag}
          type="button"
          aria-pressed={selectedTag === tag}
          onClick={() => setTag(selectedTag === tag ? null : tag)}
          className={getFilterClass(selectedTag === tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
