import { StrictMode, useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IntroVisitProvider, useIntroVisit } from './IntroVisitProvider';

function Home({ reduced = false }: { reduced?: boolean }) {
  const { visited, markVisited } = useIntroVisit();
  const [intro] = useState(() => !visited && !reduced);
  useEffect(markVisited, [markVisited]);
  return <p>{intro ? 'intro' : 'hero'}</p>;
}
function Document({
  home,
  reduced = false,
}: {
  home: boolean;
  reduced?: boolean;
}) {
  return (
    <StrictMode>
      <IntroVisitProvider>
        {home ? <Home reduced={reduced} /> : <p>deep link</p>}
      </IntroVisitProvider>
    </StrictMode>
  );
}

describe('document-scoped intro visit', () => {
  it('plays on first About visit from a deep link, skips SPA re-entry, resets on a new document', () => {
    const view = render(<Document home={false} />);
    view.rerender(<Document home />);
    expect(screen.getByText('intro')).toBeInTheDocument();
    view.rerender(<Document home={false} />);
    view.rerender(<Document home />);
    expect(screen.getByText('hero')).toBeInTheDocument();
    view.unmount();
    render(<Document home />);
    expect(screen.getByText('intro')).toBeInTheDocument();
  });
  it('consumes a reduced-motion visit without showing an intro on later navigation', () => {
    const view = render(<Document home reduced />);
    expect(screen.getByText('hero')).toBeInTheDocument();
    view.rerender(<Document home={false} />);
    view.rerender(<Document home />);
    expect(screen.getByText('hero')).toBeInTheDocument();
  });
});
