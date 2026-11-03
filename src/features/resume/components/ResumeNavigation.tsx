'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import styles from './ResumePage.module.css';
import { parseResumeReturn, RETURN_KEY } from '../lib/resumeReturn';

const SECTIONS = [
  { id: 'resume-introduction', label: '소개' },
  { id: 'career-freelance', label: '프리랜서' },
  { id: 'career-bmeks', label: '정규직' },
  { id: 'resume-education', label: '학력' },
] as const;
export function ResumeNavigation() {
  const [active, setActive] = useState<string>('resume-introduction');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = [...SECTIONS].reverse().find(({ id }) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 190;
      });
      setActive(current?.id ?? 'resume-introduction');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    try {
      const saved = parseResumeReturn(
        sessionStorage.getItem(RETURN_KEY),
        Date.now(),
      );
      if (saved && !window.location.hash) {
        frame = requestAnimationFrame(() => {
          sessionStorage.removeItem(RETURN_KEY);
          const target = document.getElementById(saved.anchor);
          if (!target) return;
          const link = target.querySelector<HTMLAnchorElement>('a');
          if (!link) return;
          link.scrollIntoView({ block: 'center', behavior: 'instant' });
          link.focus({ preventScroll: true });
        });
      } else if (saved) {
        sessionStorage.removeItem(RETURN_KEY);
      }
    } catch {
      /* Normal browser back navigation remains available without storage. */
    }
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <nav aria-label="이력서 목차" className={styles.navigation}>
      {SECTIONS.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          aria-current={active === id ? 'location' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function ResumeProjectLink({
  href,
  slug,
  name,
}: {
  href: string;
  slug: string;
  name: string;
}) {
  const rememberPosition = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    try {
      sessionStorage.setItem(
        RETURN_KEY,
        JSON.stringify({
          anchor: `resume-project-${slug}`,
          scrollY: window.scrollY,
          savedAt: Date.now(),
        }),
      );
    } catch {
      /* The link works even when storage is unavailable. */
    }
  };
  return (
    <Link
      href={href}
      onClick={rememberPosition}
      className={styles.projectLink}
      aria-label={`${name} 자세히 보기`}
    >
      자세히 보기 <ArrowUpRight size={16} aria-hidden />
    </Link>
  );
}
