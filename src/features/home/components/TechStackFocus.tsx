import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const coreStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'TanStack Query',
  'Zustand',
  'React Hook Form',
  'Zod',
  'Framer Motion',
] as const;

const currentFocus = [
  'Web 3D / Three.js',
  'UI/UX',
  '인터랙션',
  '웹 성능',
  'AI',
] as const;

const careerSummary = [
  {
    period: '2025.04 ~ 현재',
    organization: '프리랜서',
    role: '프론트엔드 개발',
  },
  {
    period: '2022.06 ~ 2024.12',
    organization: '주식회사 비멕스',
    role: '프론트엔드 개발',
  },
] as const;

function StackGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="p-5 sm:p-6">
      <h3 className="mb-4 font-bold">{title}</h3>
      <ul className="flex flex-wrap gap-2" aria-label={title}>
        {items.map((item) => (
          <li
            key={item}
            className="text-ink-secondary rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStackFocus() {
  return (
    <section className="w-full">
      <SubTitle eyebrow="Experience & Stack" title="경력 요약과 기술 스택" />
      <GlassCard lift={false}>
        <div className="flex flex-col">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-6">
            <ul
              className="flex w-full max-w-lg flex-col gap-2"
              aria-label="경력 요약"
            >
              {careerSummary.map((item) => (
                <li
                  key={item.organization}
                  className="flex items-start justify-between gap-4 sm:items-baseline"
                >
                  <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <strong className="text-ink-heading text-sm font-bold">
                      {item.organization}
                    </strong>
                    <span className="text-brand-lavender text-xs">
                      {item.role}
                    </span>
                  </span>
                  <span className="text-ink-muted text-xs whitespace-nowrap">
                    {item.period}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/resume"
              className="focus-visible:ring-brand-lavender text-brand-lavender inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold transition-colors outline-none hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:ring-2 sm:self-center sm:text-sm"
            >
              이력 및 경력 자세히 보기
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <StackGroup title="주로 쓰는 기술" items={coreStack} />
            <div className="border-t border-white/10 sm:border-t-0 sm:border-l">
              <StackGroup title="관심 분야" items={currentFocus} />
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
