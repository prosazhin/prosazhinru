'use client';

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function useHash(wrapperId: string) {
  const params = useParams();
  const [activeHash, setActiveHash] = useState('');

  const handleHashChange = () => {
    const hash = window.location.hash.replace('#', '');
    setActiveHash(hash);
  };

  useEffect(() => {
    handleHashChange();
  }, [params]);

  const handleChangeUrl = (customEvent: Event) => () => {
    const element = document.getElementById(wrapperId);
    const offsetTop = window.pageYOffset;

    if (element !== null) {
      const elementTop = element.offsetTop;

      if (offsetTop < elementTop) {
        window.history.replaceState(null, '', `${window.location.pathname}`);
        window.dispatchEvent(customEvent);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let throttleTimer: boolean;

      const throttle = (callback: () => void, time: number) => {
        if (throttleTimer) return;
        throttleTimer = true;

        setTimeout(() => {
          callback();

          throttleTimer = false;
        }, time);
      };

      const customEvent = new Event('hashchange');

      window.addEventListener('scroll', () => throttle(handleChangeUrl(customEvent), 450));
      return () => window.removeEventListener('scroll', handleChangeUrl(customEvent));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeHash;
}
