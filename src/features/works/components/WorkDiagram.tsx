import type { ComponentType } from 'react';
import type { StudyDiagram } from '../data/workStudyGuides';
import {
  CompositionDiagram,
  CoordinateDiagram,
  FormulaDiagram,
  InheritanceDiagram,
  PathBoundsDiagram,
  RotationDiagram,
} from './WorkInteractiveDiagrams';
import { SheetRangeDiagram } from './SheetRangeDiagram';

const INTERACTIVE_DIAGRAMS: Record<string, ComponentType> = {
  hierarchy: InheritanceDiagram,
  coordinates: CoordinateDiagram,
  'path-bounds': PathBoundsDiagram,
  formula: FormulaDiagram,
  'sheet-range': SheetRangeDiagram,
  composition: CompositionDiagram,
  rotation: RotationDiagram,
};

function InputTimeline() {
  return (
    <div className="input-timeline">
      <div>
        <span className="study-label">입력</span>
        <div className="timeline-track">
          <b>누름</b>
          <span className="timeline-held">누르고 있는 구간</span>
          <b>뗌</b>
        </div>
      </div>
      <div>
        <span className="study-label">처리</span>
        <div className="timeline-track">
          <span>재생 요청</span>
          <span aria-hidden>→</span>
          <span>입력 해제 처리</span>
        </div>
      </div>
    </div>
  );
}

function ArtworkSequence() {
  return (
    <ol className="art-sequence" aria-label="스크린을 누르고 손을 뗄 때의 변화">
      {['붓으로 누르기', '그림이 이어짐', '손을 떼면 비워짐'].map(
        (label, index) => (
          <li key={label}>
            <svg viewBox="0 0 160 110" role="img" aria-label={label}>
              <rect
                x="8"
                y="8"
                width="144"
                height="94"
                rx="5"
                className="diagram-plane"
              />
              <path
                d="M35 78C35 22 100 15 115 45S65 86 124 72"
                className="diagram-curve"
                style={{
                  opacity: [0.5, 1, 0.07][index],
                  strokeDasharray: index === 0 ? '45 200' : undefined,
                }}
              />
            </svg>
            <span>{label}</span>
          </li>
        ),
      )}
    </ol>
  );
}

function DiagramContent({ diagram }: { diagram: StudyDiagram }) {
  const Interactive = INTERACTIVE_DIAGRAMS[diagram.kind];
  if (Interactive) return <Interactive />;
  if (diagram.kind === 'timeline') return <InputTimeline />;
  if (diagram.kind === 'art-sequence') return <ArtworkSequence />;
  return (
    <ol
      className={
        diagram.kind === 'responsibilities'
          ? 'study-flow study-parallel'
          : 'study-flow'
      }
    >
      {diagram.nodes.map((node) => (
        <li key={node.label}>
          <strong>{node.label}</strong>
          <span className="study-node-detail">{node.detail}</span>
        </li>
      ))}
    </ol>
  );
}
export function WorkDiagram({ diagram }: { diagram: StudyDiagram }) {
  return (
    <figure className="study-diagram" aria-label={diagram.title}>
      <figcaption className="study-diagram-title">{diagram.title}</figcaption>
      <DiagramContent diagram={diagram} />
    </figure>
  );
}
