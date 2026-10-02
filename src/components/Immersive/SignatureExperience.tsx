'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import { Logo } from '@/components/Logo/Logo';
import { COLOR_TOKENS } from '@/lib/designTokens';
import { cn } from '@/lib/utils';
import { OrbitControls, Sparkles, View } from '@react-three/drei';
import { Canvas, type RootState } from '@react-three/fiber';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Move3d, RotateCcw, SparklesIcon } from 'lucide-react';
import {
  Component,
  type ComponentRef,
  type ErrorInfo,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ParticleLogo } from './ParticleLogo';
import type { SignatureQuality } from './signatureQuality';

const INTRO_SEEN_KEY = 'nijoow-intro-seen-v2';
const ASSEMBLE_MS = 3200;
const LANDING_MS = 1350;

type StagePhase = 'intro' | 'landing' | 'hero';

interface QualityConfig {
  count: number;
  dpr: [number, number];
  sparkles: number;
}

const QUALITY_CONFIG: Record<
  Exclude<SignatureQuality, 'fallback'>,
  QualityConfig
> = {
  high: { count: 40000, dpr: [1, 1.5], sparkles: 30 },
  medium: { count: 24000, dpr: [1, 1.25], sparkles: 22 },
  low: { count: 12000, dpr: [1, 1], sparkles: 12 },
};

const CANVAS_GL_CONFIG = {
  alpha: true,
  antialias: false,
  powerPreference: 'high-performance' as const,
};
const CAMERA_CONFIG = {
  position: [0, 0, 2.8] as [number, number, number],
  fov: 42,
};
const INTRO_SPARKLES_SCALE: [number, number, number] = [16, 10, 6];
const HERO_SPARKLES_SCALE: [number, number, number] = [9, 4.5, 4];
const HERO_LAYOUT_CLASS = 'mb-10 h-[240px] w-full sm:h-[400px]';

function makeCanvasTransparent({ gl }: RootState) {
  gl.setClearColor('#000000', 0);
}

function resolveFrameLoop(
  reduced: boolean,
  isSceneVisible: boolean,
): 'always' | 'demand' | 'never' {
  if (reduced) return 'demand';
  return isSceneVisible ? 'always' : 'never';
}

function hasSeenIntro() {
  try {
    return window.localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return true;
  }
}

function markIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {}
}

interface RouteCopy {
  eyebrow: string;
  title: ReactNode;
}

const HOME_ROUTE_COPY: RouteCopy = {
  eyebrow: 'Frontend Developer',
  title: (
    <>
      이우진 <span className="text-ink-faint">·</span>{' '}
      <span className="text-brand-lavender">nijoow</span>
    </>
  ),
};

function SignatureFallbackArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="bg-brand-lavender/12 absolute size-56 rounded-full blur-3xl" />
      <Logo
        width={240}
        height={135}
        className="text-brand-lavender relative opacity-90 drop-shadow-2xl"
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SignatureErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Signature WebGL scene failed', error, info);
  }

  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

interface SignatureStageProps {
  config: QualityConfig | null;
  reduced: boolean;
  heroInteractive: boolean;
  isIntro: boolean;
  isSceneVisible: boolean;
  burstSignal: number;
  introRun: number;
  orbitControlsRef: RefObject<ComponentRef<typeof OrbitControls> | null>;
}

