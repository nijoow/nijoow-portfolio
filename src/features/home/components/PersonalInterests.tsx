'use client';

import { GlassPopover } from '@/components/ui/GlassPopover';
import { useReducedMotion } from 'framer-motion';
import { type PointerEvent, useState } from 'react';

import { InterestScene, type InterestSceneKind } from './InterestScenes';

interface Interest {
  label: string;
  detail: string;
  scene: InterestSceneKind;
}

const interests: readonly Interest[] = [
  {
    label: '커피',
    detail:
      '바리스타를 배우고 직접 일했던 경험을 계기로 커피를 더 깊이 즐기게 되었습니다. 새로운 원두를 경험하고, 추출 방식에 따라 달라지는 맛을 찾아가는 과정이 재미있습니다. 핸드드립으로 커피 한 잔을 내리는 시간은 저에게 가장 편안한 휴식이자 일상의 작은 즐거움입니다.',
    scene: 'coffee',
  },
  {
    label: '농구',
    detail:
      '가끔 길거리 농구를 하며 스트레스를 풀고, 시간이 맞으면 경기장을 찾아 직접 관람하기도 합니다. <슬램덩크>는 가장 좋아하는 만화이며, 포기를 모르는 남자 정대만을 제일 좋아합니다.',
    scene: 'basketball',
  },
  {
    label: '음악',
    detail:
      '힙합, 발라드, K-pop, J-pop 등 다양한 장르의 음악 듣는 것을 좋아합니다. 집중이 필요할 때도 로파이 비트나 재즈 음악과 함께합니다.',
    scene: 'music',
  },
];

function InterestDetails({ interest }: { interest: Interest }) {
  return (
    <div className="relative">
      <h3 className="text-base font-bold text-white">{interest.label}</h3>
      <p className="text-ink-muted mt-2 text-xs leading-relaxed break-keep">
        {interest.detail}
      </p>
    </div>
  );
}

function InterestObject({ interest }: { interest: Interest }) {
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isActive = (isPointerActive || isPopoverOpen) && !shouldReduceMotion;

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(true);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(false);
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="w-full"
    >
      <GlassPopover
        ariaLabel={`${interest.label} 취향 자세히 보기`}
        content={<InterestDetails interest={interest} />}
        onOpenChange={setIsPopoverOpen}
        className="frosted-glass-subtle group/interest focus-visible:ring-brand-lavender hover:border-accent/30 relative flex min-h-44 w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border px-1 py-4 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset motion-reduce:transform-none sm:min-h-52 sm:px-3"
      >
        <span
          aria-hidden="true"
          className="bg-brand-violet/10 absolute size-28 rounded-full blur-2xl transition-opacity duration-500 group-hover/interest:opacity-100 group-focus-visible/interest:opacity-100"
        />
        <span className="relative flex w-full items-center justify-center">
          <InterestScene kind={interest.scene} active={isActive} />
        </span>
        <span className="relative text-center">
          <span className="block text-sm font-bold">{interest.label}</span>
        </span>
      </GlassPopover>
    </div>
  );
}

export function PersonalInterests() {
  return (
    <div
      role="group"
      aria-label="좋아하는 것들"
      className="mt-4 grid w-full grid-cols-3 gap-3 sm:gap-4"
    >
      {interests.map((interest) => (
        <InterestObject key={interest.label} interest={interest} />
      ))}
    </div>
  );
}
