'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

type Cell = { row: number; column: number };
const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];
const ROWS = Array.from({ length: 8 }, (_, row) => row);
const address = ({ row, column }: Cell) => `${COLUMNS[column]}${row + 1}`;
function parseAddress(value: string): Cell | null {
  const match = /^([A-F])([1-8])$/i.exec(value.trim());
  const [, letter, row] = match ?? [];
  return letter && row
    ? {
        column: COLUMNS.indexOf(letter.toUpperCase()),
        row: Number(row) - 1,
      }
    : null;
}
function ordered(first: Cell, last: Cell) {
  return {
    start: {
      row: Math.min(first.row, last.row),
      column: Math.min(first.column, last.column),
    },
    end: {
      row: Math.max(first.row, last.row),
      column: Math.max(first.column, last.column),
    },
  };
}

export function SheetRangeDiagram() {
  const [range, setRange] = useState({
    start: { column: 0, row: 1 },
    end: { column: 3, row: 4 },
  });
  const [draft, setDraft] = useState({ start: 'A2', end: 'D5' });
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [focusCell, setFocusCell] = useState('A2');
  const table = useRef<HTMLTableElement>(null);
  const drag = useRef<{ cell: Cell; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const valid = Boolean(parseAddress(draft.start) && parseAddress(draft.end));

  function choose(first: Cell, last: Cell) {
    const next = ordered(first, last);
    setRange(next);
    setDraft({ start: address(next.start), end: address(next.end) });
  }
  function edit(which: 'start' | 'end', value: string) {
    const next = { ...draft, [which]: value.toUpperCase() };
    setDraft(next);
    const start = parseAddress(next.start),
      end = parseAddress(next.end);
    if (start && end) setRange(ordered(start, end));
  }
  function click(cell: Cell) {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    choose(selectingEnd ? range.start : cell, cell);
    setSelectingEnd(!selectingEnd);
  }
  function pointerMove(event: PointerEvent<HTMLTableElement>) {
    if (!drag.current || !event.buttons) return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLButtonElement>('button[data-cell]');
    if (!target || !table.current?.contains(target)) return;
    const cell = parseAddress(target.dataset.cell ?? '');
    if (!cell || address(cell) === address(drag.current.cell)) return;
    drag.current.moved = true;
    choose(drag.current.cell, cell);
  }
  function pointerEnd() {
    if (drag.current?.moved) {
      suppressClick.current = true;
      setSelectingEnd(false);
    }
    drag.current = null;
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, cell: Cell) {
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    const direction = delta[event.key];
    if (!direction) return;
    event.preventDefault();
    const next = {
      row: Math.max(0, Math.min(7, cell.row + direction[0])),
      column: Math.max(0, Math.min(5, cell.column + direction[1])),
    };
    setFocusCell(address(next));
    table.current
      ?.querySelector<HTMLButtonElement>(`[data-cell="${address(next)}"]`)
      ?.focus();
    if (event.shiftKey) choose(range.start, next);
  }
  return (
    <div>
      <div className="sheet-addresses">
        <label>
          시작 셀
          <input
            value={draft.start}
            onChange={(event) => edit('start', event.target.value)}
            maxLength={2}
            aria-invalid={!parseAddress(draft.start)}
            aria-describedby="sheet-range-help"
            spellCheck={false}
          />
        </label>
        <span aria-hidden>↔</span>
        <label>
          끝 셀
          <input
            value={draft.end}
            onChange={(event) => edit('end', event.target.value)}
            maxLength={2}
            aria-invalid={!parseAddress(draft.end)}
            aria-describedby="sheet-range-help"
            spellCheck={false}
          />
        </label>
      </div>
      <p id="sheet-range-help" className="diagram-caption">
        {valid
          ? 'A1–F8에서 드래그하거나 시작·끝 셀을 차례로 선택해 보세요.'
          : 'A1부터 F8 사이의 셀 주소를 입력해 주세요.'}
      </p>
      <table
        ref={table}
        className="sheet-range"
        aria-label="입력창과 연동되는 셀 선택"
        onPointerMove={pointerMove}
        onPointerUp={pointerEnd}
        onPointerCancel={pointerEnd}
      >
        <thead>
          <tr>
            <th aria-label="행 번호" />
            {COLUMNS.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row}>
              <th scope="row">{row + 1}</th>
              {COLUMNS.map((column, index) => {
                const cell = { row, column: index },
                  name = address(cell);
                const selected =
                  row >= range.start.row &&
                  row <= range.end.row &&
                  index >= range.start.column &&
                  index <= range.end.column;
                return (
                  <td key={column}>
                    <button
                      type="button"
                      data-cell={name}
                      aria-label={name}
                      aria-pressed={selected}
                      tabIndex={focusCell === name ? 0 : -1}
                      onFocus={() => setFocusCell(name)}
                      onPointerDown={(event) => {
                        suppressClick.current = false;
                        drag.current = { cell, moved: false };
                        event.currentTarget.setPointerCapture(event.pointerId);
                      }}
                      onLostPointerCapture={pointerEnd}
                      onClick={() => click(cell)}
                      onKeyDown={(event) => keyDown(event, cell)}
                    >
                      {name === address(range.start) ||
                      name === address(range.end)
                        ? name
                        : '\u00a0'}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="diagram-caption" aria-live="polite">
        선택한 범위: {address(range.start)} : {address(range.end)}
      </p>
    </div>
  );
}
