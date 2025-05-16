'use client';

import { MatrixBannerType } from '@/types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Icon } from '@pbcomponents/react';
import clsx from 'clsx';
import NextLink from 'next/link';

const MatrixBanner = ({ title, description, href, className }: MatrixBannerType) => {
  return (
    <NextLink
      href={href}
      target='_self'
      className={clsx('group bg-white !no-underline transition-colors duration-150', className)}
    >
      <div className='rounded-8 border-secondary-lighter group-hover:border-primary-main flex w-full flex-row items-center border-1 border-solid px-24 py-16 transition'>
        <div className='flex flex-1 flex-col gap-y-2'>
          <span className='text-basic-main text-tm20 group-hover:text-primary-darker w-full transition-colors duration-150'>
            {title}
          </span>
          {description && (
            <span className='text-basic-light text-t16 group-hover:text-basic-main w-full transition-colors duration-150'>
              {description}
            </span>
          )}
        </div>
        <Icon
          tag={ArrowRightIcon}
          size='l'
          className='!text-basic-light group-hover:!text-primary-darker transition-colors duration-150'
        />
      </div>
    </NextLink>
  );
};

export default MatrixBanner;