function SignatureStage({
  config,
  reduced,
  heroInteractive,
  isIntro,
  isSceneVisible,
  burstSignal,
  introRun,
  orbitControlsRef,
}: SignatureStageProps) {
  const [isParticleReady, setIsParticleReady] = useState(false);
  const markParticleReady = useCallback(() => setIsParticleReady(true), []);

  if (!config) return <SignatureFallbackArt />;

  return (
    <SignatureErrorBoundary fallback={<SignatureFallbackArt />}>
      <AnimatePresence>
        {!isParticleReady ? (
          <m.div
            key="signature-fallback"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
          >
            <SignatureFallbackArt />
          </m.div>
        ) : null}
      </AnimatePresence>
      <View
        className="absolute inset-0"
        frames={reduced ? 1 : Infinity}
        visible={isSceneVisible}
      >
        <ambientLight intensity={0.8} />
        <OrbitControls
          ref={orbitControlsRef}
          enabled={heroInteractive}
          enablePan={false}
          minDistance={1.8}
          maxDistance={3}
        />
        <Suspense fallback={null}>
          <ParticleLogo
            count={config.count}
            interactive={false}
            rotate={heroInteractive}
            clickBurst={heroInteractive}
            burstSignal={burstSignal}
            entranceSignal={introRun}
            animateEntrance={!reduced}
            jitter={reduced ? 0 : 0.003}
            onReady={markParticleReady}
          />
        </Suspense>
        <Sparkles
          count={config.sparkles}
          scale={isIntro ? INTRO_SPARKLES_SCALE : HERO_SPARKLES_SCALE}
          size={1.4}
          speed={reduced ? 0 : 0.3}
          color={COLOR_TOKENS.brand.lavender}
          opacity={0.4}
        />
      </View>
    </SignatureErrorBoundary>
  );
}

interface HeroOverlayProps {
  isVisible: boolean;
  isLanding: boolean;
  routeCopy: RouteCopy;
  showBurstButton: boolean;
  onBurst: () => void;
}

function HeroOverlay({
  isVisible,
  isLanding,
  routeCopy,
  showBurstButton,
  onBurst,
}: HeroOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <m.div
          key="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, delay: isLanding ? 0.45 : 0 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-7 sm:bottom-6 sm:left-7">
            <m.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: isLanding ? 0.65 : 0 }}
              className="flex flex-col gap-0.5"
            >
              <Eyebrow>{routeCopy.eyebrow}</Eyebrow>
              <span className="text-lg font-bold text-white sm:text-2xl">
                {routeCopy.title}
              </span>
            </m.div>

            <div className="pointer-events-auto flex items-center gap-1.5">
              <span
                role="img"
                aria-label="드래그해서 회전"
                title="드래그해서 회전"
                className="text-ink-muted hidden size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:flex"
              >
                <Move3d size={15} />
              </span>
              {showBurstButton ? (
                <button
                  type="button"
                  onClick={onBurst}
                  aria-label="파티클 흩기"
                  title="파티클 흩기"
                  className="hover:border-brand-lavender/40 hover:text-brand-lavender focus-visible:ring-brand-lavender text-ink-muted flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors outline-none focus-visible:ring-2"
                >
                  <SparklesIcon size={15} />
                </button>
              ) : null}
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

interface SignatureViewCanvasProps {
  config: QualityConfig | null;
  reduced: boolean;
  isSceneVisible: boolean;
  isCinematic: boolean;
}

function SignatureViewCanvas({
  config,
  reduced,
  isSceneVisible,
  isCinematic,
}: SignatureViewCanvasProps) {
  if (!config) return null;

  return (
    <SignatureErrorBoundary fallback={null}>
      <Canvas
        camera={CAMERA_CONFIG}
        dpr={config.dpr}
        frameloop={resolveFrameLoop(reduced, isSceneVisible)}
        gl={CANVAS_GL_CONFIG}
        onCreated={makeCanvasTransparent}
        className={cn(
          '!pointer-events-none !fixed !inset-0 !h-screen !w-screen',
          isCinematic ? 'z-101' : 'z-11',
        )}
      >
        <View.Port />
      </Canvas>
    </SignatureErrorBoundary>
  );
}

function ReplayButton({
  show,
  onReplay,
}: {
  show: boolean;
  onReplay: () => void;
}) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onReplay}
      aria-label="인트로 다시 보기"
      title="인트로 다시 보기"
      className="group focus-visible:ring-brand-lavender hover:border-brand-lavender/35 hover:text-brand-lavender text-ink-secondary fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-lg backdrop-blur-xl transition-colors outline-none focus-visible:ring-2"
    >
      <RotateCcw
        size={18}
        className="transition-transform duration-500 group-hover:-rotate-180"
      />
    </button>
  );
}

