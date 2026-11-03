'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function EmailCopyButton({
  email = 'nijoow1127@gmail.com',
}: {
  email?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>(
    'idle',
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    setStatus('copying');
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
    }
  }
  let statusMessage = '';
  if (status === 'copied') statusMessage = '이메일 주소가 복사되었습니다.';
  if (status === 'error')
    statusMessage = `복사하지 못했습니다. 주소를 직접 선택해 주세요: ${email}`;
  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={copyEmail}
        disabled={status === 'copying'}
        className="text-ink-primary focus-visible:ring-brand-lavender inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm transition-colors hover:bg-white/5 focus-visible:ring-2 disabled:opacity-60"
      >
        {status === 'copied' ? (
          <Check size={15} aria-hidden />
        ) : (
          <Copy size={15} aria-hidden />
        )}
        {status === 'copied' ? '이메일 복사됨' : '이메일 복사'}
      </button>
      <span
        role="status"
        className={
          status === 'error' ? 'text-ink-secondary max-w-56 text-xs' : 'sr-only'
        }
      >
        {statusMessage}
      </span>
    </div>
  );
}
