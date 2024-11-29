import { notFound } from 'next/navigation';

import { initTranslations } from '@/i18n';
import getMetadata from '@/utils/get-metadata';

function NotFoundCatchAll() {
  notFound();
}

export async function generateMetadata({ params: { locale } }) {
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.notFound.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.index.pathname'),
  });
}

export default NotFoundCatchAll;
