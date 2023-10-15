'use client';

import { ChevronUpIcon } from '@heroicons/react/20/solid';

import { AnyObjectType } from '@/types';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';

import Badge from '@/components/Badge';

type Props = {
  t: AnyObjectType;
};

const Spoiler = ({ t }: Props) => {
  return (
    <Disclosure
      as="div"
      className="mt-[40px] rounded-md border border-secondary-lighter px-[24px] py-[20px]"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex flex-row items-center w-full text-left">
            <h2 className="flex-1 w-full text-h3 text-base-main">{t.grades.headline}</h2>
            <ChevronUpIcon
              className={clsx('h-[24px] w-[24px] text-base-light', !open ? 'rotate-180' : '')}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-[16px]">
            <ul className="flex w-full flex-col space-y-[16px]">
              {[1, 2, 3, 4].map((item) => (
                <li className="flex w-full flex-col space-y-[4px]" key={item}>
                  <span className="flex w-full flex-row items-center space-x-[8px] text-tm2 text-base-main">
                    <span>{t.grades[item].title}</span>
                    <Badge title={`${item}`} size="xs" color="secondary" theme="light" />
                  </span>
                  <span className="w-full text-t3 text-base-main">
                    {t.grades[item].description}
                  </span>
                </li>
              ))}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Spoiler;
