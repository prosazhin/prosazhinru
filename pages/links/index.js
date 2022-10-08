import React from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import { useAppContext } from '../../context';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, ClickableTagsList, Links, LinkTabs } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'links');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const tags = method.tags.serializer(await method.tags.getList());
  const links = method.links.serializer(await method.links.getList());

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      tags: tags,
      links: links,
    },
  };
}

export default function LinksPage({ page, navigations, tags, links, contacts }) {
  const router = useRouter();
  const context = useAppContext();

  const activeTagsList = [];

  links.forEach((link) => {
    link.tags.forEach((tag) => {
      if (activeTagsList.every((item) => item.url !== tag.url)) {
        activeTagsList.push(tag);
      }
    });
  });

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_LINKS_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing-links.jpg" url={router.asPath}>
      <MainContainer>
        <Container>
          <LinkTabs array={context.linksTabs} customClass={style.tabs} />
          <PageHeadline title={page.title} description={page.description} />
          <ClickableTagsList array={tags.filter((item) => activeTagsList.some((tag) => item.url === tag.url))} tagLinkTo="links" customClass={style.tags} />
          <Links array={links} customClass={style.links} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
