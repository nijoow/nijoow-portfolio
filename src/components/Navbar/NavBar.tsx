'use client';

import { Logo } from '@/components/Logo/Logo';
import Magnetic from '@/components/Motion/Magnetic';
import NavToggle from '@/components/Navbar/NavToggle';
import { AnimatePresence, m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavListItem } from './NavListItem';

const navList = [
  { text: 'Home', url: '/' },
  { text: 'Resume', url: '/resume' },
  { text: 'Works', url: '/works' },
  { text: 'Contact', url: '/contact' },
] as const;

function isActiveRoute(pathname: string, url: string) {
  return pathname === url || (url !== '/' && pathname.startsWith(`${url}/`));
}

export default function NavBar() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isNavShow = openPathname === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 768px)');
    const closeDesktopMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenPathname(null);
    };

    desktopMediaQuery.addEventListener('change', closeDesktopMenu);
    return () =>
      desktopMediaQuery.removeEventListener('change', closeDesktopMenu);
  }, []);

  useEffect(() => {
    if (!isNavShow) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenPathname(null);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavShow]);

  return (
    <nav aria-label="주요 메뉴" className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-5 shadow-lg backdrop-blur-xl">
        <Magnetic strength={0.2}>
          <Link
            href="/"
            onClick={() => setOpenPathname(null)}
            className="focus-visible:ring-brand-lavender text-brand-lavender group flex min-h-11 items-center rounded-lg outline-none focus-visible:ring-2"
            aria-label="nijoow 홈"
          >
            <Logo
              width={56}
              height={32}
              className="transition-opacity group-hover:opacity-80"
            />
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-1 md:flex">
          {navList.map(({ text, url }) => (
            <li className="list-none" key={text}>
              <Magnetic strength={0.3}>
                <NavListItem
                  text={text}
                  url={url}
                  isActive={isActiveRoute(pathname, url)}
                />
              </Magnetic>
            </li>
          ))}
        </ul>

        <NavToggle
          ref={toggleRef}
          isNavShow={isNavShow}
          onToggle={() =>
            setOpenPathname((currentPathname) =>
              currentPathname === pathname ? null : pathname,
            )
          }
        />
      </div>

      <AnimatePresence>
        {isNavShow && (
          <m.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-18 left-0 w-full overflow-hidden px-4 md:hidden"
          >
            <ul className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
              {navList.map(({ text, url }, i) => (
                <m.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={text}
                  className="list-none"
                >
                  <NavListItem
                    text={text}
                    url={url}
                    isActive={isActiveRoute(pathname, url)}
                    variant="mobile"
                    onClick={() => setOpenPathname(null)}
                  />
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
