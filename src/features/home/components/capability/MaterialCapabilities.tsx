'use client';

import dynamic from 'next/dynamic';
import { useInView, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import GlassCard from '@/components/Motion/GlassCard';
import { Logo } from '@/components/Logo/Logo';
import { detectSignatureQuality } from '@/components/Immersive/signatureQuality';
import { useAppearance } from '@/context/AppearanceProvider';
import type { CapabilityConfig } from './types';

export interface SceneInput {
  x: number;
  y: number;
  active: boolean;
  impulse: number;
}
export interface MaterialCanvasProps {
  tracks: MutableRefObject<Array<HTMLButtonElement | null>>;
  inputs: MutableRefObject<SceneInput[]>;
  count: number;
  lowPower: boolean;
  motion: boolean;
  visible: boolean;
  onReady: () => void;
  onFailure: () => void;
}
const MaterialCanvas = dynamic(() => import('./MaterialCanvas'), {
  ssr: false,
});

export function MaterialCapabilities({
  capabilities,
}: {
  capabilities: readonly CapabilityConfig[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const tracks = useRef<Array<HTMLButtonElement | null>>([]);
  const inputs = useRef<SceneInput[]>(
    capabilities.map(() => ({ x: 0, y: 0, active: false, impulse: 0 })),
  );
  const inView = useInView(root, { margin: '150px' });
  const reduced = useReducedMotion();
  const appearance = useAppearance();
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [lowPower, setLowPower] = useState(true);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const quality = detectSignatureQuality();
      setSupported(quality !== 'fallback');
      setLowPower(quality === 'low');
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const motion = appearance.motion && !reduced;
  let hint = '정적인 장면으로 표시하고 있어요';
  if (supported)
    hint = motion
      ? '빛을 움직이거나 가볍게 눌러보세요'
      : '움직임을 줄인 상태입니다';
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setSupported(false);
    setReady(false);
  }, []);
  return (
    <div
      ref={root}
      className="material-capabilities grid grid-cols-1 gap-4 sm:grid-cols-2"
      data-material={appearance.material}
    >
      {capabilities.map((capability, index) => (
        <GlassCard
          key={capability.title}
          className="material-capability"
          lift={false}
        >
          <article>
            <div className="material-copy">
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
            <button
              ref={(node) => {
                tracks.current[index] = node;
              }}
              type="button"
              className="material-stage"
              disabled={!supported || !motion}
              aria-label={`${capability.title} 장면 움직이기`}
              onPointerMove={(event) => {
                const input = inputs.current[index];
                if (!input || !motion) return;
                const box = event.currentTarget.getBoundingClientRect();
                input.x = ((event.clientX - box.left) / box.width) * 2 - 1;
                input.y = ((event.clientY - box.top) / box.height) * 2 - 1;
                input.active = true;
              }}
              onPointerLeave={() => {
                const input = inputs.current[index];
                if (input) {
                  input.active = false;
                  input.x = 0;
                  input.y = 0;
                }
              }}
              onPointerCancel={() => {
                const input = inputs.current[index];
                if (input) input.active = false;
              }}
              onClick={() => {
                const input = inputs.current[index];
                if (input) input.impulse += 1;
              }}
            >
              <div
                className={`material-fallback material-fallback-${index}`}
                data-hidden={ready && supported}
              >
                <span className="material-fallback-shape" />
                <Logo
                  width={180}
                  height={102}
                  className="material-fallback-logo"
                />
              </div>
              <span className="material-ground" aria-hidden />
            </button>
            <span className="material-hint">{hint}</span>
          </article>
        </GlassCard>
      ))}
      {supported ? (
        <MaterialCanvas
          tracks={tracks}
          inputs={inputs}
          count={capabilities.length}
          lowPower={lowPower}
          motion={Boolean(motion)}
          visible={inView}
          onReady={onReady}
          onFailure={onFailure}
        />
      ) : null}
    </div>
  );
}
