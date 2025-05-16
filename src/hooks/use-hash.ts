'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';

export default function useHash(wrapperId: string) {
  const pathname = usePathname();
  const [isMounted, setMounted] = useState(false);
  const [hash, setHash] = useState('');
  const { y } = useWindowScroll();

  useEffect(() => {
    if (isMounted) {
      let throttleTimer: boolean;

      const throttle = (callback: () => void, time: number) => {
        if (throttleTimer) return;
        throttleTimer = true;

        setTimeout(() => {
          callback();

          throttleTimer = false;
        }, time);
      };

      const handel = () => {
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

      throttle(() => handel(), 600);
    } else {
      setMounted(true);
    }
  }, [isMounted, pathname, wrapperId, y]);

  return hash;
}
