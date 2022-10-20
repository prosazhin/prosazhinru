import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import { useAppContext } from '../../context';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, ClickableTagsList, Selections, LinkTabs } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'selections');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const tags = method.tags.serializer(await method.tags.getList());
  const selections = method.selections.serializer(await method.selections.getList());

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      tags: tags,
      query: context.query,
      selections: selections,
    },
  };
}

export default function SelectionsPage({ page, navigations, contacts, tags, query, selections }) {
  const router = useRouter();
  const context = useAppContext();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    const activeTagsList = [];

    selections.forEach((selection) => {
      selection.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);

    // Отправляю событие про отправку страницы
    Mixpanel.event('LOADING_SELECTIONS_PAGE');

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
          <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="selections" activeTag={activeTag} customClass={style.tags} />
          <Selections array={activeTag !== undefined ? selections.filter((selection) => selection.tags.some((tag) => tag.url === activeTag.url)) : selections} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
