import NextLink from 'next/link';

import { AnyObjectType } from '@/types';
import clsx from 'clsx';

type Props = {
  data: AnyObjectType[];
  keyName: string;
  display: string;
  selected: string;
  className?: string;
};

const Tabs = ({ data, keyName, display, selected, className }: Props) => {
  return (
    <div
      className={clsx(
        'relative w-full after:absolute after:bottom-0 after:inset-x-0 after:-z-10 after:h-[2px] after:w-full after:rounded-full after:bg-secondary-lighter',
        className
      )}
    >
      <ul className="flex w-auto flex-row flex-nowrap items-center justify-start space-x-[16px] overflow-x-auto pb-[2px]">
        {data.map((item) => (
          <li className="relative z-10" key={item[keyName]}>
            <NextLink
              href={item[keyName]}
              className={clsx(
                'relative mb-[10px] inline-flex cursor-pointer flex-nowrap whitespace-nowrap rounded-md bg-transparent px-[8px] py-[2px] text-tm3 text-base-main !no-underline transition hover:bg-secondary-lighter hover:!text-base-main',
                selected === item[keyName]
                  ? '!text-primary-main after:absolute after:bottom-[-12px] after:inset-x-0 after:z-10 after:h-[2px] after:w-full after:rounded-full after:bg-primary-main'
                  : ''
              )}
            >
              {item[display]}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
