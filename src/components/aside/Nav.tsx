'use client';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import useHash from '@/hooks/use-hash';
import clsx from 'clsx';

const AsideNav = ({
  data,
  wrapperId,
}: {
  data: { title: string; type: string }[];
  wrapperId: string;
}) => {
  const {
    i18n: { language: locale },
  } = useTranslation();
  const hash = useHash(wrapperId);

  return (
    <ul className="flex-col hidden w-full pt-32 gap-y-8 xl:flex">
      {data.map(({ title, type }, index) => (
        <li key={index}>
          <Link
            href={`#${type}`}
            scroll={true}
            locale={locale}
            className={clsx(
              'transition-colors text-tm16 text-basic-light hover:text-primary-darker',
              (type === hash || (type === data[0].type && !hash?.length)) && '!text-basic-main'
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AsideNav;
