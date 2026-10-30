const FILTER_SKELETONS = [
  { id: 'all', width: 'w-12' },
  { id: 'web', width: 'w-14' },
  { id: 'design', width: 'w-16' },
  { id: 'frontend', width: 'w-20' },
  { id: 'interactive', width: 'w-22' },
  { id: '3d', width: 'w-12' },
  { id: 'ios', width: 'w-12' },
] as const;

const CARD_SKELETONS = ['first', 'second', 'third', 'fourth'] as const;

function WorkCardSkeleton() {
  return (
    <article className="frosted-glass overflow-hidden rounded-2xl border">
      <div className="from-atmosphere-navy/25 to-brand-deep/15 relative aspect-video border-b border-white/10 bg-linear-to-br via-white/4">
        <span className="bg-brand-deep/65 border-brand-lavender/15 absolute top-3 left-3 h-6 w-24 rounded-full border" />
        <span className="absolute top-3 right-3 size-11 rounded-full border border-white/10 bg-white/6" />
        <span className="absolute inset-8 rounded-xl bg-white/5" />
      </div>

      <div className="flex min-h-40 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <span className="h-5 w-2/5 rounded-full bg-white/10" />
            <span className="h-3 w-full rounded-full bg-white/7" />
            <span className="h-3 w-3/4 rounded-full bg-white/7" />
          </div>
          <span className="size-8 shrink-0 rounded-full border border-white/10 bg-white/5" />
        </div>

        <div className="mt-auto flex items-center gap-1.5">
          <span className="h-5 w-12 rounded-full border border-white/8 bg-white/5" />
          <span className="h-5 w-16 rounded-full border border-white/8 bg-white/5" />
          <span className="h-3 w-20 rounded-full bg-white/7 sm:ml-auto" />
        </div>
      </div>
    </article>
  );
}

export function WorksGallerySkeleton() {
  return (
    <div role="status" className="flex w-full flex-col gap-4">
      <span className="sr-only">작업 목록을 불러오는 중입니다.</span>
      <div aria-hidden="true" className="contents">
        <div className="flex min-h-12 flex-wrap gap-5 border-b border-white/15">
          {['all', 'business', 'side'].map((id) => (
            <span
              key={id}
              className="h-10 w-28 animate-pulse rounded bg-white/5"
            />
          ))}
        </div>
        <span className="h-4 w-56 animate-pulse rounded bg-white/5" />
        <div className="flex min-h-11 flex-wrap gap-1.5">
          {FILTER_SKELETONS.map(({ id, width }) => (
            <span
              key={id}
              className={`${width} h-8 animate-pulse rounded-full border border-white/10 bg-white/5`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARD_SKELETONS.map((id) => (
            <div key={id} className="animate-pulse">
              <WorkCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
