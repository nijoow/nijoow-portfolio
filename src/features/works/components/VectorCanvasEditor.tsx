'use client';

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import {
  angleAt,
  canvasPoint,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  freehandObject,
  fitObject,
  moveObject,
  resizeObject,
  type CanvasObject,
  type Point,
} from './vectorGeometry';
import styles from './VectorCanvasEditor.module.css';

type Tool = CanvasObject['kind'];
type Drag =
  | { mode: 'draw'; points: Point[] }
  | { mode: 'move' | 'resize' | 'rotate'; start: Point; object: CanvasObject };
const tools: { kind: Tool; label: string }[] = [
  { kind: 'arrow', label: '화살표' },
  { kind: 'rectangle', label: '사각형' },
  { kind: 'ellipse', label: '원' },
  { kind: 'freehand', label: '자유선 그리기' },
];
function ObjectShape({ object }: { object: CanvasObject }) {
  const { width: w, height: h } = object;
  const common = {
    fill: 'none',
    stroke: 'var(--color-brand-lavender)',
    strokeWidth: 3,
    vectorEffect: 'non-scaling-stroke' as const,
  };
  if (object.kind === 'rectangle')
    return (
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" {...common} />
    );
  if (object.kind === 'ellipse')
    return <ellipse rx={w / 2} ry={h / 2} {...common} />;
  if (object.kind === 'arrow')
    return (
      <path
        d={`M${-w / 2} 0H${w / 2} M${w / 2 - Math.min(20, w / 3)} ${-h / 2}L${w / 2} 0L${w / 2 - Math.min(20, w / 3)} ${h / 2}`}
        {...common}
      />
    );
  const d = object.points
    ?.map((p, i) => `${i ? 'L' : 'M'}${p.x * w - w / 2} ${p.y * h - h / 2}`)
    .join(' ');
  return (
    <path d={d} {...common} strokeLinecap="round" strokeLinejoin="round" />
  );
}
export function VectorCanvasEditor({
  variant = 'markup',
}: {
  variant?: 'markup' | 'vector';
}) {
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [menu, setMenu] = useState(false);
  const [draft, setDraft] = useState<Point[]>([]);
  const [announcement, setAnnouncement] = useState(
    '도구를 선택해 도형을 추가해 보세요.',
  );
  const toolsId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const canvas = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<Point>({ x: 300, y: 160 });
  const nextId = useRef(1);
  const drag = useRef<Drag | null>(null);
  const selected = objects.find((object) => object.id === selectedId);
  function update(object: CanvasObject) {
    setObjects((items) =>
      items.map((item) => (item.id === object.id ? object : item)),
    );
  }
  function choose(kind: Tool) {
    setMenu(false);
    if (kind === 'freehand') {
      setDrawing(true);
      setSelectedId(null);
      setAnnouncement(
        '자유선 모드. 캔버스에서 드래그하거나 방향키와 Enter로 그리세요.',
      );
      canvas.current?.focus();
      return;
    }
    setDrawing(false);
    trigger.current?.focus();
    const id = nextId.current++;
    const offset = (id % 5) * 18;
    const object: CanvasObject = {
      id,
      kind,
      cx: 240 + offset,
      cy: 120 + offset,
      width: 120,
      height: kind === 'arrow' ? 50 : 80,
      angle: 0,
    };
    setObjects((items) => [...items, object]);
    setSelectedId(id);
    setAnnouncement(
      `${tools.find((tool) => tool.kind === kind)?.label} 추가됨`,
    );
  }
  function coordinates(event: PointerEvent<SVGSVGElement>): Point {
    const bounds = event.currentTarget.getBoundingClientRect();
    const scale = Math.min(
      bounds.width / CANVAS_WIDTH,
      bounds.height / CANVAS_HEIGHT,
    );
    const xOffset = (bounds.width - CANVAS_WIDTH * scale) / 2,
      yOffset = (bounds.height - CANVAS_HEIGHT * scale) / 2;
    return canvasPoint({
      x: (event.clientX - bounds.left - xOffset) / scale,
      y: (event.clientY - bounds.top - yOffset) / scale,
    });
  }
  function start(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    const target = event.target as SVGElement;
    const mode = target.dataset.handle as 'resize' | 'rotate' | undefined;
    const id = Number(
      target.closest('[data-object]')?.getAttribute('data-object'),
    );
    const object = objects.find((item) => item.id === id);
    const point = coordinates(event);
    if (drawing) {
      drag.current = { mode: 'draw', points: [point] };
      setDraft([point]);
    } else if (object) {
      setSelectedId(object.id);
      drag.current = { mode: mode ?? 'move', start: point, object };
    } else {
      setSelectedId(null);
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    const operation = drag.current;
    if (!operation) return;
    const point = coordinates(event);
    if (operation.mode === 'draw') {
      operation.points.push(point);
      setDraft([...operation.points]);
      return;
    }
    const object = operation.object;
    if (operation.mode === 'move')
      update(
        moveObject(object, {
          x: point.x - operation.start.x,
          y: point.y - operation.start.y,
        }),
      );
    else if (operation.mode === 'resize') update(resizeObject(object, point));
    else update(fitObject({ ...object, angle: angleAt(object, point) }));
  }
  function finish() {
    const operation = drag.current;
    drag.current = null;
    if (operation?.mode !== 'draw') return;
    const object = freehandObject(nextId.current, operation.points);
    setDraft([]);
    if (object) {
      nextId.current++;
      setObjects((items) => [...items, object]);
      setSelectedId(object.id);
      setDrawing(false);
      setAnnouncement('자유선을 SVG 도형으로 추가했습니다.');
    }
  }
  function key(event: KeyboardEvent<SVGGElement>, object: CanvasObject) {
    const delta: Record<string, Point> = {
      ArrowLeft: { x: -5, y: 0 },
      ArrowRight: { x: 5, y: 0 },
      ArrowUp: { x: 0, y: -5 },
      ArrowDown: { x: 0, y: 5 },
    };
    const movement = delta[event.key];
    if (movement) {
      event.preventDefault();
      update(moveObject(object, movement));
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      remove();
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedId(object.id);
    }
  }
  function canvasKey(event: KeyboardEvent<SVGSVGElement>) {
    if (!drawing) return;
    const directions: Record<string, Point> = {
      ArrowLeft: { x: -5, y: 0 },
      ArrowRight: { x: 5, y: 0 },
      ArrowUp: { x: 0, y: -5 },
      ArrowDown: { x: 0, y: 5 },
    };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault();
      const point = canvasPoint({
        x: cursor.x + direction.x,
        y: cursor.y + direction.y,
      });
      setCursor(point);
      if (drag.current?.mode === 'draw') {
        drag.current.points.push(point);
        setDraft([...drag.current.points]);
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (drag.current?.mode === 'draw') finish();
      else {
        drag.current = { mode: 'draw', points: [cursor] };
        setDraft([cursor]);
        setAnnouncement('방향키로 선을 그리고 Enter로 완료하세요.');
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      finish();
      setDrawing(false);
      trigger.current?.focus();
    }
  }
  function remove() {
    if (selectedId === null) return;
    setObjects((items) => items.filter((item) => item.id !== selectedId));
    setSelectedId(null);
    setAnnouncement('선택한 도형을 삭제했습니다.');
  }
  function scale(factor: number) {
    if (!selected) return;
    const point = {
      x: (selected.width * factor) / 2,
      y: (selected.height * factor) / 2,
    };
    update(
      fitObject({
        ...selected,
        width: Math.max(16, Math.min(CANVAS_WIDTH, point.x * 2)),
        height: Math.max(16, Math.min(CANVAS_HEIGHT, point.y * 2)),
      }),
    );
  }
  let modeText = '선택된 도형 없음';
  if (selected)
    modeText = `${tools.find((tool) => tool.kind === selected.kind)?.label} 선택됨`;
  if (drawing) modeText = '자유선 그리기 중';
  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <div
          className={styles.popup}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setMenu(false);
              event.currentTarget
                .querySelector<HTMLButtonElement>('button')
                ?.focus();
            }
          }}
        >
          <button
            ref={trigger}
            type="button"
            aria-expanded={menu}
            aria-controls={menu ? toolsId : undefined}
            onClick={() => setMenu(!menu)}
          >
            도구 선택
          </button>
          {menu ? (
            <div
              className={styles.menu}
              id={toolsId}
              role="group"
              aria-label="그리기 도구"
            >
              {tools.map((tool) => (
                <button
                  key={tool.kind}
                  type="button"
                  onClick={() => choose(tool.kind)}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {drawing ? (
          <button
            type="button"
            onClick={() => {
              finish();
              setDrawing(false);
            }}
          >
            그리기 종료
          </button>
        ) : null}
        <button type="button" disabled={!selected} onClick={() => scale(0.9)}>
          축소
        </button>
        <button type="button" disabled={!selected} onClick={() => scale(1.1)}>
          확대
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() =>
            selected &&
            update(fitObject({ ...selected, angle: selected.angle - 15 }))
          }
        >
          왼쪽 회전
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() =>
            selected &&
            update(fitObject({ ...selected, angle: selected.angle + 15 }))
          }
        >
          오른쪽 회전
        </button>
        <button type="button" disabled={!selected} onClick={remove}>
          삭제
        </button>
        <button
          type="button"
          disabled={!objects.length && !drawing}
          onClick={() => {
            drag.current = null;
            setDraft([]);
            setObjects([]);
            setSelectedId(null);
            setDrawing(false);
            setAnnouncement('캔버스를 비웠습니다.');
          }}
        >
          초기화
        </button>
      </div>
      <svg
        ref={canvas}
        className={styles.canvas}
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        role="group"
        tabIndex={0}
        onKeyDown={canvasKey}
        aria-label={
          variant === 'markup' ? '도면 표시 편집 캔버스' : '벡터 편집 캔버스'
        }
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={finish}
        onPointerCancel={finish}
        onLostPointerCapture={finish}
      >
        <path
          d="M0 80H600M0 160H600M0 240H600M100 0V320M200 0V320M300 0V320M400 0V320M500 0V320"
          fill="none"
          stroke="currentColor"
          opacity=".08"
        />
        {objects.map((object) => (
          <g
            key={object.id}
            data-object={object.id}
            transform={`translate(${object.cx} ${object.cy}) rotate(${object.angle})`}
            className={styles.object}
            tabIndex={0}
            role="button"
            aria-label={`${tools.find((tool) => tool.kind === object.kind)?.label} ${object.id}${object.id === selectedId ? ', 선택됨' : ''}`}
            onFocus={() => setSelectedId(object.id)}
            onKeyDown={(event) => key(event, object)}
          >
            <rect
              x={-object.width / 2}
              y={-object.height / 2}
              width={object.width}
              height={object.height}
              fill="transparent"
            />
            <ObjectShape object={object} />
            {object.id === selectedId ? (
              <g>
                <rect
                  x={-object.width / 2}
                  y={-object.height / 2}
                  width={object.width}
                  height={object.height}
                  fill="none"
                  stroke="var(--color-ink-secondary)"
                  strokeDasharray="5 4"
                  pointerEvents="none"
                />
                <path
                  d={`M0 ${-object.height / 2}v-25`}
                  stroke="var(--color-ink-secondary)"
                  pointerEvents="none"
                />
                <circle
                  data-handle="rotate"
                  className={`${styles.handle} ${styles.rotate}`}
                  cx="0"
                  cy={-object.height / 2 - 25}
                  r="8"
                />
                <rect
                  data-handle="resize"
                  className={styles.handle}
                  x={object.width / 2 - 8}
                  y={object.height / 2 - 8}
                  width="16"
                  height="16"
                  rx="2"
                />
              </g>
            ) : null}
          </g>
        ))}
        {drawing ? (
          <circle
            cx={cursor.x}
            cy={cursor.y}
            r="5"
            fill="var(--color-brand-lavender)"
            pointerEvents="none"
          />
        ) : null}
        {draft.length > 1 ? (
          <polyline
            points={draft.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="none"
            stroke="var(--color-brand-lavender)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
      <p className={styles.hint} role="status">
        {announcement} {modeText}
      </p>
      <small className={styles.hint}>
        드래그로 이동하고 손잡이로 크기와 회전을 조절하세요.
        <br />
        키보드: 방향키로 이동, 버튼으로 변형. 자유선은 Enter와 방향키로
        그립니다.
      </small>
    </div>
  );
}
