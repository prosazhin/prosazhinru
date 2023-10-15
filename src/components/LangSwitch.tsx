'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';

import { AnyObjectType, LangType } from '@/types';
import { i18n } from '@/utils/i18n';
import { Menu, Transition } from '@headlessui/react';

type Props = {
  lang: LangType;
  t: AnyObjectType;
};

const LangSwitch = ({ lang, t }: Props) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let result: string | null = pathname;

    if (pathname === '/' || pathname === '/en') {
      result = '/';
    }

    setCurrentUrl(result ? result.replace(`/${lang}`, '') : '/');
  }, [pathname]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full items-center justify-center rounded-sm border border-secondary-light px-[8px] py-[4px] text-tm4 text-base-main transition hover:border-primary-main focus:outline-none">
        <span className="uppercase">{lang}</span>
        <ChevronUpDownIcon className="ml-[6px] h-[16px] w-[16px]" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-[4px] flex w-[240px] origin-top-right flex-col overflow-hidden rounded-md border border-secondary-lighter bg-white py-[12px] shadow-lg focus:outline-none">
          {i18n.locales.map((item) => (
            <Menu.Item key={item}>
              <NextLink
                href={item === 'ru' ? `${currentUrl}` : `/${item}${currentUrl}`}
                className="flex flex-row items-center bg-white px-[24px] py-[12px] text-t3 text-base-main !no-underline transition hover:bg-base-lightest hover:text-primary-main"
              >
                {lang === item && (
                  <CheckIcon
                    className="mr-[8px] h-[24px] w-[24px] text-primary-main"
                    aria-hidden="true"
                  />
                )}
                {t.locales[item]}
              </NextLink>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LangSwitch;
