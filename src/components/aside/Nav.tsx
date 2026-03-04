'use client';

import useHash from '@/hooks/use-hash';
import clsx from 'clsx';
import Link from 'next/link';

type NavItem = { type: string; title: string };

const AsideNav = ({ wrapperId, items }: { wrapperId: string; items: NavItem[] }) => {
  const hash = useHash(wrapperId);

  return (
    <ul className='border-secondary-lighter hidden w-full flex-col gap-y-8 border-t pt-32 xl:flex print:hidden'>
      {items.map(({ title, type }) => (
        <li key={type}>
          <Link
            href={`#${type}`}
            scroll={true}
            className={clsx(
              'text-tm16 text-basic-light hover:text-primary-darker transition-colors duration-150',
              (type === hash || (type === items[0].type && !hash?.length)) && 'text-basic-main!'
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
