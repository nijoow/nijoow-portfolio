import SubTitle from '@/components/SubTitle/SubTitle';
import { CapabilityCard } from '@/features/home/components/capability/CapabilityCard';
import type { CapabilityConfig } from '@/features/home/components/capability/types';

const capabilities = [
  {
    title: 'UX/UI 이해',
    description:
      '기획자·디자이너와 화면을 함께 설계하고 구현합니다. 디자인을 공부한 경험이 의도를 이해하고 의견을 나누는 데 도움이 됩니다.',
    icon: 'design',
    preview: 'collaboration',
  },
  {
    title: '프론트엔드 개발',
    description:
      'Next.js와 TypeScript로 웹을 만듭니다. 화면과 API를 연결하고, 개발 환경 설정부터 배포까지 맡습니다.',
    icon: 'code',
    preview: 'frontend',
  },
  {
    title: '인터랙션과 디테일',
    description:
      '클릭하거나 움직였을 때 반응하는 웹을 좋아합니다. 모션과 3D를 적용하고 작은 동작을 다듬는 데 관심이 많습니다.',
    icon: 'interaction',
    preview: 'interaction',
  },
  {
    title: 'AI 페어 프로그래밍',
    description:
      '코드를 작성하거나 수정할 때 AI를 함께 사용합니다. 제안받은 코드는 읽어 보고, 실행하면서 필요한 부분을 고칩니다.',
    icon: 'ai',
    preview: 'ai',
  },
] as const satisfies readonly CapabilityConfig[];

export function CapabilityGrid() {
  return (
    <section className="w-full">
      <SubTitle title="핵심 가치" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.title} {...capability} />
        ))}
      </div>
    </section>
  );
}
