'use client';

import { usePathname } from 'next/navigation';

import { Bars2Icon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

import { Button, useDialog } from '@pbcomponents/react';

import Nav from '@/components/Nav';

const MobileMenu = () => {
  const pathname = usePathname();
  const { showDialog } = useDialog();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return (
    <>
      <Button
        size="s"
        color="secondary"
        theme="ghost"
        leftIcon={Bars2Icon}
        className="desktop:!hidden"
        onClick={() => showDialog({ children: <Nav /> })}
      />
    </>
  );
};

export default MobileMenu;
