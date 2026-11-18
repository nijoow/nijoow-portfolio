'use client';

import { useState } from 'react';
import styles from './AssetHierarchyDiagram.module.css';

type AssetKind = 'folder' | 'class' | 'instance' | 'file';
const ASSETS: {
  label: string;
  kind: AssetKind;
  depth: number;
  branch?: string;
  relation?: string;
}[] = [
  { label: '일반 폴더', kind: 'folder', depth: 0 },
  { label: '클래스 A', kind: 'class', depth: 0, branch: 'root' },
  {
    label: '클래스 B',
    kind: 'class',
    depth: 1,
    branch: 'parent',
    relation: '클래스 A를 상속',
  },
  {
    label: '인스턴스 B-1',
    kind: 'instance',
    depth: 2,
    branch: 'nested',
    relation: '클래스 B를 상속',
  },
  {
    label: '인스턴스 A-1',
    kind: 'instance',
    depth: 1,
    branch: 'last',
    relation: '클래스 A를 상속',
  },
  { label: '도면.png', kind: 'file', depth: 0 },
];

function AssetIcon({ kind }: { kind: AssetKind }) {
  if (kind === 'file')
    return (
      <span className={styles.fileIcon} aria-hidden="true">
        <span>PNG</span>
      </span>
    );
  const marker = { folder: '', class: 'C', instance: 'I' }[kind];
  return (
    <span className={`${styles.folderIcon} ${styles[kind]}`} aria-hidden="true">
      {marker}
    </span>
  );
}

function AssetList({ hierarchy }: { hierarchy: boolean }) {
  return (
    <ul
      className={styles.list}
      aria-label={hierarchy ? '상속 관계가 보이는 자산 목록' : '평면 자산 목록'}
    >
      {ASSETS.map(({ label, kind, depth, branch, relation }) => (
        <li
          key={label}
          className={styles.row}
          data-depth={hierarchy ? depth : 0}
        >
          {hierarchy && branch ? (
            <span
              className={`${styles.connector} ${styles[branch]}`}
              aria-hidden="true"
            >
              <i />
            </span>
          ) : null}
          <AssetIcon kind={kind} />
          <span>
            {label}
            {hierarchy && relation ? (
              <span className={styles.srOnly}>, {relation}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function InheritanceDiagram() {
  const [view, setView] = useState<'flat' | 'hierarchy'>('hierarchy');
  return (
    <div className={styles.diagram} data-view={view}>
      <div
        className={styles.controls}
        role="group"
        aria-label="자산 목록 보기 방식"
      >
        <button
          type="button"
          aria-pressed={view === 'flat'}
          onClick={() => setView('flat')}
        >
          평면 목록
        </button>
        <button
          type="button"
          aria-pressed={view === 'hierarchy'}
          onClick={() => setView('hierarchy')}
        >
          상속 관계
        </button>
      </div>
      <div className={styles.comparison}>
        <section
          className={`${styles.panel} ${styles.flat}`}
          aria-label="평면 목록"
        >
          <h4>평면 목록</h4>
          <AssetList hierarchy={false} />
        </section>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <section
          className={`${styles.panel} ${styles.hierarchy}`}
          aria-label="상속 관계"
        >
          <h4>상속 관계</h4>
          <AssetList hierarchy />
        </section>
      </div>
    </div>
  );
}
