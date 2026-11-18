import { describe, expect, it } from 'vitest';
import {
  angleAt,
  fitObject,
  freehandObject,
  moveObject,
  resizeObject,
  rotate,
  type CanvasObject,
} from './vectorGeometry';

const object: CanvasObject = {
  id: 1,
  kind: 'rectangle',
  cx: 250,
  cy: 150,
  width: 100,
  height: 60,
  angle: 90,
};
describe('vector geometry', () => {
  it('resizes a rotated object in its local axes while keeping the opposite corner fixed', () => {
    const oldCorner = rotate({ x: -50, y: -30 }, 90);
    const pointer = rotate({ x: 80, y: 50 }, 90);
    const resized = resizeObject(object, {
      x: object.cx + pointer.x,
      y: object.cy + pointer.y,
    });
    expect(resized.width).toBeCloseTo(130);
    expect(resized.height).toBeCloseTo(80);
    const newCorner = rotate(
      { x: -resized.width / 2, y: -resized.height / 2 },
      90,
    );
    expect(resized.cx + newCorner.x).toBeCloseTo(object.cx + oldCorner.x);
    expect(resized.cy + newCorner.y).toBeCloseTo(object.cy + oldCorner.y);
  });
  it('keeps transformed rotated bounds within the canvas', () => {
    const moved = moveObject(object, { x: -1000, y: -1000 });
    expect(moved.cx).toBeCloseTo(30);
    expect(moved.cy).toBeCloseTo(50);
    const fitted = fitObject({ ...object, width: 590, height: 300, angle: 45 });
    const projectedHeight = Math.SQRT1_2 * (fitted.width + fitted.height);
    expect(projectedHeight).toBeLessThanOrEqual(320.00001);
    expect(angleAt(object, { x: object.cx + 100, y: object.cy })).toBe(90);
  });
  it('normalizes freehand stroke points for later transform and rejects taps', () => {
    expect(freehandObject(1, [{ x: 1, y: 2 }])).toBeNull();
    const shape = freehandObject(2, [
      { x: 30, y: 60 },
      { x: 130, y: 110 },
    ]);
    expect(shape?.points).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]);
    expect(shape).toMatchObject({ cx: 80, cy: 85, width: 100, height: 50 });
  });
});
