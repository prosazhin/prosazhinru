'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useWindowScroll } from 'react-use';

const emptySubscribe = () => () => {};

export default function useHash(wrapperId: string) {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [hash, setHash] = useState('');
  const { y } = useWindowScroll();

  useEffect(() => {
    if (!isMounted) return;

    const handle = () => {
      const curHash = window.location.hash.replace('#', '');
      const element = document.getElementById(wrapperId);

      if (element !== null) {
        const elementTop = element.offsetTop;

        if (y < elementTop) {
          window.history.replaceState(null, '', `${pathname}`);
        }
      }

      setHash(curHash);
    };

    handle();
  }, [isMounted, pathname, wrapperId, y]);

  return hash;
}
