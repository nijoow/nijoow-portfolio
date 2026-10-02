import type { Metadata } from 'next';
import { SITE_NAME, SITE_OG_IMAGE } from '@/lib/site';
import ClassicWorks from './_works/ClassicWorks';

export const metadata: Metadata = {
  title: 'Works',
  description:
    'UI/UX, 인터랙션, 웹 3D를 중심으로 한 프론트엔드 개발자 이우진의 작업을 소개합니다.',
  alternates: { canonical: '/works' },
  openGraph: {
    url: '/works',
    title: 'Works',
    description: '이우진의 프론트엔드·UI/UX·인터랙티브 프로젝트를 소개합니다.',
    siteName: SITE_NAME,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Works',
    images: [SITE_OG_IMAGE.url],
  },
};

const WorksPage = () => {
  return <ClassicWorks />;
};

export default WorksPage;
