'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import GlassCard from '@/components/Motion/GlassCard';
import { useGithubActivity } from '@/features/home/hooks/useGithubActivity';
import type { GithubRepository } from '@/features/home/schemas/githubActivitySchemas';
import {
  REDUCED_MOTION_MEDIA_QUERY,
  useMediaQuery,
} from '@/hooks/useMediaQuery';
import { ExternalLink, FolderGit2, Hammer, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
});

function RepositoryMeta({ repository }: { repository: GithubRepository }) {
  return (
    <span className="text-ink-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
      {repository.language ? (
        <span className="flex items-center gap-1.5">
          <span className="bg-accent size-1.5 rounded-full" />
          {repository.language}
        </span>
      ) : null}
      {repository.stars > 0 ? (
        <span className="flex items-center gap-1">
          <Star size={11} /> {repository.stars}
        </span>
      ) : null}
      <time dateTime={repository.pushedAt}>
        {dateFormatter.format(new Date(repository.pushedAt))} 업데이트
      </time>
    </span>
  );
}

function FeaturedRepository({ repository }: { repository: GithubRepository }) {
  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="frosted-glass-subtle group/featured border-accent/15 hover:border-accent/40 focus-visible:ring-brand-lavender block rounded-2xl border p-4 transition-colors outline-none focus-visible:ring-2"
    >
      <Eyebrow tone="accent" className="mb-3 flex items-center gap-2">
        <Hammer size={12} /> 최근 업데이트
      </Eyebrow>
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="group-hover/featured:text-accent-light block truncate text-base font-bold transition-colors">
            {repository.name}
          </span>
          <span className="text-ink-muted mt-1 line-clamp-2 min-h-10 text-sm leading-relaxed">
            {repository.description ?? '요즘 손보고 있는 프로젝트입니다.'}
          </span>
        </span>
        <ExternalLink className="text-ink-faint group-hover/featured:text-ink-muted size-4 shrink-0 transition-colors" />
      </span>

      {repository.topics.length > 0 ? (
        <span className="mt-3 flex flex-wrap gap-1.5">
          {repository.topics.map((topic) => (
            <span
              key={topic}
              className="text-ink-muted rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px]"
            >
              {topic}
            </span>
          ))}
        </span>
      ) : null}

      <span className="mt-3 block">
        <RepositoryMeta repository={repository} />
      </span>
    </a>
  );
}

function RepositoryRow({ repository }: { repository: GithubRepository }) {
  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/repo hover:border-accent/25 focus-visible:ring-brand-lavender flex min-w-0 items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition-colors outline-none focus-visible:ring-2"
    >
      <span className="bg-atmosphere-navy/40 text-accent-light flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10">
        <FolderGit2 size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="group-hover/repo:text-accent-light block truncate text-sm font-bold transition-colors">
          {repository.name}
        </span>
        <RepositoryMeta repository={repository} />
      </span>
      <ExternalLink className="text-ink-faint group-hover/repo:text-ink-muted size-3.5 shrink-0 transition-colors" />
    </a>
  );
}

function GithubActivitySkeleton() {
  return (
    <div className="mt-4 flex animate-pulse flex-col gap-3">
      <div className="h-36 rounded-2xl bg-white/5" />
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className="flex items-center gap-3 px-2 py-2.5">
          <span className="size-9 rounded-lg bg-white/5" />
          <span className="h-3 flex-1 rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  );
}

interface RepositoryContentProps {
  repositories: readonly GithubRepository[] | undefined;
  isPending: boolean;
  isError: boolean;
}

function RepositoryContent({
  repositories,
  isPending,
  isError,
}: RepositoryContentProps) {
  if (isPending) return <GithubActivitySkeleton />;

  const featuredRepository = repositories?.[0];
  if (isError || !featuredRepository) {
    return (
      <div className="text-ink-muted flex min-h-56 items-center justify-center text-center text-sm">
        GitHub 작업을 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-1">
      <FeaturedRepository repository={featuredRepository} />
      {repositories.slice(1, 3).map((repository) => (
        <RepositoryRow key={repository.id} repository={repository} />
      ))}
    </div>
  );
}

function ContributionLink() {
  return (
    <a
      href="https://github.com/nijoow"
      target="_blank"
      rel="noopener noreferrer"
      className="focus-visible:ring-brand-lavender text-ink-secondary flex h-full min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-inset"
    >
      GitHub에서 기여 활동 보기
      <ExternalLink size={14} aria-hidden />
    </a>
  );
}

function ContributionPreview() {
  const shouldReduceMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY);
  const [hasImageError, setHasImageError] = useState(false);

  if (shouldReduceMotion || hasImageError) {
    return <ContributionLink />;
  }

  return (
    <Image
      src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
      alt="GitHub 기여 그래프 애니메이션"
      fill
      className="object-contain opacity-80"
      unoptimized
      onError={() => setHasImageError(true)}
    />
  );
}

export function GithubActivity() {
  const { data: repositories, isPending, isError } = useGithubActivity();

  return (
    <GlassCard className="h-full min-h-96">
      <div className="relative flex h-full min-h-96 flex-col overflow-hidden p-5">
        <div className="bg-atmosphere-navy/35 absolute -top-20 -right-16 size-56 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-accent-light flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <GithubIcon size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold">최근 작업</h3>
              <p className="text-ink-muted text-xs">
                GitHub에서 최근 업데이트한 프로젝트
              </p>
            </div>
          </div>
          <a
            href="https://github.com/nijoow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nijoow GitHub 프로필 열기"
            className="hover:border-accent/40 hover:text-accent-light focus-visible:ring-brand-lavender text-ink-muted flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors outline-none focus-visible:ring-2"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="relative flex-1">
          <RepositoryContent
            repositories={repositories}
            isPending={isPending}
            isError={isError}
          />
        </div>

        <div className="relative mt-3 border-t border-white/10 pt-3">
          <div className="frosted-glass-subtle relative aspect-880/192 w-full overflow-hidden rounded-xl border">
            <ContributionPreview />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
