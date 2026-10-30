import type { StudyDiagram } from '../data/workStudyGuides';

function CoordinatePlane({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 240 126"
      aria-label={label}
      role="img"
      className="study-plane"
    >
      <rect
        x="18"
        y="12"
        width="204"
        height="100"
        rx="8"
        fill="none"
        stroke="currentColor"
      />
      <path
        d="M86 12V112M154 12V112M18 45H222M18 78H222"
        fill="none"
        stroke="currentColor"
        opacity=".2"
      />
      <path
        d="M18 12L150 69"
        fill="none"
        stroke="currentColor"
        strokeDasharray="4 4"
        opacity=".6"
      />
      <rect
        x="132"
        y="56"
        width="36"
        height="26"
        rx="3"
        fill="currentColor"
        opacity=".18"
      />
      <circle cx="150" cy="69" r="5" fill="currentColor" />
      <text x="25" y="29" fill="currentColor" fontSize="10">
        모서리 기준
      </text>
      <text x="143" y="99" fill="currentColor" fontSize="10">
        작업 위치
      </text>
    </svg>
  );
}

export function WorkDiagram({ diagram }: { diagram: StudyDiagram }) {
  return (
    <figure className="study-diagram" aria-label={diagram.title}>
      <figcaption className="study-diagram-title">{diagram.title}</figcaption>
      {diagram.kind === 'hierarchy' ? (
        <div className="study-compare">
          <div>
            <span className="study-label">기존 · 평면 목록</span>
            <div className="study-row">폴더 / 파일</div>
            <div className="study-row">자산 항목</div>
            <div className="study-row">자산 항목</div>
          </div>
          <div>
            <span className="study-label">변경 · 관계 표시</span>
            <div className="study-row study-emphasis">클래스</div>
            <div className="study-child">인스턴스 A</div>
            <div className="study-child">인스턴스 B</div>
          </div>
        </div>
      ) : (
        <ol
          className={
            diagram.kind === 'responsibilities'
              ? 'study-flow study-parallel'
              : 'study-flow'
          }
        >
          {diagram.nodes.map((node, index) => (
            <li key={node.label}>
              {diagram.kind === 'coordinates' && index !== 1 ? (
                <CoordinatePlane label={node.label} />
              ) : null}
              <strong>{node.label}</strong>
              <span className="study-node-detail">{node.detail}</span>
            </li>
          ))}
        </ol>
      )}
      {diagram.kind === 'formula' ? (
        <div className="study-keyboard">
          <span>커서 이동</span>
          <span>
            ← <b>변수 전체</b> →
          </span>
          <span>Backspace → 변수 단위 삭제</span>
        </div>
      ) : null}
    </figure>
  );
}
