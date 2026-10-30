export const BASKETBALL_DURATION = 5.2;

const GRAVITY = 120;
const SHOT_TIME = 1.65;
const RELEASE_TIME = 0.25;
const SHOT_VELOCITY = (-40 - 0.5 * GRAVITY * SHOT_TIME ** 2) / SHOT_TIME;
const RIM_VELOCITY = SHOT_VELOCITY + GRAVITY * SHOT_TIME;
const FALL_TIME =
  (Math.sqrt(RIM_VELOCITY ** 2 + 2 * GRAVITY * 40) - RIM_VELOCITY) / GRAVITY;
const ROLL_ROTATION = 180 / (Math.PI * 14);

function positionAt(time: number) {
  let t = time - RELEASE_TIME;
  if (t <= 0) return { x: 0, y: 0, rotate: 0 };
  if (t < SHOT_TIME) {
    const progress = t / SHOT_TIME;
    return {
      x: 53 * Math.sin((progress * Math.PI) / 2),
      y: SHOT_VELOCITY * t + 0.5 * GRAVITY * t * t,
      rotate: 170 * progress,
    };
  }
  t -= SHOT_TIME;
  if (t < FALL_TIME) {
    return {
      x: 53,
      y: -40 + RIM_VELOCITY * t + 0.5 * GRAVITY * t * t,
      rotate: 170 + ((53 * ROLL_ROTATION - 170) * t) / FALL_TIME,
    };
  }
  t -= FALL_TIME;
  if (t < 0.56) {
    const progress = t / 0.56;
    const x = 53 - 18 * progress;
    return { x, y: -36 * progress * (1 - progress), rotate: x * ROLL_ROTATION };
  }
  t -= 0.56;
  if (t < 0.32) {
    const progress = t / 0.32;
    const x = 35 - 12 * progress;
    return { x, y: -12 * progress * (1 - progress), rotate: x * ROLL_ROTATION };
  }
  const progress = Math.min((t - 0.32) / 1.2, 1);
  const x = 23 * (1 - progress) ** 2;
  return { x, y: 0, rotate: x * ROLL_ROTATION };
}

// Dense samples interpolate linearly, without easing to a stop at every waypoint.
const samples = Array.from({ length: 181 }, (_, index) =>
  positionAt((index / 180) * BASKETBALL_DURATION),
);

export const BASKETBALL_MOTION = {
  ball: {
    x: samples.map(({ x }) => x),
    y: samples.map(({ y }) => y),
    rotate: samples.map(({ rotate }) => rotate),
  },
  shadow: {
    x: samples.map(({ x }) => x),
    scaleX: samples.map(({ y }) => Math.max(0.4, 1 + y / 100)),
    opacity: samples.map(({ y }) => Math.max(0.2, 0.75 + y / 120)),
  },
};
