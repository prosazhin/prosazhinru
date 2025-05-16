'use client';

import { getYearsDiff } from '@/utils/formatter';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@pbcomponents/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const AsideProfile = () => {
  const { t } = useTranslation();

  const downloadCV = () => {
    fetch(`/cv/${t('metaTitle')}.pdf`).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = `${t('metaTitle')}.pdf`;
        alink.click();
      });
    });
  };

  return (
    <div className='flex w-full flex-row gap-x-20 xl:flex-col xl:gap-x-0 xl:gap-y-16'>
      <Image
        className='rounded-999 size-96 xl:size-128'
        width={128}
        height={128}
        src='/avatar.jpg'
        alt='avatar'
        loading='eager'
      />
      <div className='flex w-full flex-col gap-y-16'>
        <div className='text-t14 flex w-full flex-col gap-y-2'>
          <span className='text-tm16 desktop:hidden block w-full'>{t('name')}</span>
          <span className='w-full'>{t('location')}</span>
          <span className='w-full'>
            <span className='text-basic-light'>{t('age')}:</span>
            {` ${t('plurals.year.year', {
              count: getYearsDiff('1993-03-20', String(new Date())),
            })}`}
          </span>
          <span className='w-full'>
            <span className='text-basic-light'>{t('experience')}:</span>
            {` ${t('plurals.year.year', {
              count: getYearsDiff('2011-01-01', String(new Date())),
            })}`}
          </span>
        </div>
        <Button
          size='s'
          className='!w-max print:!hidden'
          leftIcon={ArrowDownTrayIcon}
          onClick={() => downloadCV()}
        >
          {t('download')}
        </Button>
      </div>
    </div>
  );
};

export default AsideProfile;
