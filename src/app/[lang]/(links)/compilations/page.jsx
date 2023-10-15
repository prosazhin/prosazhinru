import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';
import Tabs from '@/components/Tabs';

import { compilationsMethods, tagsMethods } from '@/lib/api';

import Search from '../components/Search';
import TagList from '../components/TagList';
import CompilationList from './components/CompilationList';

const CompilationsPage = async ({ params: { lang } }) => {
  const tags = await tagsMethods.getList(lang);
  const compilations = await compilationsMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container>
      <h1 className="mb-[16px] w-full text-h1 text-base-main">{t.pages.compilations.title}</h1>
      <Search placeholder={t.search.placeholder} type="compilations" />
      <TagList tags={tags} type="compilations" />
      <Tabs data={t.tabs.links} keyName="url" display="title" selected="/compilations" />
      <CompilationList compilations={compilations} />
      <Mixpanel event="LOADING_COMPILATIONS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.compilations.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.compilations.pathname,
  });
}

export default CompilationsPage;
