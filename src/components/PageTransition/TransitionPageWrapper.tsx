'use client';

import { STANDARD_TRANSITION } from '@/lib/motion';
import { m } from 'framer-motion';
import type { ReactNode } from 'react';

interface TransitionPageWrapperProps {
  children: ReactNode;
}

function TransitionPageWrapper({ children }: TransitionPageWrapperProps) {
  return (
    <m.div
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={STANDARD_TRANSITION}
    >
      {children}
    </m.div>
  );
}

export default TransitionPageWrapper;
