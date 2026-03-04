'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ScrollToTop = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
