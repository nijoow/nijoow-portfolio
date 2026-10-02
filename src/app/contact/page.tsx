import { ContactPageContent } from '@/features/contact/components/ContactPageContent';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: '프론트엔드 개발자 이우진에게 협업과 프로젝트를 문의하세요.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact',
    description: '프론트엔드 개발자 이우진에게 협업과 프로젝트를 문의하세요.',
    siteName: SITE_NAME,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    images: [SITE_OG_IMAGE.url],
  },
};

const ContactPage = () => {
  return <ContactPageContent />;
};

export default ContactPage;
