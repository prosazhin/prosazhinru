import { initTranslations } from '@/i18n';
import { compilationsMethods, linksMethods, tagsMethods } from '@/lib/api';
import getMetadata from '@/utils/get-metadata';
import { Alert, Container } from '@pbcomponents/react';
import { Suspense } from 'react';
import List from './components/List';
import Search from './components/Search';
import TagList from './components/TagList';

const LinksPage = async ({ params }) => {
  const { locale } = await params;
  const tags = await tagsMethods.getList(locale);
  const links = await linksMethods.getList(locale);
  const compilations = await compilationsMethods.getList(locale);
  const { t } = await initTranslations(locale);

  return (
    <Container size='m'>
      {locale === 'en' && (
        <Alert
          description={t('langAlert')}
          className='mb-24'
          color='danger'
        />
      )}
      <h1 className='sr-only'>{t('pages:links.title')}</h1>
      <Suspense>
        <Search placeholder={t('search.placeholder')} />
        <TagList
          tags={tags}
          type='links'
        />
        <List
          data={[
            ...links.map((item) => ({ ...item, type: 'link' })),
            ...compilations.map((item) => ({ ...item, type: 'compilation' })),
          ]}
        />
      </Suspense>
    </Container>
  );
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:links.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages:links.pathname'),
  });
}

export default LinksPage;
