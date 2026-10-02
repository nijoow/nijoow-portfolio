'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SignaturePlaceholder from './SignaturePlaceholder';
import {
  detectSignatureQuality,
  type SignatureQuality,
} from './signatureQuality';

const SignatureExperience = dynamic(() => import('./SignatureExperience'), {
  ssr: false,
  loading: SignaturePlaceholder,
});

export default function SignatureExperienceDynamic() {
  const [quality, setQuality] = useState<SignatureQuality | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuality(detectSignatureQuality());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (quality === null || quality === 'fallback')
    return <SignaturePlaceholder />;

  return <SignatureExperience quality={quality} />;
}
