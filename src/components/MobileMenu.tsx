'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { Bars2Icon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';

import nav from '@/data/nav';
import { AnyObjectType, LangType } from '@/types';
import getActiveLink from '@/utils/get-active-link';
import clsx from 'clsx';

import Modal from '@/components/Modal';

type Props = {
  lang: LangType;
  t: AnyObjectType;
};

const MobileMenu = ({ lang, t }: Props) => {
  const pathname = usePathname();
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsActiveMenu(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-sm bg-white hover:bg-secondary-lighter desktop:hidden"
        onClick={() => setIsActiveMenu(true)}
      >
        <Bars2Icon className="h-[16px] w-[16px]" />
      </button>
      <Modal isOpen={isActiveMenu} setIsOpen={(value) => setIsActiveMenu(value)}>
        <nav className="flex w-full flex-col space-y-[12px]">
          {nav.map((link) => (
            <Fragment key={link.url}>
              {link.lang.includes(lang) && (
                <li>
                  <NextLink
                    href={lang === 'ru' ? link.url : `/${lang}${link.url}`}
                    className={clsx(
                      'text-tm3 !text-base-main !no-underline hover:!text-primary-main',
                      getActiveLink(link.active, pathname) ? '!text-primary-main' : ''
                    )}
                  >
                    {t.nav[link.type]}
                  </NextLink>
                </li>
              )}
            </Fragment>
          ))}
        </nav>
      </Modal>
    </>
  );
};

export default MobileMenu;
