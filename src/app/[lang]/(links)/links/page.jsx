import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';
import Tabs from '@/components/Tabs';

import { linksMethods, tagsMethods } from '@/lib/api';

import Search from '../components/Search';
import TagList from '../components/TagList';
import LinkList from './components/LinkList';

const LinksPage = async ({ params: { lang } }) => {
  const tags = await tagsMethods.getList(lang);
  const links = await linksMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container>
      <h1 className="mb-[16px] w-full text-h1 text-base-main">{t.pages.links.title}</h1>
      <Search placeholder={t.search.placeholder} type="links" />
      <TagList tags={tags} type="links" />
      <Tabs data={t.tabs.links} keyName="url" display="title" selected="/links" />
      <LinkList links={links} />
      <Mixpanel event="LOADING_LINKS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.links.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.links.pathname,
  });
}

export default LinksPage;
