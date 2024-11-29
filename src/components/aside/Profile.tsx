'use client';

import Image from 'next/image';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { getDiffJobDate } from '@/utils/formatter';
import { Button } from '@pbcomponents/react';

const AsideProfile = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

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
    <div className="flex flex-row w-full gap-x-20 xl:flex-col xl:gap-y-16 xl:gap-x-0">
      <Image
        className="hidden xl:block rounded-999 size-128"
        width={128}
        height={128}
        src="/avatar.jpg"
        alt="avatar"
        loading="eager"
      />
      <Image
        className="block xl:hidden rounded-999 size-96"
        width={96}
        height={96}
        src="/avatar.jpg"
        alt="avatar"
        loading="eager"
      />
      <div className="flex flex-col w-full gap-y-16">
        <div className="flex flex-col w-full text-t14 gap-y-2">
          <span className="block w-full text-tm16 desktop:hidden">{t('name')}</span>
          <span className="w-full">{t('location')}</span>
          <span className="w-full">
            <span className="text-basic-light">{t('age')}:</span>
            {` ${getDiffJobDate('1993-03-20', String(new Date()), locale)}`}
          </span>
          <span className="w-full">
            <span className="text-basic-light">{t('experience')}:</span>
            {` ${getDiffJobDate('2011-01-01', String(new Date()), locale)}`}
          </span>
        </div>
        {false && (
          <Button
            size="s"
            className="!w-max"
            leftIcon={ArrowDownTrayIcon}
            onClick={() => downloadCV()}
          >
            {t('download')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AsideProfile;
