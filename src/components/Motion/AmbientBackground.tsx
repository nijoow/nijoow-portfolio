'use client';

import {
  m,
  type MotionValue,
  type Transition,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  REDUCED_MOTION_MEDIA_QUERY,
  useMediaQuery,
} from '@/hooks/useMediaQuery';
import { useEffect } from 'react';
import { useAppearance } from '@/context/AppearanceProvider';

interface StarParticle {
  id: number;
  left: string;
  top: string;
  opacity: number;
  dimOpacity: number;
  size: string;
  duration: number;
  delay: number;
}

function seededValue(index: number, salt: number): number {
  const value = Math.sin(index * 91.37 + salt * 47.11) * 10000;
  return value - Math.floor(value);
}

function roundParticleValue(value: number): number {
  return Number(value.toFixed(4));
}

const STAR_PARTICLES: StarParticle[] = Array.from(
  { length: 30 },
  (_, index) => {
    const opacity = roundParticleValue(0.18 + seededValue(index, 3) * 0.48);

    return {
      id: index,
      left: `${roundParticleValue(seededValue(index, 1) * 100)}%`,
      top: `${roundParticleValue(seededValue(index, 2) * 100)}%`,
      opacity,
      dimOpacity: roundParticleValue(opacity * 0.45),
      size: `${roundParticleValue(1 + seededValue(index, 4) * 1.6)}px`,
      duration: roundParticleValue(5 + seededValue(index, 5) * 7),
      delay: roundParticleValue(seededValue(index, 6) * 4),
    };
  },
);

const STATIC_TRANSITION = { duration: 0 } as const;

export function AmbientBackground() {
  const reduced = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY);
  const appearance = useAppearance();
  const shouldReduceMotion = reduced || !appearance.motion;
  const pointerX = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 45, damping: 24 });
  const blobX1 = useTransform(smoothPointerX, (value) => value * -0.75);
  const blobX2 = useTransform(smoothPointerX, (value) => value * 0.5);
  const blobX3 = useTransform(smoothPointerX, (value) => value * -0.35);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const resolveTransition = (transition: Transition): Transition =>
    shouldReduceMotion ? STATIC_TRANSITION : transition;
  const resolveParallax = (value: MotionValue<number>) =>
    shouldReduceMotion ? 0 : value;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 64);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, shouldReduceMotion]);

  return (
    <div className="ambient-background bg-surface-ink pointer-events-none fixed inset-0 -z-20 overflow-hidden select-none">
      <div className="cosmic-stars absolute inset-0 opacity-75" />
      <div className="cosmic-grid absolute inset-0 opacity-50" />

      <div className="cosmic-orbit-map absolute top-[12%] -left-[18%] h-[34rem] w-[72rem] -rotate-12 opacity-75" />
      <div className="cosmic-orbit-map absolute top-[58%] -right-[24%] h-[38rem] w-[78rem] rotate-8 opacity-65" />
      <div className="cosmic-aurora absolute top-[26%] -left-[12%] h-40 w-[124%] -rotate-8 opacity-85" />
      <div className="cosmic-aurora absolute top-[72%] -left-[16%] h-44 w-[132%] rotate-6 opacity-70" />
      <div className="cosmic-glass-light-brand absolute top-[14%] left-[18%] h-80 w-[34rem] -rotate-12 opacity-75" />
      <div className="cosmic-glass-light-accent absolute top-[54%] right-[12%] h-72 w-[30rem] rotate-12 opacity-70" />
      <div className="cosmic-glass-ribbon absolute top-[31%] -left-[14%] h-24 w-[128%] -rotate-8 opacity-90" />
      <div className="cosmic-glass-ribbon absolute top-[68%] -left-[10%] h-20 w-[124%] rotate-6 opacity-70" />
      <div className="cosmic-prism-line absolute top-[38%] -left-[10%] h-px w-[70%] -rotate-12 opacity-75" />
      <div className="cosmic-prism-line absolute top-[81%] right-[-8%] h-px w-[64%] rotate-9 opacity-60" />

      <m.div
        style={{ x: resolveParallax(blobX1), y: resolveParallax(y1) }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.58, 0.78, 0.58] }
        }
        transition={resolveTransition({
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        })}
        className="bg-atmosphere-violet/65 absolute -top-32 -left-40 size-[34rem] rounded-full blur-3xl"
      />
      <m.div
        style={{ x: resolveParallax(blobX2), y: resolveParallax(y2) }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1.08, 0.96, 1.08], opacity: [0.42, 0.68, 0.42] }
        }
        transition={resolveTransition({
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        })}
        className="bg-atmosphere-navy/80 absolute top-[24%] -right-56 size-[42rem] rounded-full blur-3xl"
      />
      <m.div
        style={{ x: resolveParallax(blobX3), y: resolveParallax(y3) }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [0.96, 1.1, 0.96], opacity: [0.38, 0.6, 0.38] }
        }
        transition={resolveTransition({
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        })}
        className="bg-accent-deep/12 absolute top-[62%] left-[4%] size-[38rem] rounded-full blur-3xl"
      />

      <m.div
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={resolveTransition({
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
        })}
        className="absolute top-[10%] left-[55%] size-96 -translate-x-1/2 rounded-full border border-white/7"
      >
        <span className="bg-brand-lavender absolute top-1/2 -left-1 size-2 rounded-full opacity-50" />
      </m.div>
      <m.div
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={resolveTransition({
          duration: 110,
          repeat: Infinity,
          ease: 'linear',
        })}
        className="border-accent/10 absolute top-[48%] -left-28 size-[30rem] rounded-full border"
      >
        <span className="bg-accent absolute right-16 bottom-6 size-1.5 rounded-full opacity-40" />
      </m.div>

      {STAR_PARTICLES.map((particle) => (
        <m.span
          key={particle.id}
          initial={
            shouldReduceMotion ? false : { opacity: particle.dimOpacity }
          }
          animate={
            shouldReduceMotion
              ? { opacity: particle.opacity }
              : {
                  y: [-5, 7, -5],
                  opacity: [
                    particle.dimOpacity,
                    particle.opacity,
                    particle.dimOpacity,
                  ],
                }
          }
          transition={resolveTransition({
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          })}
          className="bg-brand-lavender absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <div className="cosmic-vignette absolute inset-0" />
      <div className="from-surface-ink absolute inset-x-0 bottom-0 h-48 bg-linear-to-t to-transparent" />
    </div>
  );
}
