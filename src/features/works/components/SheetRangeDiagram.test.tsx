import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SheetRangeDiagram } from './SheetRangeDiagram';

describe('bidirectional cell selection', () => {
  it('updates selected cells from typed addresses', () => {
    render(<SheetRangeDiagram />);
    fireEvent.change(screen.getByLabelText('시작 셀'), {
      target: { value: 'B3' },
    });
    fireEvent.change(screen.getByLabelText('끝 셀'), {
      target: { value: 'E6' },
    });
    expect(screen.getByRole('button', { name: 'B3' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'E6' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'A2' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
  it('shrinks a dragged range when the pointer returns to its start', () => {
    render(<SheetRangeDiagram />);
    const start = screen.getByRole('button', { name: 'A2' });
    const end = screen.getByRole('button', { name: 'E6' });
    const table = screen.getByRole('table');
    start.setPointerCapture = vi.fn();
    vi.stubGlobal('PointerEvent', MouseEvent);
    const hit = vi.fn();
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: hit,
    });
    fireEvent.pointerDown(start, { pointerId: 1 });
    hit.mockReturnValue(end);
    fireEvent.pointerMove(table, { buttons: 1 });
    hit.mockReturnValue(start);
    fireEvent.pointerMove(table, { buttons: 1 });
    expect(screen.getByLabelText('끝 셀')).toHaveValue('A2');
    vi.unstubAllGlobals();
  });
  it('writes normalized addresses after reverse selection', () => {
    render(<SheetRangeDiagram />);
    fireEvent.click(screen.getByRole('button', { name: 'E6' }));
    fireEvent.click(screen.getByRole('button', { name: 'B3' }));
    expect(screen.getByLabelText('시작 셀')).toHaveValue('B3');
    expect(screen.getByLabelText('끝 셀')).toHaveValue('E6');
  });
  it('keeps the last valid selection while an address is incomplete', () => {
    render(<SheetRangeDiagram />);
    fireEvent.change(screen.getByLabelText('시작 셀'), {
      target: { value: 'B' },
    });
    expect(screen.getByLabelText('시작 셀')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('button', { name: 'A2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
