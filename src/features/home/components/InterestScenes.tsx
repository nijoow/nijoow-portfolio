import { COLOR_TOKENS } from '@/lib/designTokens';
import { m, useReducedMotion } from 'framer-motion';
import { type ReactNode, useId } from 'react';
import { BASKETBALL_MOTION, BASKETBALL_DURATION } from './basketballMotion';

export type InterestSceneKind = 'coffee' | 'basketball' | 'music';

function SceneFrame({
  children,
  active,
  kind,
}: {
  children: ReactNode;
  active: boolean;
  kind: InterestSceneKind;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-active={active}
      className={`interest-scene interest-scene-${kind} h-28 w-36 max-w-none shrink-0 sm:h-32 sm:w-60`}
    >
      {children}
    </svg>
  );
}

function CoffeeScene({ active }: { active: boolean }) {
  const id = useId();
  return (
    <SceneFrame kind="coffee" active={active}>
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-accent-light)" />
          <stop offset="0.45" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-accent-deep)" />
        </linearGradient>
        <linearGradient id={`${id}-ceramic`} x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="var(--color-brand-lavender)" />
          <stop offset="1" stopColor={COLOR_TOKENS.interests.coffee} />
        </linearGradient>
        <linearGradient id={`${id}-brew`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={COLOR_TOKENS.interests.coffee} />
          <stop offset="1" stopColor={COLOR_TOKENS.interests.espresso} />
        </linearGradient>
      </defs>
      <ellipse
        cx="103"
        cy="108"
        rx="76"
        ry="6"
        fill="var(--color-surface-ink)"
        opacity="0.7"
      />
      <path d="M29 104H177" stroke="var(--color-accent)" strokeOpacity="0.25" />
      <ellipse
        cx="105"
        cy="105"
        rx="43"
        ry="4"
        fill={COLOR_TOKENS.interests.espresso}
      />
      <ellipse
        cx="105"
        cy="104"
        rx="42"
        ry="3"
        fill={COLOR_TOKENS.interests.coffee}
        opacity="0.4"
      />
      <g>
        <path
          d="M51 66H72L75 73V101H49V73L51 66Z"
          fill={COLOR_TOKENS.interests.coffee}
        />
        <path
          d="M52 70H71M52 74H72"
          stroke={COLOR_TOKENS.interests.espresso}
          strokeOpacity="0.4"
        />
        <rect
          x="53"
          y="79"
          width="18"
          height="15"
          rx="2"
          fill="var(--color-brand-lavender)"
          fillOpacity="0.65"
        />
        <ellipse
          cx="62"
          cy="86"
          rx="3"
          ry="5"
          transform="rotate(30 62 86)"
          fill={COLOR_TOKENS.interests.espresso}
        />
        <path
          d="M63 82C59 86 64 88 61 91"
          stroke={COLOR_TOKENS.interests.coffee}
          strokeWidth="0.8"
        />
      </g>
      <g
        className="interest-coffee-kettle"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M43 29C24 21 24 50 42 46"
          stroke="var(--color-accent)"
          strokeWidth="4"
        />
        <path
          d="M46 24C43 29 38 45 43 51Q58 58 75 51L70 26Q58 20 46 24Z"
          fill={`url(#${id}-metal)`}
          stroke="var(--color-accent-light)"
          strokeWidth="1.2"
        />
        <path
          d="M73 40C84 41 79 31 86 28C92 26 94 33 96 38"
          stroke="var(--color-accent-light)"
          strokeWidth="3"
        />
        <path
          d="M46 30L43 43"
          stroke="var(--color-ink-primary)"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <ellipse
          cx="58"
          cy="24"
          rx="12"
          ry="3"
          fill="var(--color-accent-deep)"
          stroke="var(--color-accent-light)"
        />
        <path
          d="M54 21V18H62V21"
          stroke="var(--color-accent-light)"
          strokeWidth="2"
        />
      </g>
      <path
        className="interest-coffee-water"
        d="M96 38C97 44 102 43 103 50"
        stroke="var(--color-accent-light)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M80 49H128L110 71Q104 76 97 71L80 49Z"
        fill={`url(#${id}-ceramic)`}
      />
      <path
        d="M86 51L99 69M96 52L103 70M118 51L109 69"
        stroke={COLOR_TOKENS.interests.espresso}
        strokeOpacity="0.28"
        strokeWidth="1.4"
      />
      <ellipse
        cx="104"
        cy="49"
        rx="24"
        ry="4.5"
        fill="var(--color-brand-lavender)"
      />
      <ellipse
        cx="104"
        cy="49"
        rx="20"
        ry="3"
        fill={COLOR_TOKENS.interests.espresso}
      />
      <ellipse
        cx="104"
        cy="49"
        rx="10"
        ry="1.8"
        fill={COLOR_TOKENS.interests.coffee}
        opacity="0.65"
      />
      <path
        d="M96 74H112L114 82C125 87 132 94 126 101Q104 107 83 101C78 94 85 87 94 82L96 74Z"
        fill="var(--color-accent-light)"
        fillOpacity="0.12"
        stroke="var(--color-accent-light)"
        strokeOpacity="0.7"
        strokeWidth="1.3"
      />
      <path
        d="M87 92Q104 96 122 92L127 99Q105 104 83 100Z"
        fill={`url(#${id}-brew)`}
      />
      <path
        d="M121 85C142 79 142 101 129 99"
        stroke="var(--color-accent-light)"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <path
        d="M92 85Q84 91 85 97"
        stroke="var(--color-ink-primary)"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="interest-coffee-drop"
        d="M104 74V78"
        stroke={COLOR_TOKENS.interests.coffee}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="94"
        y="77"
        width="20"
        height="4"
        rx="1.5"
        fill={COLOR_TOKENS.interests.coffee}
      />
      <ellipse
        cx="152"
        cy="104"
        rx="18"
        ry="3"
        fill="var(--color-accent-deep)"
      />
      <path
        d="M162 88C175 84 173 99 163 99"
        stroke={COLOR_TOKENS.interests.coffee}
        strokeWidth="2.5"
      />
      <path d="M140 87H164V98Q152 108 140 98Z" fill={`url(#${id}-ceramic)`} />
      <ellipse
        cx="152"
        cy="87"
        rx="12"
        ry="3"
        fill={COLOR_TOKENS.interests.espresso}
        stroke={COLOR_TOKENS.interests.coffee}
      />
      <path
        d="M144 92V97"
        stroke="var(--color-ink-primary)"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g
        stroke="var(--color-brand-lavender)"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path
          className="interest-coffee-steam"
          d="M147 80C153 74 144 72 151 65"
          opacity="0.5"
        />
        <path
          className="interest-coffee-steam interest-coffee-steam-late"
          d="M158 79C164 73 155 70 161 65"
          opacity="0.3"
        />
      </g>
      <ellipse
        cx="39"
        cy="100"
        rx="4"
        ry="6"
        transform="rotate(-30 39 100)"
        fill={COLOR_TOKENS.interests.coffee}
      />
      <path d="M38 96L40 104" stroke={COLOR_TOKENS.interests.espresso} />
    </SceneFrame>
  );
}

