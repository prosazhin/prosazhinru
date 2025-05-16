'use client';

import { Button, Container } from '@pbcomponents/react';
import { useTranslation } from 'react-i18next';

const NotFoundContent = () => {
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  return (
    <Container size='s'>
      <h1 className='text-h48 text-basic-main w-full'>{t('pages.notFound.title')}</h1>
      <Button
        size='m'
        color='secondary'
        theme='border'
        className='!mt-24'
        href={`/${lang}`}
      >
        {t('goToHome')}
      </Button>
    </Container>
  );
};

export default NotFoundContent;
