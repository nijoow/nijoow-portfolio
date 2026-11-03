import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VectorCanvasEditor } from './VectorCanvasEditor';

describe('vector canvas', () => {
  it('adds a shape and transforms or deletes it with keyboard-accessible controls', () => {
    render(<VectorCanvasEditor />);
    fireEvent.click(screen.getByRole('button', { name: '도구 선택' }));
    fireEvent.click(screen.getByRole('button', { name: '사각형' }));
    const shape = screen.getByRole('button', { name: /사각형 1/ });
    expect(shape).toHaveAttribute(
      'transform',
      expect.stringContaining('translate(258 138)'),
    );
    fireEvent.keyDown(shape, { key: 'ArrowRight' });
    expect(shape).toHaveAttribute(
      'transform',
      expect.stringContaining('translate(263 138)'),
    );
    fireEvent.click(screen.getByRole('button', { name: '오른쪽 회전' }));
    expect(shape).toHaveAttribute(
      'transform',
      expect.stringContaining('rotate(15)'),
    );
    fireEvent.click(screen.getByRole('button', { name: '삭제' }));
    expect(
      screen.queryByRole('button', { name: /사각형 1/ }),
    ).not.toBeInTheDocument();
  });
  it('converts a pointer stroke into a movable SVG object', () => {
    vi.stubGlobal('PointerEvent', MouseEvent);
    render(<VectorCanvasEditor />);
    fireEvent.click(screen.getByRole('button', { name: '도구 선택' }));
    fireEvent.click(screen.getByRole('button', { name: '자유선 그리기' }));
    const canvas = screen.getByRole('group', { name: '도면 표시 편집 캔버스' });
    canvas.setPointerCapture = vi.fn();
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 600,
      height: 320,
    } as DOMRect);
    fireEvent.pointerDown(canvas, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(canvas, { buttons: 1, clientX: 180, clientY: 160 });
    fireEvent.pointerUp(canvas);
    const stroke = screen.getByRole('button', { name: /자유선 그리기 1/ });
    expect(stroke).toHaveAttribute('transform', 'translate(140 130) rotate(0)');
    fireEvent.pointerDown(stroke, { button: 0, clientX: 140, clientY: 130 });
    fireEvent.pointerMove(canvas, { buttons: 1, clientX: 160, clientY: 140 });
    fireEvent.pointerUp(canvas);
    expect(stroke).toHaveAttribute('transform', 'translate(160 140) rotate(0)');
    vi.unstubAllGlobals();
  });
  it('converts a keyboard-drawn freehand stroke into a selectable object', () => {
    render(<VectorCanvasEditor variant="vector" />);
    fireEvent.click(screen.getByRole('button', { name: '도구 선택' }));
    fireEvent.click(screen.getByRole('button', { name: '자유선 그리기' }));
    const canvas = screen.getByRole('group', { name: '벡터 편집 캔버스' });
    fireEvent.keyDown(canvas, { key: 'Enter' });
    fireEvent.keyDown(canvas, { key: 'ArrowRight' });
    fireEvent.keyDown(canvas, { key: 'ArrowDown' });
    fireEvent.keyDown(canvas, { key: 'Enter' });
    expect(
      screen.getByRole('button', { name: /자유선 그리기 1/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/자유선을 SVG 도형으로 추가했습니다/),
    ).toBeInTheDocument();
  });
});
