import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import {
  LimitedProjectCover,
  ProjectDisclosureChip,
} from '@/features/works/components/LimitedProject';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import type { Work } from '@/features/works/data/worksData';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SelectedWorksProps {
  works: readonly Work[];
}

function SelectedWorkCard({ work }: { work: Work }) {
  let previewContent = null;

  if (work.disclosure === 'limited') {
    previewContent = (
      <LimitedProjectCover pageName={work.pageName} className="h-full w-full" />
    );
  } else if (work.imgSrc) {
    previewContent = (
      <>
        <Image
          src={`/images/works/${work.imgSrc}`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 416px"
          className="scale-110 object-cover opacity-25 blur-xl"
        />
        <Image
          src={`/images/works/${work.imgSrc}`}
          alt={`${work.name} 작업 미리보기`}
          fill
          sizes="(max-width: 768px) 100vw, 416px"
          className="object-contain transition-transform duration-500 group-hover/work:scale-105"
        />
      </>
    );
  }

  return (
    <GlassCard className="group/work h-full">
      <Link
        href={`/works/${work.pageName}#work-overview`}
        aria-label={`${work.name} 작업 상세 보기${
          work.disclosure === 'limited' ? ', 보안상 화면 비공개' : ''
        }`}
        className="focus-visible:ring-brand-lavender flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
      >
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black/30">
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

        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="group-hover/work:text-brand-lavender text-ink-primary line-clamp-2 text-lg leading-snug font-bold transition-colors sm:text-xl">
                {work.name}
              </h3>
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

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px]"
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
    </GlassCard>
  );
}

export function SelectedWorks({ works }: SelectedWorksProps) {
  return (
    <section className="w-full">
      <SubTitle
        tone="primary"
        eyebrow="Projects"
        title="프로젝트"
        trailing={
          <Link
            href="/works"
            className="hover:border-brand-lavender/30 focus-visible:ring-brand-lavender text-ink-secondary flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold backdrop-blur-xl transition-colors outline-none hover:text-white focus-visible:ring-2"
          >
            모든 작업 보기
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {works.map((work) => (
          <SelectedWorkCard key={work.pageName} work={work} />
        ))}
      </div>
    </section>
  );
}
