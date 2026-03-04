import compilationsData from '@/data/compilations';
import linksData from '@/data/links';
import tagsData from '@/data/tags';
import { initTranslations } from '@/i18n';
import { getLocale } from '@/utils/get-locale';
import getMetadata from '@/utils/get-metadata';
import { Alert, Container } from '@pbcomponents/react';
import List from './components/List';
import Search from './components/Search';
import TagList from './components/TagList';

const LinksPage = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  const tagsArray = Object.entries(tagsData).map(([id, { title, url }]) => ({
    id,
    title,
    url,
  }));

  const linksNormalized = linksData.map((item) => ({
    ...item,
    tags: (item.tags || []).map((slug) => {
      const tag = tagsData[slug];
      return tag
        ? { id: slug, title: tag.title, url: tag.url }
        : { id: slug, title: slug, url: slug };
    }),
  }));

  const linksById = new Map(linksNormalized.map((l) => [l.id, l]));

  const compilationsNormalized = compilationsData.map((c) => ({
    ...c,
    tags: (c.tags || []).map((slug) => {
      const tag = tagsData[slug];
      return tag
        ? { id: slug, title: tag.title, url: tag.url }
        : { id: slug, title: slug, url: slug };
    }),
    links: (c.links || []).map((id) => linksById.get(id)).filter(Boolean),
  }));

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
      <Search placeholder={t('search.placeholder')} />
      <TagList
        tags={tagsArray}
        type='links'
      />
      <List data={[...linksNormalized, ...compilationsNormalized]} />
    </Container>
  );
};

export async function generateMetadata() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:links.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: '/links',
  });
}

export default LinksPage;
