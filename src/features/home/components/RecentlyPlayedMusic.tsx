'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/Motion/GlassCard';
import { useNowPlaying } from '@/features/home/hooks/useNowPlaying';
import type { Music } from '@/features/home/schemas/spotifySchemas';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, History, Music2, RotateCw } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const EQUALIZER_BARS = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  heights: [
    `${28 + Math.round(Math.abs(Math.sin(index)) * 55)}%`,
    `${36 + Math.round(Math.abs(Math.cos(index * 0.7)) * 60)}%`,
    `${24 + Math.round(Math.abs(Math.sin(index * 1.3)) * 68)}%`,
  ],
  duration: 0.9 + (index % 5) * 0.12,
  delay: index * 0.035,
}));

function MusicArtwork({
  music,
  shouldAnimate,
}: {
  music: Music;
  shouldAnimate: boolean;
}) {
  return (
    <div className="relative size-20 shrink-0 sm:size-22">
      <div className="bg-brand-violet/30 absolute inset-2 rounded-full blur-xl" />
      <m.div
        animate={shouldAnimate ? { rotate: 360 } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="ring-brand-lavender/15 relative size-full overflow-hidden rounded-full border-2 border-white/15 bg-black shadow-xl ring-1"
      >
        <Image
          src={music.albumImageUrl}
          fill
          alt={`${music.title} 앨범 커버`}
          sizes="(max-width: 640px) 80px, 88px"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-full border border-white/10"
        />
        <span
          aria-hidden="true"
          className="bg-surface-ink absolute top-1/2 left-1/2 flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/20 shadow-inner"
        >
          <span className="size-1.5 rounded-full bg-white/15" />
        </span>
      </m.div>
    </div>
  );
}

function RecentTrack({ music, index }: { music: Music; index: number }) {
  return (
    <a
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/track focus-visible:ring-brand-lavender flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 transition-colors outline-none hover:bg-white/5 focus-visible:ring-2"
    >
      <span className="text-ink-muted w-4 shrink-0 text-center text-[10px] font-bold">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
        <Image
          src={music.albumImageUrl}
          fill
          alt=""
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="group-hover/track:text-brand-lavender truncate text-sm font-bold transition-colors">
          {music.title}
        </p>
        <p className="text-ink-muted truncate text-xs">{music.artist}</p>
      </div>
      <ExternalLink
        aria-hidden="true"
        className="text-ink-faint group-hover/track:text-ink-muted size-3.5 shrink-0 transition-colors"
      />
    </a>
  );
}

function MusicCardSkeleton() {
  return (
    <GlassCard className="h-full min-h-96">
      <div className="flex h-full animate-pulse flex-col gap-5 p-5">
        <div className="flex gap-4">
          <div className="size-20 rounded-full bg-white/10 sm:size-22" />
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="h-5 w-2/3 rounded-full bg-white/10" />
            <div className="h-3 w-1/2 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="h-px bg-white/10" />
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-white/5" />
            <div className="h-3 flex-1 rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function RecentlyPlayedMusic() {
  const { data, isPending, isError, isFetching, refetch, dataUpdatedAt } =
    useNowPlaying();
  const shouldReduceMotion = useReducedMotion();
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef, { margin: '120px' });

  if (isPending) return <MusicCardSkeleton />;

  if (!data?.current) {
    return (
      <GlassCard lift={false} className="w-full">
        <div className="flex flex-col items-start gap-3 p-6">
          <span className="bg-brand-deep/35 text-brand-lavender flex size-12 items-center justify-center rounded-2xl border border-white/10">
            <Music2 size={20} />
          </span>
          <p role="status" className="text-ink-muted text-sm">
            {isError
              ? '음악 정보를 잠시 불러올 수 없습니다.'
              : '아직 표시할 음악 기록이 없습니다.'}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="focus-visible:ring-brand-lavender inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm outline-none focus-visible:ring-2 disabled:opacity-50"
          >
            <RotateCw size={14} aria-hidden />
            {isFetching ? '불러오는 중' : '다시 불러오기'}
          </button>
        </div>
      </GlassCard>
    );
  }

  const { current, recent, isPlaying } = data;
  const playbackLabel = isPlaying ? '지금 듣는 중' : '마지막으로 들은 곡';
  const shouldAnimate =
    isPlaying && !isError && isInView && !shouldReduceMotion;

  return (
    <div ref={animationRef} className="h-full">
      <GlassCard className="h-full min-h-96">
        <div className="relative flex h-full flex-col overflow-hidden p-5">
          <div className="bg-brand-deep/25 absolute -top-16 -left-14 size-48 rounded-full blur-3xl" />

          <a
            href={current.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/current focus-visible:ring-brand-lavender relative flex min-w-0 items-center gap-4 rounded-2xl outline-none focus-visible:ring-2"
          >
            <MusicArtwork music={current} shouldAnimate={shouldAnimate} />
            <div className="min-w-0 flex-1">
              <Eyebrow tone="muted" className="mb-2 flex items-center gap-2">
                <span className="bg-status-success shadow-status-success/60 size-2 rounded-full shadow-sm" />
                {isError ? '마지막으로 확인한 음악' : playbackLabel}
              </Eyebrow>
              <h3 className="group-hover/current:text-brand-lavender truncate text-lg font-bold transition-colors sm:text-xl">
                {current.title}
              </h3>
              <p className="text-brand-lavender/80 truncate text-sm font-bold">
                {current.artist}
              </p>
              <div className="mt-3 flex h-5 items-end gap-0.5 overflow-hidden">
                {EQUALIZER_BARS.map((bar) => (
                  <m.span
                    key={bar.id}
                    className="bg-brand-lavender/85 w-1.5 rounded-t-xs"
                    animate={
                      shouldAnimate
                        ? { height: bar.heights }
                        : { height: bar.heights[0] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: bar.duration,
                      delay: bar.delay,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
            <ExternalLink className="text-ink-faint group-hover/current:text-ink-secondary size-4 shrink-0 self-start transition-colors" />
          </a>

          {isError ? (
            <p role="status" className="text-ink-muted relative mt-3 text-xs">
              업데이트를 잠시 불러올 수 없어{' '}
              <time dateTime={new Date(dataUpdatedAt).toISOString()}>
                {new Date(dataUpdatedAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
              에 확인한 기록을 보여드립니다.
            </p>
          ) : null}

          <div className="relative my-5 h-px bg-white/10" />

          <div className="relative flex items-center justify-between px-2">
            <span className="text-ink-muted flex items-center gap-2 text-xs font-bold">
              <History size={13} /> 최근 들은 음악
            </span>
            <Eyebrow>Spotify</Eyebrow>
          </div>

          <div className="relative mt-2 flex flex-1 flex-col justify-center">
            {recent.length > 0 ? (
              recent.map((music, index) => (
                <RecentTrack
                  key={`${music.songUrl}-${index}`}
                  music={music}
                  index={index}
                />
              ))
            ) : (
              <p className="text-ink-muted px-2 py-5 text-sm">
                최근 들은 음악이 아직 없습니다.
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
