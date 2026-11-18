export interface GeoRect {
  west: number;
  east: number;
  south: number;
  north: number;
}
export interface PlaneRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const OVERVIEW: GeoRect = {
  west: 127,
  east: 127.01,
  south: 37,
  north: 37.008,
};
export const DISTRICT: GeoRect = {
  west: 127.003,
  east: 127.008,
  south: 37.002,
  north: 37.006,
};
export const INITIAL_REGION: GeoRect = {
  west: 127.004,
  east: 127.0055,
  south: 37.003,
  north: 37.0042,
};
export const MIN_SPAN = 0.0002;
export function project(
  rect: GeoRect,
  bounds: GeoRect,
  width: number,
  height: number,
): PlaneRect {
  return {
    x: ((rect.west - bounds.west) / (bounds.east - bounds.west)) * width,
    y: ((bounds.north - rect.north) / (bounds.north - bounds.south)) * height,
    width: ((rect.east - rect.west) / (bounds.east - bounds.west)) * width,
    height:
      ((rect.north - rect.south) / (bounds.north - bounds.south)) * height,
  };
}
export function unproject(
  rect: PlaneRect,
  bounds: GeoRect,
  width: number,
  height: number,
): GeoRect {
  const longitude = (x: number) =>
    bounds.west + (x / width) * (bounds.east - bounds.west);
  const latitude = (y: number) =>
    bounds.north - (y / height) * (bounds.north - bounds.south);
  return {
    west: longitude(rect.x),
    east: longitude(rect.x + rect.width),
    north: latitude(rect.y),
    south: latitude(rect.y + rect.height),
  };
}
export function moveRegion(rect: GeoRect, dx: number, dy: number): GeoRect {
  const longitude = Math.max(
    DISTRICT.west - rect.west,
    Math.min(DISTRICT.east - rect.east, dx),
  );
  const latitude = Math.max(
    DISTRICT.south - rect.south,
    Math.min(DISTRICT.north - rect.north, dy),
  );
  return {
    west: rect.west + longitude,
    east: rect.east + longitude,
    north: rect.north + latitude,
    south: rect.south + latitude,
  };
}
export function resizeRegion(rect: GeoRect, dx: number, dy: number): GeoRect {
  return {
    ...rect,
    east: Math.max(
      rect.west + MIN_SPAN,
      Math.min(DISTRICT.east, rect.east + dx),
    ),
    south: Math.min(
      rect.north - MIN_SPAN,
      Math.max(DISTRICT.south, rect.south + dy),
    ),
  };
}
export function isValidRegion(value: unknown): value is GeoRect {
  if (!value || typeof value !== 'object') return false;
  const r = value as Partial<GeoRect>;
  if (
    ![r.west, r.east, r.north, r.south].every(
      (v) => typeof v === 'number' && Number.isFinite(v),
    )
  )
    return false;
  return (
    r.west! >= DISTRICT.west &&
    r.east! <= DISTRICT.east &&
    r.south! >= DISTRICT.south &&
    r.north! <= DISTRICT.north &&
    r.east! - r.west! >= MIN_SPAN - 1e-10 &&
    r.north! - r.south! >= MIN_SPAN - 1e-10
  );
}