export default function SignatureExperience({
  quality,
}: {
  quality: Exclude<SignatureQuality, 'fallback'>;
}) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);
  const orbitControlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const [phase, setPhase] = useState<StagePhase>(() => {
    const shouldPlay =
      quality !== 'low' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !hasSeenIntro();
    return shouldPlay ? 'intro' : 'hero';
  });
  const [introRun, setIntroRun] = useState(0);
  const [burstSignal, setBurstSignal] = useState(0);
  const [isInView, setIsInView] = useState(true);

  const isIntro = phase === 'intro';
  const isHero = phase === 'hero';
  const isCinematic = phase !== 'hero';
  const config = QUALITY_CONFIG[quality];
  const heroInteractive = isHero && !reduced;
  const isSceneVisible = isInView || isCinematic;
  const showBurstButton = !reduced && config !== null;
  const showReplayButton = heroInteractive && isInView && config !== null;

  useEffect(() => {
    const element = wrapRef.current;
    if (!element || isCinematic) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? true),
      { rootMargin: '120px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isCinematic]);

  useEffect(() => {
    if (!isIntro) return;
    const timer = window.setTimeout(() => setPhase('landing'), ASSEMBLE_MS);
    return () => window.clearTimeout(timer);
  }, [isIntro, introRun]);

  useEffect(() => {
    orbitControlsRef.current?.reset();
  }, [introRun]);

  useEffect(() => {
    if (phase !== 'landing') return;
    const timer = window.setTimeout(() => {
      markIntroSeen();
      setPhase('hero');
    }, LANDING_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleLanding = () => setPhase('landing');

  const handleReplay = () => {
    setIntroRun((run) => run + 1);
    setPhase('intro');
  };

  const handleBurst = () => setBurstSignal((signal) => signal + 1);

  const handleContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    if (!isHero || reduced || !config) return;
    event.preventDefault();
    handleBurst();
  };

  return (
    <>
      <m.section
        ref={wrapRef}
        layout
        initial={false}
        animate={{ borderRadius: isIntro ? 0 : 24 }}
        transition={{
          layout: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        }}
        onContextMenu={handleContextMenu}
        aria-label="nijoow 시그니처 로고"
        className={cn(
          'overflow-hidden bg-black',
          isIntro
            ? 'fixed inset-0 z-100 border border-transparent'
            : cn('relative z-10 border border-white/10', HERO_LAYOUT_CLASS),
        )}
      >
        <SignatureStage
          config={config}
          reduced={Boolean(reduced)}
          heroInteractive={heroInteractive}
          isIntro={isIntro}
          isSceneVisible={isSceneVisible}
          burstSignal={burstSignal}
          introRun={introRun}
          orbitControlsRef={orbitControlsRef}
        />

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]" />

        <AnimatePresence>
          {phase === 'landing' ? (
            <m.div
              key="landing-sweep"
              initial={{ x: '-140%', opacity: 0 }}
              animate={{ x: '140%', opacity: [0, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="via-brand-lavender/25 pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent blur-xl"
            />
          ) : null}
        </AnimatePresence>

        <HeroOverlay
          isVisible={!isIntro}
          isLanding={phase === 'landing'}
          routeCopy={HOME_ROUTE_COPY}
          showBurstButton={showBurstButton}
          onBurst={handleBurst}
        />

        {isIntro ? (
          <button
            type="button"
            onClick={handleLanding}
            className="focus-visible:ring-brand-lavender text-ink-secondary absolute top-5 right-5 z-10 min-h-11 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-xl transition-colors outline-none hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:ring-2"
          >
            건너뛰기
          </button>
        ) : null}
      </m.section>

      {isIntro ? (
        <div aria-hidden="true" className={HERO_LAYOUT_CLASS} />
      ) : null}

      <SignatureViewCanvas
        config={config}
        reduced={Boolean(reduced)}
        isSceneVisible={isSceneVisible}
        isCinematic={isCinematic}
      />

      <ReplayButton show={showReplayButton} onReplay={handleReplay} />
    </>
  );
}
