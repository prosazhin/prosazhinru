import { headers } from 'next/headers';

import { initTranslations } from '@/i18n';
import { Button, Container } from '@pbcomponents/react';

import Mixpanel from '@/components/Mixpanel';

const NotFound = async () => {
  const headersList = headers();
  const full_url = headersList.get('referer');
  const pathname = new URL(full_url).pathname;
  const locale = pathname.startsWith('/en') ? 'en' : 'ru';
  const { t } = await initTranslations(locale);

  return (
    <Container size="s">
      <h1 className="w-full text-h48 text-basic-main">{t('pages.notFound.title')}</h1>
      <Button size="m" color="secondary" theme="border" className="!mt-24" href={`/${locale}`}>
        {t('goToHome')}
      </Button>
      <Mixpanel event="LOADING_404_ERROR_PAGE" />
    </Container>
  );
};

export default NotFound;
