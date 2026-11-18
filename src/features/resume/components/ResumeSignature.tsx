'use client';

import { useEffect, useState } from 'react';
import SignatureExperience from '@/components/Immersive/SignatureExperienceDynamic';
import SignaturePlaceholder from '@/components/Immersive/SignaturePlaceholder';
import { useIntroVisit } from '@/context/IntroVisitProvider';
import styles from './ResumePage.module.css';

export function ResumeSignature() {
  const { markVisited } = useIntroVisit();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // The resume is readable immediately; the shared logo starts in its hero state.
    markVisited();
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, [markVisited]);
  return (
    <div className={styles.signature}>
      {ready ? <SignatureExperience /> : <SignaturePlaceholder />}
    </div>
  );
}
