import type { Metadata } from 'next';
import { ResumePage } from '@/features/resume/components/ResumePage';
import { SITE_OG_IMAGE } from '@/lib/site';

const title = '이우진 · 이력과 경력';
const description =
  '프론트엔드 개발자 이우진의 소개, 경력과 프로젝트. 각 프로젝트의 구현 과정은 상세 페이지에서 볼 수 있습니다.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
  openGraph: { title, description, url: '/resume', images: [SITE_OG_IMAGE] },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: [SITE_OG_IMAGE.url],
  },
};

export default function Page() {
  return <ResumePage />;
}
