'use client';

import { Folder } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export function InheritanceDiagram() {
  const [hierarchy, setHierarchy] = useState(true);
  const items = [
    { label: '일반 폴더', depth: 0 },
    { label: '클래스 A', depth: 0 },
    { label: '클래스 B', depth: 1 },
    { label: '인스턴스 B-1', depth: 2 },
    { label: '인스턴스 A-1', depth: 1 },
  ];
  return (
    <div>
      <div className="diagram-controls">
        <button
          type="button"
          aria-pressed={!hierarchy}
          onClick={() => setHierarchy(false)}
        >
          평면 목록
        </button>
        <button
          type="button"
          aria-pressed={hierarchy}
          onClick={() => setHierarchy(true)}
        >
          상속 관계 표시
        </button>
      </div>
      <ul
        className="inheritance-list"
        aria-label={
          hierarchy
            ? '상속 관계가 보이는 폴더 목록'
            : '모든 항목을 같은 깊이로 나열한 목록'
        }
      >
        {items.map(({ label, depth }) => (
          <li
            key={label}
            style={{ marginInlineStart: `${hierarchy ? depth * 1.6 : 0}rem` }}
          >
            {hierarchy && depth > 0 ? (
              <span className="inheritance-branch" aria-hidden />
            ) : null}
            <Folder size={17} aria-hidden />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrawingPlane({
  position,
  detail,
}: {
  position: number;
  detail: boolean;
}) {
  const x = detail ? 25 + position * 2.5 : 130 + position * 1.1;
  return (
    <svg
      viewBox="0 0 300 190"
      role="img"
      aria-label={
        detail
          ? '상세 도면에서 변환된 작업 위치'
          : '전체 도면에서 선택한 구역과 작업 위치'
      }
    >
      <rect
        x="15"
        y="15"
        width="270"
        height="160"
        rx="8"
        className="diagram-plane"
      />
      <path
        d="M15 55H285M15 95H285M15 135H285M70 15V175M125 15V175M180 15V175M235 15V175"
        className="diagram-grid"
      />
      {detail ? null : (
        <rect
          x="130"
          y="60"
          width="110"
          height="90"
          className="diagram-region"
        />
      )}
      <path
        d={`M${detail ? 25 : 130} ${detail ? 25 : 60}L${x} ${detail ? 105 : 110}`}
        className="diagram-guide"
      />
      <rect
        x={x - (detail ? 27 : 12)}
        y={detail ? 88 : 99}
        width={detail ? 54 : 24}
        height={detail ? 34 : 22}
        className="diagram-region"
      />
      <circle cx={x} cy={detail ? 105 : 110} r="5" className="diagram-point" />
    </svg>
  );
}

export function CoordinateDiagram() {
  const [position, setPosition] = useState(55);
  return (
    <div>
      <div className="diagram-pair">
        <div>
          <span className="study-label">전체 도면 · 선택한 구역</span>
          <DrawingPlane position={position} detail={false} />
        </div>
        <div>
          <span className="study-label">상세 도면 · 변환한 위치</span>
          <DrawingPlane position={position} detail />
        </div>
      </div>
      <label className="diagram-range">
        작업 위치 옮겨보기
        <input
          type="range"
          min="10"
          max="90"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </label>
      <p className="diagram-caption">
        이미지 크기가 달라도 모서리 기준으로 같은 작업 위치를 연결합니다.
      </p>
    </div>
  );
}

function curveBounds(bend: number) {
  const a = -35,
    b = 390 - 3 * bend,
    c = 3 * bend - 390;
  const discriminant = 4 * b * b - 12 * a * c;
  const roots = [
    (-2 * b + Math.sqrt(discriminant)) / (6 * a),
    (-2 * b - Math.sqrt(discriminant)) / (6 * a),
  ];
  const positions = [0, 1, ...roots.filter((t) => t > 0 && t < 1)];
  const values = positions.map(
    (t) => 130 * (1 - t) ** 3 + 3 * bend * t * (1 - t) + 95 * t ** 3,
  );
  const top = Math.min(...values) - 5;
  return { y: top, height: Math.max(...values) - top + 5 };
}

export function PathBoundsDiagram() {
  const [bend, setBend] = useState(28);
  const bounds = curveBounds(bend);
  return (
    <div>
      <svg
        viewBox="0 0 300 180"
        role="img"
        aria-label="자유 곡선의 크기에 따라 바뀌는 SVG 범위"
      >
        <rect
          x="40"
          y={bounds.y}
          width="220"
          height={bounds.height}
          className="diagram-bounds"
        />
        <path
          d={`M45 130C90 ${bend} 170 ${bend} 255 95`}
          className="diagram-curve"
        />
        <circle cx="45" cy="130" r="4" className="diagram-point" />
        <circle cx="255" cy="95" r="4" className="diagram-point" />
      </svg>
      <label className="diagram-range">
        곡선 높이 바꿔보기
        <input
          type="range"
          min="5"
          max="100"
          value={bend}
          onChange={(event) => setBend(Number(event.target.value))}
        />
      </label>
      <code className="diagram-code">
        viewBox=&quot;40 {Math.round(bounds.y)} 220 {Math.round(bounds.height)}
        &quot;
      </code>
      <p className="diagram-caption">
        그린 경로가 들어갈 범위를 구해 하나의 SVG 요소로 묶습니다.
      </p>
    </div>
  );
}

const FORMULA = '1 + {_값_} × 2';
const CURSOR_STOPS = [0, 4, 9, FORMULA.length];

export function FormulaDiagram() {
  const input = useRef<HTMLTextAreaElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [cursor, setCursor] = useState(4);
  useEffect(() => {
    input.current?.setSelectionRange(4, 4);
  }, []);
  function placeCursor(position: number) {
    input.current?.focus({ preventScroll: true });
    input.current?.setSelectionRange(position, position);
    setCursor(position);
  }
  function move(direction: -1 | 1) {
    const from = input.current?.selectionStart ?? cursor;
    const stops = direction > 0 ? CURSOR_STOPS : [...CURSOR_STOPS].reverse();
    placeCursor(
      stops.find((stop) => (direction > 0 ? stop > from : stop < from)) ??
        (direction > 0 ? FORMULA.length : 0),
    );
  }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  }
  return (
    <div>
      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="커서를 왼쪽 경계로 이동"
        >
          ← 커서
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="커서를 오른쪽 경계로 이동"
        >
          커서 →
        </button>
        <button
          type="button"
          aria-pressed={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          두 레이어 펼쳐보기
        </button>
      </div>
      <div className="formula-stack" data-expanded={expanded}>
        <textarea
          ref={input}
          readOnly
          value={FORMULA}
          rows={1}
          spellCheck={false}
          aria-label="수식 커서 이동 살펴보기"
          onKeyDown={keyDown}
          onClick={() => {
            const position = input.current?.selectionStart ?? 0;
            if (position > 4 && position < 9) placeCursor(9);
            else setCursor(position);
          }}
          className="formula-input"
        />
        <div className="formula-display" aria-hidden>
          1 +{' '}
          <span className="formula-token">
            <span>{'{_값_}'}</span>
            <b>값</b>
          </span>{' '}
          × 2
        </div>
      </div>
      <p className="diagram-caption" aria-live="polite">
        {expanded
          ? '위: 실제 입력 문자열 · 아래: 변수 박스를 그리는 표시층'
          : '입력 문자열 위에 변수 박스를 겹칩니다.'}{' '}
        커서 위치: {cursor}
      </p>
    </div>
  );
}

const COMPOSITION = [
  { keys: 'ㄱ', fixed: '', composing: 'ㄱ' },
  { keys: 'ㄱ ㅏ', fixed: '', composing: '가' },
  { keys: 'ㄱ ㅏ ㄴ', fixed: '', composing: '간' },
  { keys: 'ㄱ ㅏ ㄴ ㅏ', fixed: '가', composing: '나' },
  { keys: '커서 이동', fixed: '가나', composing: '' },
] as const;

export function CompositionDiagram() {
  const [step, setStep] = useState(0);
  const current = COMPOSITION[step] ?? COMPOSITION[0];
  return (
    <div>
      <ol className="composition-steps" aria-label="한글 입력 단계">
        {COMPOSITION.map((item, index) => (
          <li key={item.keys}>
            <button
              type="button"
              aria-pressed={step === index}
              onClick={() => setStep(index)}
            >
              {index < 4 ? ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ'][index] : '커서 이동'}
            </button>
          </li>
        ))}
      </ol>
      <div className="composition-output" aria-live="polite">
        <span>{current.fixed}</span>
        <mark>{current.composing}</mark>
        <span className="composition-caret" aria-hidden />
      </div>
      <p className="diagram-caption">
        입력: {current.keys} ·{' '}
        {current.composing
          ? '강조한 글자가 현재 조합 중인 부분입니다.'
          : '커서를 옮기기 전에 조합을 확정합니다.'}
      </p>
    </div>
  );
}

export function RotationDiagram() {
  const [angle, setAngle] = useState(30);
  const [width, setWidth] = useState(140);
  return (
    <div>
      <svg
        viewBox="0 0 320 230"
        role="img"
        aria-label="도형과 함께 회전하는 가로축과 크기 조절점"
      >
        <path d="M20 115H300M160 15V215" className="diagram-grid" />
        <g transform={`rotate(${angle} 160 115)`}>
          <rect
            x={160 - width / 2}
            y="75"
            width={width}
            height="80"
            className="diagram-region"
          />
          <path d="M55 115H265M160 40V190" className="diagram-guide" />
          <circle
            cx={160 + width / 2}
            cy="155"
            r="6"
            className="diagram-point"
          />
        </g>
        <circle cx="160" cy="115" r="3" className="diagram-point" />
      </svg>
      <div className="diagram-pair">
        <label className="diagram-range">
          회전 {angle}°
          <input
            type="range"
            min="-60"
            max="60"
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
          />
        </label>
        <label className="diagram-range">
          도형 너비
          <input
            type="range"
            min="70"
            max="185"
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
          />
        </label>
      </div>
      <p className="diagram-caption">
        회전각을 되돌린 상대 좌표에서 도형의 크기를 계산합니다.
      </p>
    </div>
  );
}
