import { initTranslations } from '@/i18n';
import { getLocale } from '@/utils/get-locale';
import getMetadata from '@/utils/get-metadata';
import { Tab, Tabs } from '@pbcomponents/react';
import CategoryList from '../components/List';

const DeveloperPage = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);
  const { default: matrixData } = await import('@/data/matrix');

  const type = 'developer';
  const category = t(`matrix:${type}`, { returnObjects: true }).map((cat, index) => ({
    id: String(index),
    title: cat.title,
    competencies: cat.competencies.map((comp) => ({
      id: comp.id,
      title: comp.title,
      rating: matrixData[type][comp.id] ?? 0,
    })),
  }));
  const matrix = { type, category };

  return (
    <>
      <h1 className='sr-only'>{t('pages:developer.title')}</h1>
      <Tabs
        defaultIndex={1}
        className='mt-80'
      >
        {t('tabs.matrix', { returnObjects: true }).map(({ title, url }) => (
          <Tab
            key={url}
            label={title}
            href={url}
          />
        ))}
      </Tabs>
      <CategoryList
        matrix={matrix}
        locale={locale}
      />
    </>
  );
};

export async function generateMetadata() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:developer.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: '/developer',
  });
}

export default DeveloperPage;
