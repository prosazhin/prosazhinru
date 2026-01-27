import { initTranslations } from '@/i18n';
import { matrixMethods } from '@/lib/api';
import getMetadata from '@/utils/get-metadata';
import { Tab, Tabs } from '@pbcomponents/react';
import CategoryList from '../components/List';

const DesignerPage = async ({ params }) => {
  const { locale } = await params;
  const matrix = await matrixMethods.getOne('designer', locale);
  const { t } = await initTranslations(locale);

  return (
    <>
      <h1 className='sr-only'>{t('pages.designer.title')}</h1>
      <Tabs
        defaultIndex={0}
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

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.designer.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.designer.pathname'),
  });
}

export default DesignerPage;
