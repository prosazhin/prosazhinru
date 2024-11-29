'use client';

import NextLink from 'next/link';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { MatrixBannerType } from '@/types';
import { Icon } from '@pbcomponents/react';
import clsx from 'clsx';

const MatrixBanner = ({ title, description, href, className }: MatrixBannerType) => {
  return (
    <NextLink
      href={href}
      target="_self"
      className={clsx('group bg-white !no-underline transition-colors', className)}
    >
      <div className="flex flex-row items-center w-full px-24 py-16 transition border-solid rounded-8 border-1 border-secondary-lighter group-hover:border-primary-main">
        <div className="flex flex-col flex-1 gap-y-2">
          <span className="w-full transition-colors text-basic-main text-tm20 group-hover:text-primary-darker">
            {title}
          </span>
          {description && (
            <span className="w-full transition-colors text-basic-light text-t16 group-hover:text-basic-main">
              {description}
            </span>
          )}
        </div>
        <Icon
          tag={ArrowRightIcon}
          size="l"
          className="!text-basic-light group-hover:!text-primary-darker transition-colors"
        />
      </div>
    </NextLink>
  );
};

export default MatrixBanner;
