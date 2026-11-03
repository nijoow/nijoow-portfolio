'use client';

import { useState } from 'react';
import { VectorCanvasEditor } from './VectorCanvasEditor';

export { InheritanceDiagram } from './AssetHierarchyDiagram';
export { CoordinateMappingDemo as CoordinateDiagram } from './CoordinateMappingDemo';
export { FormulaEditorDemo as FormulaDiagram } from './FormulaEditorDemo';

export function PathBoundsDiagram() {
  return <VectorCanvasEditor variant="markup" />;
}

export function RotationDiagram() {
  return <VectorCanvasEditor variant="vector" />;
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
