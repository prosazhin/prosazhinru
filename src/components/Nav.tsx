'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import nav from '@/data/nav';
import clsx from 'clsx';

const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  return (
    <nav className={clsx('flex flex-col desktop:flex-row gap-24', className)}>
      {nav.map((link, index) => (
        <li key={index}>
          <NextLink
            href={lang === 'ru' ? link.url : `/${lang}${link.url}`}
            className={clsx(
              'text-tm16 text-basic-main group-hover:text-basic-light !no-underline transition-colors hover:!text-primary-darker',
              link.active.some((item) => pathname === item) ? '!text-primary-darker' : ''
            )}
          >
            {t(`nav.${link.type}`)}
          </NextLink>
        </li>
      ))}
    </nav>
  );
};

export default Nav;
