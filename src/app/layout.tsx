import { IntroVisitProvider } from '@/context/IntroVisitProvider';
import { AppearanceProvider } from '@/context/AppearanceProvider';
import { AmbientBackground } from '@/components/Motion/AmbientBackground';
import CustomCursor from '@/components/Motion/CustomCursor';
import NavBar from '@/components/Navbar/NavBar';
import { COLOR_TOKENS, PALETTE_CSS_VARIABLES } from '@/lib/designTokens';
import {
  PERSON_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
} from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';

const binggrae = localFont({
  src: [
    {
      path: '../font/Binggrae.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/Binggrae-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-binggrae',
  display: 'fallback',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'nijoow | portfolio',
    template: '%s | nijoow',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'nijoow',
    '이우진',
    '포트폴리오',
    '프론트엔드',
    'Frontend',
    'Next.js',
    'React',
    'TypeScript',
    '웹 3D',
    'Three.js',
  ],
  authors: [{ name: 'Lee Woo Jin', url: 'https://github.com/nijoow' }],
  creator: 'Lee Woo Jin',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nijoow | portfolio',
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: COLOR_TOKENS.surface.ink,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="h-full w-full" style={PALETTE_CSS_VARIABLES}>
      <body className={`${binggrae.variable} h-full w-full`}>
        <a
          href="#main-content"
          className="focus:bg-surface-ink focus:ring-brand-lavender fixed top-3 left-3 z-9999 -translate-y-24 rounded-lg px-4 py-3 font-bold text-white transition-transform outline-none focus:translate-y-0 focus:ring-2"
        >
          본문으로 건너뛰기
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': PERSON_ID,
                  name: 'Lee Woo Jin',
                  alternateName: 'nijoow',
                  url: SITE_URL,
                  jobTitle: 'Frontend Developer',
                  description: SITE_DESCRIPTION,
                  sameAs: ['https://github.com/nijoow'],
                  knowsAbout: [
                    'Next.js',
                    'React',
                    'TypeScript',
                    'Three.js',
                    'Web 3D',
                    'Frontend',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  inLanguage: 'ko-KR',
                  author: { '@id': PERSON_ID },
                },
              ],
            }),
          }}
        />
        <AppearanceProvider
          controls={
            process.env.VERCEL_ENV === 'preview' ||
            process.env.NODE_ENV === 'development' ||
            process.env.NEXT_PUBLIC_DESIGN_CONTROLS === '1'
          }
        >
          <IntroVisitProvider>
            <LazyMotion features={domMax}>
              <MotionConfig reducedMotion="user">
                <AmbientBackground />
                <CustomCursor />
                <div className="relative flex min-h-screen w-full flex-col bg-transparent text-white transition-all duration-300">
                  <NavBar />
                  <main
                    id="main-content"
                    tabIndex={-1}
                    className="mx-auto w-full max-w-4xl flex-auto px-4 pt-24 pb-24 focus:outline-none"
                  >
                    {children}
                  </main>
                  <footer className="mt-auto w-full border-t border-white/10">
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 px-4 py-7 sm:flex-row">
                      <span className="text-ink-muted text-sm">
                        &copy; {new Date().getFullYear()} Lee Woo Jin. All
                        Rights Reserved.
                      </span>
                      <div className="text-ink-muted flex items-center gap-4 text-sm font-bold">
                        <a
                          href="https://github.com/nijoow"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-visible:ring-brand-lavender inline-flex min-h-11 items-center rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
                        >
                          GitHub
                        </a>
                        <span className="text-ink-faint">|</span>
                        <a
                          href="mailto:nijoow1127@gmail.com"
                          className="focus-visible:ring-brand-lavender inline-flex min-h-11 items-center rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
                        >
                          nijoow1127@gmail.com
                        </a>
                      </div>
                    </div>
                  </footer>
                </div>
              </MotionConfig>
            </LazyMotion>
          </IntroVisitProvider>
        </AppearanceProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
