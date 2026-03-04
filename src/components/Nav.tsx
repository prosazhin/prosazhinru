'use client';

import nav from '@/data/nav';
import { useDialog } from '@pbcomponents/react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { closeDialog } = useDialog();
  const items = t('nav', { returnObjects: true }) as Array<{ type: string; title: string }>;

  return (
    <nav className={clsx('desktop:flex-row flex flex-col gap-24', className)}>
      {items.map((item, index) => {
        const { url, active } = nav[item.type as keyof typeof nav];
        return (
          <li key={index}>
            <NextLink
              href={url}
              className={clsx(
                'text-tm16 text-basic-main group-hover:text-basic-light hover:text-primary-darker! no-underline! transition-colors duration-150',
                active.some((path) => pathname === path) ? 'text-primary-darker!' : ''
              )}
              onClick={() => closeDialog('mobile-menu')}
            >
              {item.title}
            </NextLink>
          </li>
        );
      })}
    </nav>
  );
};

export default Nav;
