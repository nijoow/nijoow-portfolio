export type Point = { x: number; y: number };
export type CanvasObject = {
  id: number;
  kind: 'rectangle' | 'ellipse' | 'arrow' | 'freehand';
  cx: number;
  cy: number;
  width: number;
  height: number;
  angle: number;
  points?: Point[];
};
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 320;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
export function canvasPoint(p: Point): Point {
  return { x: clamp(p.x, 0, CANVAS_WIDTH), y: clamp(p.y, 0, CANVAS_HEIGHT) };
}
export function rotate(p: Point, degrees: number): Point {
  const rad = (degrees * Math.PI) / 180;
  return {
    x: p.x * Math.cos(rad) - p.y * Math.sin(rad),
    y: p.x * Math.sin(rad) + p.y * Math.cos(rad),
  };
}
export function moveObject(object: CanvasObject, delta: Point): CanvasObject {
  const rad = (object.angle * Math.PI) / 180;
  const ex = Math.min(
    CANVAS_WIDTH / 2,
    (Math.abs(Math.cos(rad)) * object.width +
      Math.abs(Math.sin(rad)) * object.height) /
      2,
  );
  const ey = Math.min(
    CANVAS_HEIGHT / 2,
    (Math.abs(Math.sin(rad)) * object.width +
      Math.abs(Math.cos(rad)) * object.height) /
      2,
  );
  return {
    ...object,
    cx: clamp(object.cx + delta.x, ex, CANVAS_WIDTH - ex),
    cy: clamp(object.cy + delta.y, ey, CANVAS_HEIGHT - ey),
  };
}
export function fitObject(object: CanvasObject): CanvasObject {
  const radians = (object.angle * Math.PI) / 180;
  const c = Math.abs(Math.cos(radians)),
    s = Math.abs(Math.sin(radians));
  const projectedWidth = c * object.width + s * object.height;
  const projectedHeight = s * object.width + c * object.height;
  const factor = Math.min(
    1,
    CANVAS_WIDTH / projectedWidth,
    CANVAS_HEIGHT / projectedHeight,
  );
  return moveObject(
    { ...object, width: object.width * factor, height: object.height * factor },
    { x: 0, y: 0 },
  );
}
export function resizeObject(object: CanvasObject, point: Point): CanvasObject {
  const local = rotate(
    { x: point.x - object.cx, y: point.y - object.cy },
    -object.angle,
  );
  const width = clamp(local.x + object.width / 2, 16, CANVAS_WIDTH);
  const height = clamp(local.y + object.height / 2, 16, CANVAS_HEIGHT);
  const shift = rotate(
    { x: (width - object.width) / 2, y: (height - object.height) / 2 },
    object.angle,
  );
  return fitObject({
    ...object,
    width,
    height,
    cx: object.cx + shift.x,
    cy: object.cy + shift.y,
  });
}
export function angleAt(object: CanvasObject, point: Point): number {
  return Math.round(
    (Math.atan2(point.y - object.cy, point.x - object.cx) * 180) / Math.PI + 90,
  );
}
export function freehandObject(
  id: number,
  points: Point[],
): CanvasObject | null {
  if (points.length < 2) return null;
  const xs = points.map((p) => p.x),
    ys = points.map((p) => p.y);
  const minX = Math.min(...xs),
    minY = Math.min(...ys);
  const width = Math.max(2, Math.max(...xs) - minX),
    height = Math.max(2, Math.max(...ys) - minY);
  return {
    id,
    kind: 'freehand',
    cx: minX + width / 2,
    cy: minY + height / 2,
    width,
    height,
    angle: 0,
    points: points.map((p) => ({
      x: (p.x - minX) / width,
      y: (p.y - minY) / height,
    })),
  };
}
