'use client';

import useHash from '@/hooks/use-hash';
import clsx from 'clsx';
import Link from 'next/link';

const AsideNav = ({
  data,
  wrapperId,
}: {
  data: { title: string; type: string }[];
  wrapperId: string;
}) => {
  const hash = useHash(wrapperId);

  return (
    <ul className='border-secondary-lighter hidden w-full flex-col gap-y-8 border-t-1 pt-32 xl:flex print:hidden'>
      {data.map(({ title, type }, index) => (
        <li key={index}>
          <Link
            href={`#${type}`}
            scroll={true}
            className={clsx(
              'text-tm16 text-basic-light hover:text-primary-darker transition-colors duration-150',
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
