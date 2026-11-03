'use client';

import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';
import {
  deleteAt,
  moveAcrossToken,
  reconcileEdit,
  replaceWholeTokens,
  tokensIn,
  wholeTokenRange,
} from './formulaEditing';
import styles from './FormulaEditorDemo.module.css';

const INITIAL = '1 + {_값_} × 2';

function isPlainArrow(event: KeyboardEvent<HTMLInputElement>) {
  return (
    (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
    !event.shiftKey &&
    !event.altKey &&
    !event.metaKey &&
    !event.ctrlKey
  );
}

export function FormulaEditorDemo() {
  const [value, setValue] = useState(INITIAL);
  const [name, setName] = useState('');
  const [scroll, setScroll] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const selection = useRef({ start: INITIAL.length, end: INITIAL.length });
  const composing = useRef(false);
  const compositionStart = useRef(INITIAL);

  function remember() {
    if (input.current)
      selection.current = {
        start: input.current.selectionStart ?? 0,
        end: input.current.selectionEnd ?? 0,
      };
  }
  function apply(result: { value: string; caret: number }) {
    setValue(result.value);
    selection.current = { start: result.caret, end: result.caret };
    requestAnimationFrame(() => {
      input.current?.focus();
      input.current?.setSelectionRange(result.caret, result.caret);
    });
  }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing || composing.current) return;
    const start = event.currentTarget.selectionStart ?? 0;
    const end = event.currentTarget.selectionEnd ?? start;
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      apply(deleteAt(value, start, end, event.key === 'Backspace' ? -1 : 1));
    } else if (start === end && isPlainArrow(event)) {
      const target = moveAcrossToken(
        value,
        start,
        event.key === 'ArrowLeft' ? -1 : 1,
      );
      if (target !== null) {
        event.preventDefault();
        event.currentTarget.setSelectionRange(target, target);
        remember();
      }
    }
  }
  function paste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const start = event.currentTarget.selectionStart ?? 0;
    const end = event.currentTarget.selectionEnd ?? start;
    apply(
      replaceWholeTokens(
        value,
        start,
        end,
        event.clipboardData.getData('text/plain').replace(/[\r\n]+/g, ' '),
      ),
    );
  }
  function insertVariable() {
    const clean = name.trim().replace(/[{}\r\n]/g, '');
    if (!clean) return;
    apply(
      replaceWholeTokens(
        value,
        selection.current.start,
        selection.current.end,
        `{_${clean}_}`,
      ),
    );
    setName('');
  }
  const parts = tokensIn(value);
  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="formula-editor-input">
        수식 편집
      </label>
      <div className={styles.editor}>
        <div className={styles.mirror} aria-hidden="true">
          <div style={{ transform: `translateX(${-scroll}px)` }}>
            {parts.map((token, index) => {
              const preceding = value.slice(
                parts[index - 1]?.end ?? 0,
                token.start,
              );
              return (
                <span key={`${token.start}-${token.raw}`}>
                  {preceding}
                  <span className={styles.token}>
                    <span>{token.raw}</span>
                    <b>{token.name}</b>
                  </span>
                </span>
              );
            })}
            {value.slice(parts.at(-1)?.end ?? 0)}
            {'\u200b'}
          </div>
        </div>
        <input
          id="formula-editor-input"
          ref={input}
          className={styles.input}
          value={value}
          autoComplete="off"
          spellCheck={false}
          onSelect={remember}
          onKeyUp={remember}
          onClick={remember}
          onBlur={remember}
          onScroll={(event) => setScroll(event.currentTarget.scrollLeft)}
          onKeyDown={keyDown}
          onPaste={paste}
          onCompositionStart={(event) => {
            composing.current = true;
            compositionStart.current = value;
            const range = wholeTokenRange(
              value,
              event.currentTarget.selectionStart ?? 0,
              event.currentTarget.selectionEnd ?? 0,
            );
            event.currentTarget.setSelectionRange(range.start, range.end);
          }}
          onCompositionEnd={(event) => {
            composing.current = false;
            const next = event.currentTarget.value;
            if (next !== compositionStart.current)
              apply(reconcileEdit(compositionStart.current, next));
          }}
          onChange={(event) => {
            const next = event.currentTarget.value;
            if (composing.current) {
              setValue(next);
              return;
            }
            apply(reconcileEdit(value, next));
          }}
        />
      </div>
      <div className={styles.actions}>
        <label htmlFor="formula-variable-name">변수 이름</label>
        <input
          id="formula-variable-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="예: 값"
        />
        <button type="button" onClick={insertVariable}>
          변수 추가
        </button>
        <button
          type="button"
          onClick={() => apply({ value: INITIAL, caret: INITIAL.length })}
        >
          초기화
        </button>
      </div>
      <p className={styles.help}>
        변수를 클릭하거나 선택한 뒤 삭제하면 변수 전체가 지워져요.
      </p>
    </div>
  );
}
