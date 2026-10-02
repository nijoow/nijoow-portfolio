import { cn } from '@/lib/utils';

export function ProjectDisclosureChip() {
  return (
    <span className="text-ink-secondary inline-flex rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap backdrop-blur-sm">
      화면 비공개
    </span>
  );
}

export function LimitedProjectCover({ className }: { className?: string }) {
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
      <div className="relative h-full min-h-36" />
    </div>
  );
}
