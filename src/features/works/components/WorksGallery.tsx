'use client';

import GlassCard from '@/components/Motion/GlassCard';
import {
  LimitedProjectCover,
  ProjectDisclosureChip,
} from '@/features/works/components/LimitedProject';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import { publicWorks, type Work } from '@/features/works/data/worksData';
import { filterWorks } from '@/features/works/lib/filterWorks';
import {
  WORK_FILTER_TAGS,
  WORK_TYPE_OPTIONS,
  workTypeParser,
  featuredParser,
  workFilterParser,
} from '@/features/works/lib/workFilters';
import { cn } from '@/lib/utils';
import { AnimatePresence, m, type Transition } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryStates } from 'nuqs';

const newestFirstWorks = [...publicWorks].reverse();
const CARD_INITIAL = { opacity: 0, y: 12, scale: 0.98 };
const CARD_ANIMATE = { opacity: 1, y: 0, scale: 1 };
const CARD_EXIT = { opacity: 0, scale: 0.96 };
const CARD_TRANSITION: Transition = { duration: 0.3, ease: 'easeOut' };

function WorkCard({ work, eager }: { work: Work; eager: boolean }) {
  let previewContent = null;

  if (work.disclosure === 'limited') {
    previewContent = (
      <LimitedProjectCover pageName={work.pageName} className="h-full w-full" />
    );
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
          aria-label={`${work.name} 작업 상세 보기${
            work.disclosure === 'limited' ? ', 보안상 화면 비공개' : ''
          }`}
          className="focus-visible:ring-brand-lavender flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          <div className="from-atmosphere-navy/20 relative aspect-video w-full overflow-hidden border-b border-white/10 bg-linear-to-br via-black/20 to-white/5">
            {previewContent}
            <span className="absolute top-3 left-3">
              <ProjectTypeChip
                projectType={work.projectType}
                isFreelance={work.isFreelance}
              />
            </span>
            {work.disclosure === 'limited' ? (
              <span className="absolute right-3 bottom-3">
                <ProjectDisclosureChip />
              </span>
            ) : null}
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
              {work.period ? (
                <span className="text-ink-muted ml-auto text-xs">
                  {work.period}
                </span>
              ) : null}
            </div>
          </div>
        </Link>

        {work.liveUrl ? (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${work.name} 라이브 사이트 열기`}
            className="focus-visible:ring-brand-lavender text-ink-secondary absolute top-3 right-3 z-20 flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/55 opacity-100 backdrop-blur-sm transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none sm:opacity-0 sm:group-focus-within/work:opacity-100 sm:group-hover/work:opacity-100"
          >
            <ExternalLink size={15} />
          </a>
        ) : null}
      </GlassCard>
    </m.article>
  );
}

export function WorksGallery() {
  const [filters, setFilters] = useQueryStates({
    tag: workFilterParser,
    type: workTypeParser,
    featured: featuredParser,
  });
  const selectedTag = filters.tag;
  const filteredWorks = filterWorks(newestFirstWorks, filters);
  const clearFilters = () =>
    setFilters({ tag: null, type: 'all', featured: false });
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
        <label className="works-featured-toggle">
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(event) => setFilters({ featured: event.target.checked })}
          />
          <span>홈에 소개한 작업만 보기</span>
        </label>
      </div>
      <div
        role="group"
        aria-label="기술·분야 필터"
        className="flex flex-wrap gap-1.5"
      >
        <button
          type="button"
          aria-pressed={selectedTag === null}
          onClick={() => setFilters({ tag: null })}
          className={getFilterClass(selectedTag === null)}
        >
          전체 기술·분야
        </button>
        {WORK_FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={selectedTag === tag}
            onClick={() =>
              setFilters({ tag: selectedTag === tag ? null : tag })
            }
            className={getFilterClass(selectedTag === tag)}
          >
            {tag}
          </button>
        ))}
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
