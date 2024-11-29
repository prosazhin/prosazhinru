'use client';

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { Button } from '@pbcomponents/react';

const ToTop = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => () => {
    const offsetTop = window.pageYOffset;
    setShow(offsetTop > 500);
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

      window.addEventListener('scroll', () => throttle(handleScroll(), 200));
      return () => window.removeEventListener('scroll', handleScroll());
    }
  }, []);

  return (
    <>
      {show && (
        <div className="fixed z-50 w-64 pointer-events-none bottom-16 right-16 desktop:bottom-24 desktop:right-24">
          <Button
            size="l"
            color="secondary"
            theme="ghost"
            className="!w-max !pointer-events-auto"
            leftIcon={ArrowUpIcon}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          />
        </div>
      )}
    </>
  );
};

export default ToTop;