function BasketballScene({ active }: { active: boolean }) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const transition = active
    ? {
        duration: BASKETBALL_DURATION,
        ease: 'linear' as const,
        repeat: Infinity,
      }
    : { duration: shouldReduceMotion ? 0 : 0.25 };
  return (
    <SceneFrame kind="basketball" active={active}>
      <path
        d="M47 88H154L179 110H22L47 88Z"
        fill="var(--color-accent-deep)"
        fillOpacity="0.22"
        stroke="var(--color-accent)"
        strokeOpacity="0.35"
      />
      <path
        d="M67 89L59 109M133 89L141 109M96 89V109"
        stroke="var(--color-accent)"
        opacity="0.3"
      />
      <ellipse
        cx="96"
        cy="99"
        rx="17"
        ry="7"
        stroke="var(--color-brand-lavender)"
        opacity="0.35"
      />
      <path
        d="M151 31V91L164 102"
        stroke="var(--color-accent-deep)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect
        x="115"
        y="20"
        width="39"
        height="29"
        rx="4"
        fill="var(--color-surface-elevated)"
        stroke="var(--color-accent-light)"
        strokeWidth="2"
      />
      <path
        d="M128 36V28H143V36"
        stroke="var(--color-brand-lavender)"
        strokeWidth="1.6"
      />
      <m.ellipse
        initial={false}
        animate={
          active ? BASKETBALL_MOTION.shadow : { x: 0, scaleX: 1, opacity: 0.75 }
        }
        transition={transition}
        className="interest-ball-shadow"
        cx="82"
        cy="99"
        rx="14"
        ry="3"
        fill="var(--color-surface-ink)"
        opacity="0.75"
      />
      <m.g
        className="interest-basketball"
        initial={false}
        animate={active ? BASKETBALL_MOTION.ball : { x: 0, y: 0, rotate: 0 }}
        transition={transition}
      >
        <circle
          cx="82"
          cy="83"
          r="14"
          fill={COLOR_TOKENS.interests.basketball}
          stroke="var(--color-surface-panel)"
          strokeWidth="1.7"
        />
        <path
          d="M68 83H96M82 69V97M73 72C83 78 83 88 73 94M91 72C81 78 81 88 91 94"
          stroke="var(--color-surface-panel)"
          strokeWidth="1.3"
        />
        <path
          d="M74 75L77 73"
          stroke="var(--color-ink-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </m.g>
      <g
        className="interest-hoop-net"
        stroke="var(--color-accent-light)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.7"
      >
        <path d="M120 44L125 63H144L150 44M122 51H148M124 57H146M128 44L133 63M143 44L137 63" />
      </g>
      <ellipse
        cx="135"
        cy="43"
        rx="16"
        ry="3"
        stroke={COLOR_TOKENS.interests.basketball}
        strokeWidth="2.8"
      />
      <g
        className="interest-score-spark"
        stroke="var(--color-brand-lavender)"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M105 29L101 26M111 19V14M158 53L164 55" />
      </g>
    </SceneFrame>
  );
}

