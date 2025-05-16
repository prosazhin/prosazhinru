'use client';

import Nav from '@/components/Nav';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { Button, useDialog } from '@pbcomponents/react';

const MobileMenu = () => {
  const { showDialog } = useDialog();

  return (
    <>
      <Button
        size='s'
        color='secondary'
        theme='ghost'
        leftIcon={Bars2Icon}
        className='desktop:!hidden'
        onClick={() => showDialog({ children: <Nav />, id: 'mobile-menu' })}
      />
    </>
  );
};

export default MobileMenu;
