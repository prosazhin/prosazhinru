'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { Fragment } from 'react';

import nav from '@/data/nav';
import { AnyObjectType, LangType } from '@/types';
import getActiveLink from '@/utils/get-active-link';
import clsx from 'clsx';

type Props = {
  lang: LangType;
  t: AnyObjectType;
};

const Nav = ({ lang, t }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row space-x-[24px] sm:hidden">
      {nav.map((link) => (
        <Fragment key={link.url}>
          {link.lang.includes(lang) && (
            <li>
              <NextLink
                href={lang === 'ru' ? link.url : `/${lang}${link.url}`}
                className={clsx(
                  'text-tm3 text-base-main !no-underline transition hover:text-primary-main',
                  getActiveLink(link.active, pathname) ? 'text-primary-main' : ''
                )}
              >
                {t.nav[link.type]}
              </NextLink>
            </li>
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default Nav;
