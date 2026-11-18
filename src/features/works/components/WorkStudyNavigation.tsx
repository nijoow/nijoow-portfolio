'use client';

import { useEffect, useState } from 'react';
import styles from './WorkStudyNavigation.module.css';

const SHORT_LABELS: Record<string, string> = {
  'work-overview': '개요',
  'study-cases': '구현 과정',
  'study-diagram': '구조',
  'study-tech': '사용 기술',
  'study-impact': '결과',
};
export function WorkStudyNavigation({
  sections,
}: {
  sections: [string, string][];
}) {
  const [active, setActive] = useState('work-overview');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = [...sections].reverse().find(([id]) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 190;
      });
      setActive(current?.[0] ?? 'work-overview');
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
  }, [sections]);
  return (
    <nav className={styles.navigation} aria-label="프로젝트 상세 목차">
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
        >
          {label === '트러블슈팅' ? label : (SHORT_LABELS[id] ?? label)}
        </a>
      ))}
    </nav>
  );
}
