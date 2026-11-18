import { COLOR_TOKENS } from '@/lib/designTokens';
import { m } from 'framer-motion';
import {
  REDUCED_MOTION_MEDIA_QUERY,
  useMediaQuery,
} from '@/hooks/useMediaQuery';
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
      className={`interest-scene interest-scene-${kind} h-28 w-full max-w-60 shrink-0 sm:h-32`}
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
          <stop offset="0.5" stopColor="var(--color-accent-light)" />
          <stop offset="1" stopColor={COLOR_TOKENS.interests.coffee} />
        </linearGradient>
        <linearGradient id={`${id}-bag`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={COLOR_TOKENS.interests.coffee} />
          <stop offset="1" stopColor={COLOR_TOKENS.interests.espresso} />
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
          d="M53 66H70Q73 66 73 70L76 96Q77 102 71 102H52Q47 102 48 97L50 71Q50 66 53 66Z"
          fill={`url(#${id}-bag)`}
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
          rx="4"
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
          d="M46 24C43 29 36 44 42 51Q58 61 75 51C80 46 73 30 70 26Q58 20 46 24Z"
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
          d="M48 49Q59 53 70 49"
          stroke="var(--color-accent-deep)"
          strokeOpacity="0.45"
          strokeWidth="2"
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
        d="M80 49H128L112 69Q104 79 96 69L80 49Z"
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
      <path
        d="M140 87H164L163 98Q161 105 152 105Q143 105 141 98Z"
        fill={`url(#${id}-ceramic)`}
      />
      <path
        d="M149 94C146 91 144 96 152 100C160 96 158 91 155 94L152 96Z"
        fill={COLOR_TOKENS.interests.coffee}
        fillOpacity="0.85"
      />
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
  const id = useId();
  const shouldReduceMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY);
  const transition = active
    ? {
        duration: BASKETBALL_DURATION,
        ease: 'linear' as const,
        repeat: Infinity,
      }
    : { duration: shouldReduceMotion ? 0 : 0.25 };
  return (
    <SceneFrame kind="basketball" active={active}>
      <defs>
        <radialGradient id={`${id}-ball`} cx="0.3" cy="0.2" r="0.85">
          <stop stopColor="var(--color-brand-lavender)" />
          <stop offset="0.35" stopColor={COLOR_TOKENS.interests.basketball} />
          <stop offset="1" stopColor={COLOR_TOKENS.interests.coffee} />
        </radialGradient>
        <linearGradient id={`${id}-board`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-brand-lavender)" />
          <stop offset="1" stopColor="var(--color-accent)" />
        </linearGradient>
        <linearGradient id={`${id}-court`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--color-brand-muted)" stopOpacity="0.45" />
          <stop
            offset="1"
            stopColor="var(--color-accent-deep)"
            stopOpacity="0.3"
          />
        </linearGradient>
      </defs>
      <ellipse
        cx="101"
        cy="111"
        rx="76"
        ry="5"
        fill="var(--color-surface-ink)"
        opacity="0.35"
      />
      <path
        d="M49 88H152Q155 88 158 91L177 106Q181 111 174 111H27Q20 111 25 106L43 92Q46 88 49 88Z"
        fill={`url(#${id}-court)`}
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
        x="150"
        y="98"
        width="23"
        height="7"
        rx="3.5"
        fill="var(--color-accent-deep)"
      />
      <rect
        x="117"
        y="22"
        width="39"
        height="29"
        rx="7"
        fill="var(--color-accent-deep)"
      />
      <rect
        x="115"
        y="20"
        width="39"
        height="29"
        rx="7"
        fill={`url(#${id}-board)`}
        stroke="var(--color-accent-light)"
        strokeWidth="2"
      />
      <path
        d="M128 36V28H143V36"
        stroke="var(--color-brand-muted)"
        strokeWidth="1.6"
      />
      <path
        d="M121 25H125M121 25V29"
        stroke="var(--color-ink-primary)"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="149" cy="25" r="1" fill="var(--color-brand-muted)" />
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
          fill={`url(#${id}-ball)`}
          stroke={COLOR_TOKENS.interests.espresso}
          strokeWidth="1.7"
        />
        <path
          d="M68 83H96M82 69V97M73 72C83 78 83 88 73 94M91 72C81 78 81 88 91 94"
          stroke={COLOR_TOKENS.interests.espresso}
          strokeOpacity="0.7"
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
  const id = useId();
  return (
    <SceneFrame kind="music" active={active}>
      <defs>
        <linearGradient id={`${id}-case`} x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="var(--color-brand-lavender)" />
          <stop offset="0.65" stopColor="var(--color-brand-violet)" />
          <stop offset="1" stopColor="var(--color-brand-muted)" />
        </linearGradient>
        <radialGradient id={`${id}-vinyl`} cx="0.3" cy="0.2" r="0.8">
          <stop stopColor="var(--color-accent-deep)" />
          <stop offset="0.55" stopColor="var(--color-surface-panel)" />
          <stop offset="1" stopColor="var(--color-surface-ink)" />
        </radialGradient>
      </defs>
      <ellipse
        cx="104"
        cy="105"
        rx="72"
        ry="7"
        fill="var(--color-brand-violet)"
        opacity="0.12"
      />
      <rect
        x="58"
        y="106"
        width="13"
        height="7"
        rx="3"
        fill="var(--color-accent-deep)"
      />
      <rect
        x="131"
        y="106"
        width="13"
        height="7"
        rx="3"
        fill="var(--color-accent-deep)"
      />
      <rect
        x="49"
        y="40"
        width="103"
        height="68"
        rx="12"
        fill="var(--color-brand-deep)"
        stroke="var(--color-brand-muted)"
      />
      <rect
        x="49"
        y="31"
        width="103"
        height="71"
        rx="12"
        fill={`url(#${id}-case)`}
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
        strokeOpacity="0.6"
      />
      <path
        d="M58 47V43Q58 40 62 40H76"
        stroke="var(--color-brand-lavender)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle
        cx="95"
        cy="66"
        r="29"
        fill="var(--color-brand-deep)"
        fillOpacity="0.6"
      />
      <g className="interest-record">
        <circle
          cx="95"
          cy="65"
          r="27"
          fill={`url(#${id}-vinyl)`}
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
        <circle cx="95" cy="65" r="10" fill="var(--color-brand-lavender)" />
        <path
          d="M95 58C99 55 102 60 99 62C104 63 102 68 99 68C100 73 94 75 93 70C89 73 86 68 90 65C86 61 90 57 93 60Z"
          fill="var(--color-brand-violet)"
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
      <rect
        x="65"
        y="99"
        width="70"
        height="6"
        rx="3"
        fill="var(--color-surface-ink)"
        fillOpacity="0.6"
      />
      <g transform="translate(29 76) scale(0.7 0.25)">
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
      </g>
      <circle cx="60" cy="101" r="2" fill="var(--color-accent-light)" />
      <path
        d="M140 100V103M144 100V103"
        stroke="var(--color-accent-light)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
