'use client';

import { useTranslation } from 'react-i18next';

import { Button, Container } from '@pbcomponents/react';

const NotFoundContent = () => {
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  return (
    <Container size="s">
      <h1 className="w-full text-h48 text-basic-main">{t('pages.notFound.title')}</h1>
      <Button size="m" color="secondary" theme="border" className="!mt-24" href={`/${lang}`}>
        {t('goToHome')}
      </Button>
    </Container>
  );
};

export default NotFoundContent;
