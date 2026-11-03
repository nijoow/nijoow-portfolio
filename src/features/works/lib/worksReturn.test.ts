import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getWorksReturn,
  rememberWorksReturn,
  restoreWorksReturn,
} from './worksReturn';

describe('filtered Works return', () => {
  beforeEach(() => {
    sessionStorage.clear();
    history.replaceState(
      null,
      '',
      '/works?type=business&tag=Frontend&featured=true',
    );
  });
  it('returns to the filters without the legacy featured restriction and restores scroll', () => {
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 450,
    });
    rememberWorksReturn('atop-dms');
    expect(getWorksReturn('atop-dms')).toBe(
      '/works?type=business&tag=Frontend&return=1',
    );
    expect(getWorksReturn('fromyou')).toBeNull();
    history.replaceState(null, '', getWorksReturn('atop-dms'));
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const frame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });
    const cleanup = restoreWorksReturn();
    expect(location.search).toBe('?type=business&tag=Frontend');
    expect(scroll).toHaveBeenCalledWith({ top: 450, behavior: 'instant' });
    expect(getWorksReturn('atop-dms')).toBeNull();
    cleanup?.();
    scroll.mockRestore();
    frame.mockRestore();
  });
  it('restores the clicked card relative to the viewport after layout changes', () => {
    vi.useFakeTimers();
    const card = document.createElement('article');
    card.dataset.workCard = 'atop-dms';
    document.body.appendChild(card);
    let top = 200;
    vi.spyOn(card, 'getBoundingClientRect').mockImplementation(
      () => ({ top, height: 400 }) as DOMRect,
    );
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 450,
    });
    rememberWorksReturn('atop-dms');
    history.replaceState(null, '', getWorksReturn('atop-dms'));
    top = 1200;
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    restoreWorksReturn();
    vi.advanceTimersByTime(400);
    expect(scroll).toHaveBeenCalledWith({ top: 1450, behavior: 'instant' });
    window.dispatchEvent(new Event('wheel'));
    scroll.mockClear();
    vi.advanceTimersByTime(1600);
    expect(scroll).not.toHaveBeenCalled();
    card.remove();
    scroll.mockRestore();
    vi.useRealTimers();
  });
  it('cancels pending corrections and listeners when the gallery unmounts', () => {
    vi.useFakeTimers();
    rememberWorksReturn('atop-dms');
    history.replaceState(null, '', getWorksReturn('atop-dms'));
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const cleanup = restoreWorksReturn();
    cleanup?.();
    history.replaceState(null, '', '/works/atop-dms');
    window.dispatchEvent(new Event('resize'));
    document.dispatchEvent(new Event('load'));
    vi.advanceTimersByTime(2000);
    expect(scroll).not.toHaveBeenCalled();
    scroll.mockRestore();
    vi.useRealTimers();
  });
  it('retries a cancelled mount before consuming the saved return visit', () => {
    vi.useFakeTimers();
    rememberWorksReturn('atop-dms');
    history.replaceState(null, '', getWorksReturn('atop-dms'));
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const firstCleanup = restoreWorksReturn();
    firstCleanup?.();
    expect(location.search).toContain('return=1');
    expect(getWorksReturn('atop-dms')).not.toBeNull();
    const retryCleanup = restoreWorksReturn();
    vi.advanceTimersByTime(50);
    expect(scroll).toHaveBeenCalled();
    expect(location.search).toBe('?type=business&tag=Frontend');
    expect(getWorksReturn('atop-dms')).toBeNull();
    retryCleanup?.();
    scroll.mockRestore();
    vi.useRealTimers();
  });
  it('does not restore a previous search when leaving an unfiltered list', () => {
    rememberWorksReturn('atop-dms');
    history.replaceState(null, '', '/works?featured=true');
    rememberWorksReturn('atop-dms');
    expect(getWorksReturn('atop-dms')).toBeNull();
  });
});
