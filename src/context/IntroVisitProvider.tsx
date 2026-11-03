'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const IntroVisitContext = createContext<{
  visited: boolean;
  markVisited: () => void;
} | null>(null);

/** Root-layout lifetime: navigation retains it; a new document resets it. */
export function IntroVisitProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState(false);
  const markVisited = useCallback(() => setVisited(true), []);
  const visit = useMemo(
    () => ({ visited, markVisited }),
    [visited, markVisited],
  );
  return <IntroVisitContext value={visit}>{children}</IntroVisitContext>;
}

export function useIntroVisit() {
  const visit = useContext(IntroVisitContext);
  if (!visit) throw new Error('Signature requires IntroVisitProvider');
  return visit;
}
