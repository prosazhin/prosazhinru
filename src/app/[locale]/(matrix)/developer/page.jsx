import { initTranslations } from '@/i18n';
import { matrixMethods } from '@/lib/api';
import getMetadata from '@/utils/get-metadata';
import { Tab, Tabs } from '@pbcomponents/react';
import CategoryList from '../components/List';

const DeveloperPage = async ({ params }) => {
  const { locale } = await params;
  const matrix = await matrixMethods.getOne('developer', locale);
  const { t } = await initTranslations(locale);

  return (
    <>
      <h1 className='sr-only'>{t('pages.developer.title')}</h1>
      <Tabs
        defaultIndex={1}
        className='mt-80'
      >
        {t('tabs.matrix', { returnObjects: true }).map(({ title, url }, index) => (
          <Tab
            key={index}
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

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.developer.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.developer.pathname'),
  });
}

export default DeveloperPage;
