import SignatureExperience from '@/components/Immersive/SignatureExperienceDynamic';
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE } from '@/lib/site';
import type { Metadata } from 'next';
import ClassicHome from './_home/ClassicHome';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

const HomePage = () => {
  return (
    <>
      <SignatureExperience />
      <ClassicHome />
    </>
  );
};

export default HomePage;
