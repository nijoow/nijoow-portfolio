import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkStudyNavigation } from './WorkStudyNavigation';

describe('work study navigation', () => {
  it('tracks the section at the sticky navigation threshold', () => {
    vi.useFakeTimers();
    const overview = document.createElement('div');
    const features = document.createElement('div');
    overview.id = 'work-overview';
    features.id = 'study-features';
    document.body.append(overview, features);
    let top = 250;
    vi.spyOn(overview, 'getBoundingClientRect').mockReturnValue({
      top: -100,
    } as DOMRect);
    vi.spyOn(features, 'getBoundingClientRect').mockImplementation(
      () => ({ top }) as DOMRect,
    );
    const { unmount } = render(
      <WorkStudyNavigation
        sections={[
          ['work-overview', '개요'],
          ['study-features', '주요 기능'],
        ]}
      />,
    );
    act(() => vi.advanceTimersByTime(20));
    expect(screen.getByRole('link', { name: '개요' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    top = 180;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(20);
    });
    expect(screen.getByRole('link', { name: '주요 기능' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    unmount();
    overview.remove();
    features.remove();
    vi.useRealTimers();
  });
});
