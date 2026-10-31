import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
