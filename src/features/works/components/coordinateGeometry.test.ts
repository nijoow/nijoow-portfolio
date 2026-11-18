import { describe, expect, it } from 'vitest';
import {
  DISTRICT,
  OVERVIEW,
  INITIAL_REGION,
  MIN_SPAN,
  project,
  unproject,
  moveRegion,
  resizeRegion,
  isValidRegion,
} from './coordinateGeometry';
describe('geographic region editing', () => {
  it('round-trips each geographic edge through both differently sized planes', () => {
    for (const [bounds, width, height] of [
      [OVERVIEW, 300, 240],
      [DISTRICT, 360, 220],
    ] as const) {
      const restored = unproject(
        project(INITIAL_REGION, bounds, width, height),
        bounds,
        width,
        height,
      );
      for (const edge of ['west', 'east', 'south', 'north'] as const)
        expect(restored[edge]).toBeCloseTo(INITIAL_REGION[edge], 10);
    }
  });
  it('clamps movement without shrinking the geographic extent', () => {
    for (const delta of [-100, 100]) {
      const moved = moveRegion(INITIAL_REGION, delta, delta);
      expect(isValidRegion(moved)).toBe(true);
      expect(moved.east - moved.west).toBeCloseTo(
        INITIAL_REGION.east - INITIAL_REGION.west,
        10,
      );
      expect(moved.north - moved.south).toBeCloseTo(
        INITIAL_REGION.north - INITIAL_REGION.south,
        10,
      );
    }
  });
  it('clamps resizing at minimum size and district edges', () => {
    const small = resizeRegion(INITIAL_REGION, -100, 100);
    expect(small.east - small.west).toBeCloseTo(MIN_SPAN, 10);
    expect(small.north - small.south).toBeCloseTo(MIN_SPAN, 10);
    const large = resizeRegion(INITIAL_REGION, 100, -100);
    expect(large.east).toBe(DISTRICT.east);
    expect(large.south).toBe(DISTRICT.south);
  });
  it('accepts a saved snapshot and rejects malformed or out-of-bounds values', () => {
    expect(isValidRegion(JSON.parse(JSON.stringify(INITIAL_REGION)))).toBe(
      true,
    );
    for (const value of [
      null,
      {},
      { ...INITIAL_REGION, west: NaN },
      { ...INITIAL_REGION, east: Infinity },
      { ...INITIAL_REGION, west: '127' },
      { ...INITIAL_REGION, east: DISTRICT.east + 1 },
      { ...INITIAL_REGION, south: INITIAL_REGION.north },
    ])
      expect(isValidRegion(value)).toBe(false);
  });
});
