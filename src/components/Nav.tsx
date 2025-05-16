'use client';

import nav from '@/data/nav';
import { useDialog } from '@pbcomponents/react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const { closeDialog } = useDialog();

  return (
    <nav className={clsx('desktop:flex-row flex flex-col gap-24', className)}>
      {nav.map((link, index) => (
        <li key={index}>
          <NextLink
            href={lang === 'ru' ? link.url : `/${lang}${link.url}`}
            className={clsx(
              'text-tm16 text-basic-main group-hover:text-basic-light hover:!text-primary-darker !no-underline transition-colors duration-150',
              link.active.some((item) => pathname === item) ? '!text-primary-darker' : ''
            )}
            onClick={() => closeDialog('mobile-menu')}
          >
            {t(`nav.${link.type}`)}
          </NextLink>
        </li>
      ))}
    </nav>
  );
};

export default Nav;
