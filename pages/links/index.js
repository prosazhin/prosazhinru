import React, { useState, useEffect } from 'react';
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
      query: context.query,
      links: links,
    },
  };
}

export default function LinksPage({ page, navigations, contacts, tags, query, links }) {
  const router = useRouter();
  const context = useAppContext();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    const activeTagsList = [];

    links.forEach((link) => {
      link.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);

    // Отправляю событие про отправку страницы
    Mixpanel.event('LOADING_LINKS_PAGE');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing/links.jpg" url={router.asPath}>
      <MainContainer>
        <Container>
          <LinkTabs array={context.linksTabs} customClass={style.tabs} />
          <PageHeadline title={page.title} description={page.description} />
          <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="links" activeTag={activeTag} customClass={style.tags} />
          <Links array={activeTag !== undefined ? links.filter((link) => link.tags.some((tag) => tag.url === activeTag.url)) : links} customClass={style.links} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
