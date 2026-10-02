'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { GlassPopover } from '@/components/ui/GlassPopover';
import { cn } from '@/lib/utils';
import { m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { type PointerEvent, useState } from 'react';

type InterestMotion = 'float' | 'bounce' | 'pulse';

interface Interest {
  label: string;
  detail: string;
  icon: string;
  motion: InterestMotion;
}

const interests: readonly Interest[] = [
  {
    label: '커피',
    detail:
      '바리스타 교육을 받고 직접 일한 경험이 있습니다. 새로운 원두와 추출 방식을 찾아보는 것을 좋아하고, 집에서는 핸드드립으로 커피를 내립니다.',
    icon: '/images/icons/coffee.svg',
    motion: 'float',
  },
  {
    label: '농구',
    detail:
      '가끔 길거리 농구를 하고, 시간이 맞으면 경기장에 가서 경기를 봅니다. <슬램덩크>를 좋아하고, 가장 좋아하는 캐릭터는 정대만입니다.',
    icon: '/images/icons/basketball.svg',
    motion: 'bounce',
  },
  {
    label: '음악',
    detail:
      '힙합과 발라드를 좋아합니다. 집중할 때는 재즈나 로파이를 자주 듣고, K-pop과 J-pop도 즐겨 듣습니다.',
    icon: '/images/icons/hiphop.svg',
    motion: 'pulse',
  },
];

function InterestDetails({ interest }: { interest: Interest }) {
  return (
    <div className="relative">
      <h4 className="text-base font-bold text-white">{interest.label}</h4>
      <p className="text-ink-muted mt-2 text-xs leading-relaxed break-keep">
        {interest.detail}
      </p>
    </div>
  );
}

function CoffeeIcon({ isActive }: { isActive: boolean }) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const shouldAnimate = isActive && !shouldReduceMotion;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-11"
      aria-hidden="true"
    >
      <m.path
        d="M9.8 3.4c-.7.7-.7 1.5 0 2.2s.7 1.5 0 2.2"
        style={{ x: -1.2 }}
        initial={{ y: 0, opacity: 0.4 }}
        stroke="var(--color-accent-light)"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={
          shouldAnimate
            ? {
                y: [0, -2, 0],
                opacity: [0.4, 0.9, 0.4],
              }
            : { y: 0, opacity: 0.4 }
        }
        transition={
          shouldAnimate
            ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      />
      <m.path
        d="M13.3 3.4c-.7.7-.7 1.5 0 2.2s.7 1.5 0 2.2"
        style={{ x: -1.2 }}
        initial={{ y: 0, opacity: 0.3 }}
        stroke="var(--color-accent-light)"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={
          shouldAnimate
            ? {
                y: [-0.5, -2.5, -0.5],
                opacity: [0.3, 0.8, 0.3],
              }
            : { y: 0, opacity: 0.3 }
        }
        transition={
          shouldAnimate
            ? {
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
                delay: 0.2,
              }
            : { duration: 0.2 }
        }
      />
      <rect
        x="4.6"
        y="9"
        width="11.2"
        height="10"
        rx="3.2"
        fill="#c79064"
        stroke="#6f4a2c"
        strokeWidth="1.6"
      />
      <path
        d="M15.8 11.4h1.7a2.7 2.7 0 0 1 0 5.4h-1.7"
        stroke="#6f4a2c"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="10.2" cy="10.3" rx="4.4" ry="1.1" fill="#43291a" />
    </svg>
  );
}

function InterestObject({ interest }: { interest: Interest }) {
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isActive = isPointerActive || isPopoverOpen;

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
        className="frosted-glass-subtle group/interest focus-visible:ring-brand-lavender hover:border-accent/30 relative flex min-h-32 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border px-3 py-5 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <span
          aria-hidden="true"
          className="bg-accent-deep/20 absolute size-20 rounded-full blur-2xl transition-transform duration-500 group-hover/interest:scale-125 group-focus-visible/interest:scale-125"
        />
        <span
          className={cn(
            'interest-object relative flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm',
            `interest-object-${interest.motion}`,
          )}
        >
          {interest.label === '커피' ? (
            <CoffeeIcon isActive={isActive} />
          ) : (
            <Image
              src={interest.icon}
              alt=""
              width={42}
              height={42}
              className="size-11"
            />
          )}
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
    <GlassCard lift={false} className="mt-4">
      <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1.8fr] lg:items-center">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold sm:text-2xl">좋아하는 것들</h3>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {interests.map((interest) => (
            <InterestObject key={interest.label} interest={interest} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
