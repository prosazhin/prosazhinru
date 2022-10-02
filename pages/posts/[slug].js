import React from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, StaticTagsList, Content } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'posts');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const post = method.post.serializer(await method.post.getItem(context.params.slug));

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      post: post,
    },
  };
}

export default function PostPage({ page, navigations, contacts, post }) {
  const router = useRouter();

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_POST_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={post.title} description={page.metaDescription} image="/sharing-posts.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={post.title} />
          <StaticTagsList array={post.tags} />
          <span className={style.date}>{post.createString}</span>
        </Container>
        <Content data={post} />
      </MainContainer>
    </MainWrapper>
  );
}
