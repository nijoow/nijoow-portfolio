'use client';

import { useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import {
  DISTRICT,
  INITIAL_REGION,
  OVERVIEW,
  project,
  unproject,
  moveRegion,
  resizeRegion,
  isValidRegion,
  type GeoRect,
} from './coordinateGeometry';
import styles from './CoordinateMappingDemo.module.css';

function Plane({
  detail,
  region,
  onChange,
}: {
  detail: boolean;
  region: GeoRect;
  onChange: (rect: GeoRect) => void;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    original: GeoRect;
    resize: boolean;
  } | null>(null);
  const bounds = detail ? DISTRICT : OVERVIEW;
  const width = detail ? 360 : 300;
  const height = detail ? 220 : 240;
  const selected = project(region, bounds, width, height);
  const district = project(DISTRICT, bounds, width, height);
  const point = (event: PointerEvent<SVGRectElement>) => {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix) return null;
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
  };
  const start = (event: PointerEvent<SVGRectElement>, resize: boolean) => {
    if (event.button !== 0 || gesture.current) return;
    const p = point(event);
    if (!p) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      id: event.pointerId,
      x: p.x,
      y: p.y,
      original: region,
      resize,
    };
  };
  const move = (event: PointerEvent<SVGRectElement>) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    const p = point(event);
    if (!p) return;
    const original = project(g.original, bounds, width, height);
    const next = unproject(
      { ...original, x: original.x + p.x - g.x, y: original.y + p.y - g.y },
      bounds,
      width,
      height,
    );
    const dx = next.west - g.original.west;
    const dy = next.north - g.original.north;
    onChange(
      g.resize
        ? resizeRegion(g.original, dx, dy)
        : moveRegion(g.original, dx, dy),
    );
  };
  const end = (event: PointerEvent<SVGRectElement>) => {
    if (gesture.current?.id !== event.pointerId) return;
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const keyboard = (event: KeyboardEvent<SVGRectElement>, resize: boolean) => {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, 1],
      ArrowDown: [0, -1],
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const amount = event.shiftKey ? 0.0002 : 0.00005;
    onChange(
      (resize ? resizeRegion : moveRegion)(
        region,
        step[0] * amount,
        step[1] * amount,
      ),
    );
  };
  const events = {
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: () => {
      gesture.current = null;
    },
  };
  const name = detail ? '상세 도면' : '전체 도면';
  return (
    <div className={styles.plane}>
      <div className={styles.heading}>
        <strong>{name}</strong>
        <span>{detail ? '선택 구역 확대' : '구역과 작업 위치'}</span>
      </div>
      <svg
        ref={svg}
        viewBox={`-8 -8 ${width + 16} ${height + 16}`}
        aria-label={`${name} 작업 위치 편집`}
        className={styles.canvas}
      >
        <rect
          width={width}
          height={height}
          rx="8"
          className={styles.background}
        />
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M${(width * (i + 1)) / 8} 0V${height}M0 ${(height * (i + 1)) / 8}H${width}`}
            className={styles.grid}
          />
        ))}
        {!detail && (
          <rect
            x={district.x}
            y={district.y}
            width={district.width}
            height={district.height}
            rx="3"
            className={styles.district}
          />
        )}
        <rect
          x={selected.x}
          y={selected.y}
          width={selected.width}
          height={selected.height}
          rx="3"
          className={styles.region}
          tabIndex={0}
          role="button"
          aria-label={`${name} 작업 영역 이동: 방향키 사용`}
          onKeyDown={(e) => keyboard(e, false)}
          onPointerDown={(e) => start(e, false)}
          {...events}
        />
        <path
          d={`M${selected.x + selected.width / 2 - 4} ${selected.y + selected.height / 2}h8m-4 -4v8`}
          className={styles.cross}
        />
        <rect
          x={selected.x + selected.width - 9}
          y={selected.y + selected.height - 9}
          width="18"
          height="18"
          rx="4"
          className={styles.handle}
          tabIndex={0}
          role="button"
          aria-label={`${name} 작업 영역 크기 조절: 방향키 사용`}
          onKeyDown={(e) => keyboard(e, true)}
          onPointerDown={(e) => start(e, true)}
          {...events}
        />
      </svg>
      <span className={styles.corner}>
        {bounds.north.toFixed(4)}°N · {bounds.west.toFixed(4)}°E ↔{' '}
        {bounds.south.toFixed(4)}°N · {bounds.east.toFixed(4)}°E
      </span>
    </div>
  );
}

export function CoordinateMappingDemo() {
  const [region, setRegion] = useState<GeoRect>(INITIAL_REGION);
  const saved = useRef<GeoRect | null>(null);
  const [hasSaved, setHasSaved] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <div className={styles.demo}>
      <small className={styles.help}>
        영역을 끌어 이동하고 오른쪽 아래 손잡이로 크기를 조절하세요.
      </small>
      <div className={styles.planes}>
        <Plane detail={false} region={region} onChange={setRegion} />
        <Plane detail region={region} onChange={setRegion} />
      </div>
      <div className={styles.readout}>
        <span>
          북서 {region.north.toFixed(5)}°N / {region.west.toFixed(5)}°E
        </span>
        <span>
          남동 {region.south.toFixed(5)}°N / {region.east.toFixed(5)}°E
        </span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => {
            saved.current = { ...region };
            setHasSaved(true);
            setMessage('현재 위치와 크기를 저장했습니다.');
          }}
        >
          위치 저장
        </button>
        <button
          type="button"
          disabled={!hasSaved}
          onClick={() => {
            if (isValidRegion(saved.current)) {
              setRegion({ ...saved.current });
              setMessage('저장한 위치와 크기를 불러왔습니다.');
            }
          }}
        >
          저장값 불러오기
        </button>
        <span role="status">{message}</span>
      </div>
      <small className={styles.help}>
        Tab으로 선택 · 방향키로 조절 · Shift로 크게 이동
      </small>
    </div>
  );
}
