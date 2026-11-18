import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResumeNavigation } from './ResumeNavigation';
import { RETURN_KEY } from '../lib/resumeReturn';

describe('resume restoration', () => {
  afterEach(() => {
    sessionStorage.clear();
    history.replaceState(null, '', '/');
    vi.restoreAllMocks();
  });
  it('reveals and focuses the project link after returning', async () => {
    history.replaceState(null, '', '/resume');
    sessionStorage.setItem(
      RETURN_KEY,
      JSON.stringify({
        anchor: 'resume-project-atop-dms',
        scrollY: 100,
        savedAt: Date.now(),
      }),
    );
    const scroll = vi.fn();
    const { getByText } = render(
      <>
        <article id="resume-project-atop-dms">
          <a href="/works/atop-dms">자세히 보기</a>
        </article>
        <ResumeNavigation />
      </>,
    );
    const link = getByText('자세히 보기');
    link.scrollIntoView = scroll;
    await waitFor(() =>
      expect(scroll).toHaveBeenCalledWith({
        block: 'center',
        behavior: 'instant',
      }),
    );
    expect(document.activeElement).toBe(link);
  });
  it('honors an explicit hash instead of restoring a saved project', async () => {
    history.replaceState(null, '', '/resume#career-freelance');
    sessionStorage.setItem(
      RETURN_KEY,
      JSON.stringify({
        anchor: 'resume-project-atop-dms',
        scrollY: 100,
        savedAt: Date.now(),
      }),
    );
    render(<ResumeNavigation />);
    await waitFor(() => expect(sessionStorage.getItem(RETURN_KEY)).toBeNull());
  });
});
