import Eyebrow from '@/components/ui/Eyebrow';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import { publicWorks, type Work } from '@/features/works/data/worksData';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface WorksBreadCrumbProps {
  work: Work | undefined;
  slug: string;
}

const orderedWorks = [...publicWorks].reverse();

const PrimaryWorkLink = ({ work }: { work: Work | undefined }) => {
  if (!work?.liveUrl || work.disclosure === 'limited') return null;
  const label = work.liveLabel ?? '사이트 바로가기';

  return (
    <Link
      href={work.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${work.name} ${label} (새 창)`}
      className="bg-brand-lavender text-surface-ink hover:bg-brand-lavender/90 focus-visible:ring-brand-lavender focus-visible:ring-offset-surface-ink inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-4 sm:w-fit"
    >
      {label}
      <ExternalLink aria-hidden size={16} />
    </Link>
  );
};

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

const WorkTopBar = ({ title, slug }: { title: string; slug: string }) => {
  const { prevWork, nextWork } = getAdjacentWorks(slug);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
      <Eyebrow className="flex items-center gap-1.5">
        <Link
          href="/works"
          className="focus-visible:ring-brand-lavender text-ink-secondary rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
        >
          Works
        </Link>
        <ChevronRight size={12} aria-hidden className="text-ink-faint" />
        <span className="text-ink-muted normal-case">{title}</span>
      </Eyebrow>

      {prevWork || nextWork ? (
        <div
          aria-label="인접 작업 바로 이동"
          className="flex items-center gap-1.5"
        >
          {prevWork ? (
            <Link
              href={`/works/${prevWork.pageName}#work-overview`}
              title={`이전 작업: ${prevWork.name}`}
              className="focus-visible:ring-brand-lavender text-ink-secondary inline-flex min-h-8 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium transition-colors outline-none hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:ring-2"
            >
              <ChevronLeft size={13} aria-hidden />
              <span>이전 작업</span>
            </Link>
          ) : null}
          {nextWork ? (
            <Link
              href={`/works/${nextWork.pageName}#work-overview`}
              title={`다음 작업: ${nextWork.name}`}
              className="focus-visible:ring-brand-lavender text-ink-secondary inline-flex min-h-8 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium transition-colors outline-none hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:ring-2"
            >
              <span>다음 작업</span>
              <ChevronRight size={13} aria-hidden />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const WorkHeaderBadges = ({ work }: { work: Work | undefined }) => {
  if (!work) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ProjectTypeChip
        projectType={work.projectType}
        isFreelance={work.isFreelance}
      />
    </div>
  );
};

const WorkMetaGrid = ({ work }: { work: Work | undefined }) => {
  if (!work) return null;
  const period = work.projectType === 'business' ? work.period : undefined;
  const items = [
    { label: '담당 역할', value: work.role },
    { label: '소속 · 의뢰', value: work.organization },
    { label: '진행 기간', value: period },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value),
  );

  if (items.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4 text-sm sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <dt className="text-ink-faint text-xs font-medium">{item.label}</dt>
          <dd className="text-ink-primary font-semibold break-keep">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

const WorkFooterBar = ({ work }: { work: Work | undefined }) => {
  if (!work || (work.tags.length === 0 && !work.liveUrl)) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
      <div
        aria-label="사용 분야 태그"
        className="flex flex-wrap items-center gap-1.5"
      >
        {work.tags.map((tag) => (
          <span
            key={tag}
            className="text-ink-secondary rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <PrimaryWorkLink work={work} />
    </div>
  );
};

const WorksBreadCrumb = ({ work, slug }: WorksBreadCrumbProps) => {
  const title = work?.name ?? slug;

  return (
    <div className="mb-6 flex w-full flex-col gap-3">
      <WorkTopBar title={title} slug={slug} />

      <div className="frosted-glass flex w-full flex-col gap-4 rounded-3xl border p-5 sm:p-7">
        <WorkHeaderBadges work={work} />

        <div className="flex flex-col gap-2">
          <h1 className="text-ink-primary text-2xl font-bold tracking-tight break-keep sm:text-4xl">
            {title}
          </h1>
          {work?.description ? (
            <p className="text-ink-primary/90 max-w-3xl text-base leading-relaxed font-medium break-keep sm:text-[17px]">
              {work.description}
            </p>
          ) : null}
        </div>

        <WorkMetaGrid work={work} />
        <WorkFooterBar work={work} />
      </div>
    </div>
  );
};

export default WorksBreadCrumb;
