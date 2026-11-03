import { cn } from '@/lib/utils';

export function LimitedProjectCover({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-surface-panel/30 relative grid min-h-36 place-items-center overflow-hidden',
        className,
      )}
    >
      <span className="text-ink-muted rounded-full border border-white/15 bg-white/[0.025] px-4 py-1.5 text-xs font-medium">
        화면 비공개
      </span>
    </div>
  );
}

export function DisclosureNotice({ limited }: { limited: boolean }) {
  if (!limited) return null;
  return (
    <p role="note" className="text-ink-secondary text-sm leading-relaxed">
      보안상 화면과 내부 자료는 공개하지 않습니다.
    </p>
  );
}
