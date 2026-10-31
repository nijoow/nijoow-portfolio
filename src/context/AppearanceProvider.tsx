'use client';

import { Dialog } from 'radix-ui';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type MaterialStyle = 'elastic' | 'refraction' | 'ink';
export type AtmosphereStyle = 'original' | 'reading' | 'layered';
export interface Appearance {
  material: MaterialStyle;
  atmosphere: AtmosphereStyle;
  motion: boolean;
}
const DEFAULT: Appearance = {
  material: 'elastic',
  atmosphere: 'original',
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
      atmosphere:
        p.atmosphere === 'reading' || p.atmosphere === 'layered'
          ? p.atmosphere
          : 'original',
      motion: p.motion !== false,
    };
  } catch {
    return DEFAULT;
  }
}

const MATERIALS: {
  value: MaterialStyle;
  title: string;
  description: string;
}[] = [
  {
    value: 'elastic',
    title: '유리와 탄성',
    description: '빛을 머금은 조각과 부드러운 움직임',
  },
  {
    value: 'refraction',
    title: '굴절과 조명',
    description: '투명한 유리 사이로 겹쳐지는 빛',
  },
  {
    value: 'ink',
    title: '잉크와 액체',
    description: '윤기와 흐르는 곡면, 유연한 형태',
  },
];
const ATMOSPHERES: {
  value: AtmosphereStyle;
  title: string;
  description: string;
}[] = [
  {
    value: 'original',
    title: '기존 분위기',
    description: '별·궤도·빛과 유리의 풍부함',
  },
  {
    value: 'reading',
    title: '읽기 면 강조',
    description: '본문 뒤를 차분하게, 여백에는 빛을',
  },
  {
    value: 'layered',
    title: '유리 강약',
    description: '배경은 유지하고 카드의 깊이를 구분',
  },
];

function AppearanceControls({
  value,
  onChange,
}: {
  value: Appearance;
  onChange: (next: Appearance) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="appearance-trigger">
          <SlidersHorizontal size={16} aria-hidden />
          화면 설정
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="appearance-overlay" />
        <Dialog.Content className="appearance-panel">
          <header>
            <div>
              <Dialog.Title>화면 설정</Dialog.Title>
              <Dialog.Description>
                선택한 스타일은 다른 페이지에서도 유지돼요.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="화면 설정 닫기">
                <X size={20} />
              </button>
            </Dialog.Close>
          </header>
          <fieldset>
            <legend>작업 방식 · 인터랙션 재질</legend>
            <div className="appearance-options">
              {MATERIALS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={value.material === option.value}
                  onClick={() => onChange({ ...value, material: option.value })}
                >
                  <i
                    className={`material-swatch material-swatch-${option.value}`}
                    aria-hidden
                  />
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>배경과 카드</legend>
            <div className="appearance-options">
              {ATMOSPHERES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={value.atmosphere === option.value}
                  onClick={() =>
                    onChange({ ...value, atmosphere: option.value })
                  }
                >
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
          <label className="appearance-motion">
            <span>
              배경·재질 움직임
              <small>기기의 동작 줄이기 설정도 함께 적용돼요.</small>
            </span>
            <input
              type="checkbox"
              checked={value.motion}
              onChange={(e) => onChange({ ...value, motion: e.target.checked })}
            />
          </label>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function AppearanceProvider({
  children,
  controls,
}: {
  children: ReactNode;
  controls: boolean;
}) {
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
    document.documentElement.dataset.atmosphere = appearance.atmosphere;
    document.documentElement.dataset.sceneMotion = appearance.motion
      ? 'on'
      : 'off';
    return () => {
      delete document.documentElement.dataset.atmosphere;
      delete document.documentElement.dataset.sceneMotion;
    };
  }, [appearance.atmosphere, appearance.motion]);
  const update = useCallback((next: Appearance) => {
    setAppearance(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* Keep the current session usable. */
    }
  }, []);
  return (
    <AppearanceContext value={appearance}>
      {children}
      {controls ? (
        <AppearanceControls value={appearance} onChange={update} />
      ) : null}
    </AppearanceContext>
  );
}
