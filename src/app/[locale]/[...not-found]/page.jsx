import { initTranslations } from '@/i18n';
import getMetadata from '@/utils/get-metadata';
import { notFound } from 'next/navigation';

function NotFoundCatchAll() {
  notFound();
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:notFound.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages:index.pathname'),
  });
}

export default NotFoundCatchAll;
