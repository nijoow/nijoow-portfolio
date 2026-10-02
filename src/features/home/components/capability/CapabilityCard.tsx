'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { CapabilityMicroUi } from '@/features/home/components/capability/CapabilityMicroUi';
import type {
  CapabilityConfig,
  CapabilityIconType,
} from '@/features/home/components/capability/types';
import {
  REDUCED_MOTION_MEDIA_QUERY,
  useMediaQuery,
} from '@/hooks/useMediaQuery';
import { useInView } from 'framer-motion';
import {
  Blocks,
  Bot,
  Code2,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

const CAPABILITY_ICONS: Record<CapabilityIconType, LucideIcon> = {
  design: PanelsTopLeft,
  code: Code2,
  interaction: Blocks,
  ai: Bot,
};

export function CapabilityCard({
  title,
  description,
  icon,
  preview,
}: CapabilityConfig) {
  const articleRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY);
  const isInView = useInView(articleRef, { amount: 0.55 });
  const Icon = CAPABILITY_ICONS[icon];
  const isActive =
    shouldReduceMotion || isHovered || isKeyboardFocused || isPressed;

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') setIsHovered(true);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') setIsHovered(false);
  };

  return (
    <GlassCard className="group/capability h-full">
      <article
        ref={articleRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="flex h-full flex-col gap-4 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="text-brand-violet group-hover/capability:border-brand-lavender/25 group-hover/capability:bg-brand-violet/15 group-focus-within/capability:border-brand-lavender/25 group-focus-within/capability:bg-brand-violet/15 flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors">
            <Icon size={19} aria-hidden />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold">{title}</h3>
            <p className="text-ink-muted text-sm leading-relaxed break-keep">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`${title} 예시 보기`}
          aria-pressed={isPressed}
          onFocus={(event) =>
            setIsKeyboardFocused(event.currentTarget.matches(':focus-visible'))
          }
          onBlur={() => setIsKeyboardFocused(false)}
          onClick={() => setIsPressed((pressed) => !pressed)}
          className="focus-visible:ring-brand-lavender mt-auto block w-full rounded-xl pt-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <CapabilityMicroUi
            type={preview}
            isActive={isActive}
            isInView={isInView}
            shouldReduceMotion={shouldReduceMotion}
          />
        </button>
      </article>
    </GlassCard>
  );
}
