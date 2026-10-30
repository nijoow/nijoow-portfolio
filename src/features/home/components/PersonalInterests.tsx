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
      '바리스타 교육을 받고 직접 일한 경험이 있습니다. 새로운 원두와 추출 방식을 찾아보는 것을 좋아하고, 집에서는 핸드드립으로 커피를 내립니다.',
    scene: 'coffee',
  },
  {
    label: '농구',
    detail:
      '가끔 길거리 농구를 하고, 시간이 맞으면 경기장에 가서 경기를 봅니다. <슬램덩크>를 좋아하고, 가장 좋아하는 캐릭터는 정대만입니다.',
    scene: 'basketball',
  },
  {
    label: '음악',
    detail:
      '힙합과 발라드를 좋아합니다. 집중할 때는 재즈나 로파이를 자주 듣고, K-pop과 J-pop도 즐겨 듣습니다.',
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
