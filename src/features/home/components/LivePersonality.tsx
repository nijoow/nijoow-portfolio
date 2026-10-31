import SubTitle from '@/components/SubTitle/SubTitle';
import Eyebrow from '@/components/ui/Eyebrow';
import { PersonalInterests } from '@/features/home/components/PersonalInterests';
import type { ReactNode } from 'react';

interface LivePersonalityProps {
  music: ReactNode;
  github: ReactNode;
}

export function LivePersonality({ music, github }: LivePersonalityProps) {
  return (
    <section className="w-full">
      <SubTitle
        tone="quiet"
        eyebrow="Life & Work"
        title="요즘의 기록과 좋아하는 것들"
      />
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <Eyebrow tone="muted" className="px-1">
            최근 들은 음악
          </Eyebrow>
          {music}
        </div>
        <div className="flex min-w-0 flex-col gap-2">{github}</div>
      </div>
      <PersonalInterests />
    </section>
  );
}
