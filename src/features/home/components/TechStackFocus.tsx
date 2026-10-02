import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';

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
            className="text-ink-secondary rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm"
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
      <SubTitle title="기술 스택과 관심 분야" />
      <GlassCard lift={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <StackGroup title="주로 쓰는 기술" items={coreStack} />
          <div className="border-t border-white/10 sm:border-t-0 sm:border-l">
            <StackGroup title="요즘 관심 있는 것" items={currentFocus} />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
