import Eyebrow from '@/components/ui/Eyebrow';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import type { Work } from '@/features/works/data/worksData';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface WorksBreadCrumbProps {
  work: Work | undefined;
  slug: string;
}

function DisclosureNotice({ work }: { work: Work | undefined }) {
  if (work?.disclosure !== 'limited') return null;

  return (
    <p className="text-ink-muted mt-1 text-sm">
      보안상 화면과 내부 자료는 공개하지 않습니다.
    </p>
  );
}

function PrimaryWorkLink({ work }: { work: Work | undefined }) {
  if (!work?.liveUrl || work.disclosure === 'limited') return null;
  const label = work.liveLabel ?? '사이트 바로가기';

  return (
    <Link
      href={work.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${work.name} ${label} (새 창)`}
      className="bg-brand-lavender text-surface-ink hover:bg-brand-lavender/90 focus-visible:ring-brand-lavender focus-visible:ring-offset-surface-ink mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-base font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-4 sm:w-fit"
    >
      {label}
      <ExternalLink aria-hidden size={18} />
    </Link>
  );
}

function WorksBreadCrumb({ work, slug }: WorksBreadCrumbProps) {
  return (
    <div className="frosted-glass mb-6 flex w-full flex-col gap-1.5 rounded-3xl border p-5 sm:p-7">
      <Eyebrow className="flex items-center gap-1">
        <Link
          href="/works"
          className="focus-visible:ring-brand-lavender rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
        >
          Works
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink-muted normal-case">{slug}</span>
      </Eyebrow>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-3xl font-bold break-keep sm:text-4xl">
          {work?.name ?? slug}
        </h1>
        {work?.period && (
          <span className="text-ink-muted text-sm">{work.period}</span>
        )}
      </div>
      {work?.description ? (
        <p className="text-ink-secondary mt-1 max-w-3xl text-base leading-relaxed break-keep">
          {work.description}
        </p>
      ) : null}
      {work?.role || work?.organization ? (
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {work.role ? (
            <div className="flex gap-2">
              <dt className="text-ink-muted">역할</dt>
              <dd>{work.role}</dd>
            </div>
          ) : null}
          {work.organization ? (
            <div className="flex gap-2">
              <dt className="text-ink-muted">소속·의뢰</dt>
              <dd>{work.organization}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <DisclosureNotice work={work} />
      {work ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <ProjectTypeChip
            projectType={work.projectType}
            isFreelance={work.isFreelance}
          />
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <PrimaryWorkLink work={work} />
    </div>
  );
}

export default WorksBreadCrumb;
