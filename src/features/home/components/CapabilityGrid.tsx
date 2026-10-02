import SubTitle from '@/components/SubTitle/SubTitle';
import { CapabilityCard } from '@/features/home/components/capability/CapabilityCard';
import type { CapabilityConfig } from '@/features/home/components/capability/types';

const capabilities = [
  {
    title: 'UX/UI 이해',
    description:
      '디자인 전공 경험을 바탕으로 기획자·디자이너와 함께 고민하며, 디자인 의도와 사용 흐름에 맞는 화면을 구현합니다.',
    icon: 'design',
    preview: 'collaboration',
  },
  {
    title: '프론트엔드 개발',
    description:
      'Next.js와 TypeScript를 중심으로 화면과 데이터 흐름을 구현하고, 개발 환경 구성부터 빌드·배포까지 다룹니다.',
    icon: 'code',
    preview: 'frontend',
  },
  {
    title: '인터랙션과 디테일',
    description:
      '인터랙티브하고 개성 있는 웹사이트를 좋아하며, 레이아웃과 모션, 3D 요소의 디테일을 다듬는 것을 즐깁니다.',
    icon: 'interaction',
    preview: 'interaction',
  },
  {
    title: 'AI 페어 프로그래밍',
    description:
      'AI와 함께 구현 방향을 검토하고 코드를 작성하며, 결과는 직접 확인합니다.',
    icon: 'ai',
    preview: 'ai',
  },
] as const satisfies readonly CapabilityConfig[];

export function CapabilityGrid() {
  return (
    <section className="w-full">
      <SubTitle eyebrow="How I Work" title="핵심 가치" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.title} {...capability} />
        ))}
      </div>
    </section>
  );
}
