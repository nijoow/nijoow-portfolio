import { cn } from '@/lib/utils';

export function ProjectDisclosureChip() {
  return (
    <span className="text-ink-secondary inline-flex rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap backdrop-blur-sm">
      화면 비공개
    </span>
  );
}

const COVER_COPY: Record<string, [string, string]> = {
  'digital-asset-management': [
    '관계가 보이는 목록',
    '클래스 · 인스턴스 · 상태 관리',
  ],
  'process-safety-management': [
    '도면 위의 작업 위치',
    '좌표 변환 · SVG · 모바일',
  ],
  'ev-charging-management': [
    '충전소 운영과 정산',
    '관리 화면 · 테이블 상태 · 인증',
  ],
  quve: ['멤버십과 결제 연동', '화면 구성 · 퍼블리싱 · API'],
};

export function LimitedProjectCover({
  className,
  pageName,
}: {
  className?: string;
  pageName?: string;
}) {
  const copy = pageName ? COVER_COPY[pageName] : undefined;
  return (
    <div
      aria-hidden="true"
      className={cn(
        'from-atmosphere-violet/75 via-surface-panel to-atmosphere-navy/70 relative overflow-hidden bg-linear-to-br',
        className,
      )}
    >
      <div className="cosmic-stars absolute inset-0 opacity-80" />
      <div className="cosmic-grid absolute inset-0 opacity-35" />
      <div className="cosmic-orbit-map absolute inset-[-20%] rotate-[-12deg] opacity-80" />
      <div className="bg-brand-violet/25 absolute top-[12%] left-[18%] size-36 rounded-full blur-3xl sm:size-52" />
      <div className="bg-accent/15 absolute right-[14%] bottom-[8%] size-32 rounded-full blur-3xl sm:size-48" />
      <div className="relative flex h-full min-h-36 flex-col justify-center gap-3 px-8 pt-5">
        {copy ? (
          <>
            <span className="text-brand-lavender text-xl font-bold break-keep sm:text-2xl">
              {copy[0]}
            </span>
            <span className="text-ink-secondary text-xs break-keep">
              {copy[1]}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
