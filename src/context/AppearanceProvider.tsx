'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type MaterialStyle = 'elastic' | 'refraction' | 'ink';
export type BackgroundStyle = 'original' | 'darker' | 'sparser';
export interface Appearance {
  material: MaterialStyle;
  background: BackgroundStyle;
  motion: boolean;
}
const DEFAULT: Appearance = {
  material: 'elastic',
  background: 'darker',
  motion: true,
};
const STORAGE_KEY = 'nijoow-appearance-v1';
const AppearanceContext = createContext<Appearance>(DEFAULT);
export const useAppearance = () => useContext(AppearanceContext);
export function parseAppearance(value: string | null): Appearance {
  try {
    const parsed: unknown = JSON.parse(value ?? '{}');
    if (!parsed || typeof parsed !== 'object') return DEFAULT;
    const p = parsed as Record<string, unknown>;
    return {
      material:
        p.material === 'refraction' || p.material === 'ink'
          ? p.material
          : 'elastic',
      background: 'darker',
      motion: p.motion !== false,
    };
  } catch {
    return DEFAULT;
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>(DEFAULT);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setAppearance(parseAppearance(localStorage.getItem(STORAGE_KEY)));
      } catch {
        /* Storage can be unavailable in private browsing. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.sceneMotion = appearance.motion
      ? 'on'
      : 'off';
    return () => {
      delete document.documentElement.dataset.sceneMotion;
    };
  }, [appearance.motion]);
  return <AppearanceContext value={appearance}>{children}</AppearanceContext>;
}