function MusicScene({ active }: { active: boolean }) {
  return (
    <SceneFrame kind="music" active={active}>
      <ellipse
        cx="104"
        cy="105"
        rx="72"
        ry="7"
        fill="var(--color-brand-violet)"
        opacity="0.12"
      />
      <rect
        x="49"
        y="31"
        width="103"
        height="71"
        rx="12"
        fill="var(--color-surface-elevated)"
        stroke="var(--color-accent)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <rect
        x="55"
        y="37"
        width="91"
        height="59"
        rx="8"
        stroke="var(--color-brand-lavender)"
        strokeOpacity="0.1"
      />
      <g className="interest-record">
        <circle
          cx="95"
          cy="65"
          r="27"
          fill="var(--color-surface-ink)"
          stroke="var(--color-accent-deep)"
          strokeWidth="1.5"
        />
        <circle
          cx="95"
          cy="65"
          r="22"
          stroke="var(--color-accent)"
          strokeOpacity="0.22"
        />
        <circle
          cx="95"
          cy="65"
          r="17"
          stroke="var(--color-accent)"
          strokeOpacity="0.22"
        />
        <path
          d="M72 61A24 24 0 0 1 86 43M104 87A24 24 0 0 0 118 70"
          stroke="var(--color-brand-lavender)"
          strokeWidth="3"
          opacity="0.3"
        />
        <circle cx="95" cy="65" r="10" fill="var(--color-brand-violet)" />
        <path
          d="M90 60L100 70"
          stroke="var(--color-brand-lavender)"
          strokeWidth="2"
        />
      </g>
      <circle cx="95" cy="65" r="2" fill="var(--color-accent-light)" />
      <g className="interest-tonearm">
        <circle
          cx="135"
          cy="43"
          r="5"
          fill="var(--color-accent-deep)"
          stroke="var(--color-accent-light)"
        />
        <path
          d="M135 43L138 58L119 77"
          stroke="var(--color-accent-light)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 75L114 81"
          stroke="var(--color-brand-lavender)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      <circle cx="137" cy="89" r="2.5" fill="var(--color-status-success)" />
      <g className="interest-equalizer" fill="var(--color-brand-lavender)">
        {[7, 13, 9, 18, 12, 8, 15].map((height, index) => (
          <rect
            key={index}
            x={67 + index * 9}
            y={115 - height}
            width="4"
            height={height}
            rx="2"
          />
        ))}
      </g>
      <g
        className="interest-music-note"
        stroke="var(--color-accent-light)"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M155 22V12L163 10V20" />
        <ellipse
          cx="152"
          cy="24"
          rx="3"
          ry="2"
          fill="var(--color-accent-light)"
        />
        <ellipse
          cx="160"
          cy="22"
          rx="3"
          ry="2"
          fill="var(--color-accent-light)"
        />
      </g>
    </SceneFrame>
  );
}

const SCENES = {
  coffee: CoffeeScene,
  basketball: BasketballScene,
  music: MusicScene,
};

export function InterestScene({
  kind,
  active,
}: {
  kind: InterestSceneKind;
  active: boolean;
}) {
  const Scene = SCENES[kind];
  return <Scene active={active} />;
}
