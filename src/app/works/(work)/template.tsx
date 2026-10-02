'use client';

import Section from '@/components/Section/Section';
import { getWork } from '@/features/works/data/worksData';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Link from 'next/link';
import WorksBreadCrumb from '../_container/WorksBreadCrumb';

export default function Template({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  const slug = pathName.split('/works/')[1] ?? '';
  const work = getWork(slug);

  return (
    <div>
      <Section>
        <WorksBreadCrumb work={work} slug={slug} />
      </Section>
      <div className="bg-surface-ink/60 rounded-3xl p-5 sm:p-7">
        <Section alignItems="items-start">{children}</Section>
      </div>
      <nav
        aria-label="다른 작업 탐색"
        className="mt-12 border-t border-white/10 pt-6"
      >
        <Link
          href="/works"
          className="focus-visible:ring-brand-lavender text-ink-secondary inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-bold outline-none hover:text-white focus-visible:ring-2"
        >
          다른 작업 보기
        </Link>
      </nav>
    </div>
  );
}
