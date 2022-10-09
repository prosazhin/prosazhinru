import React from 'react';
import { useRouter } from 'next/router';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, Content, PostInfoBar } from '../../components';

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
    <MainWrapper navigations={navigations} contacts={contacts} title={`${post.title} | ${page.metaTitle}`} description={page.metaDescription} image="/sharing-posts.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={post.title} />
          <PostInfoBar data={post} />
        </Container>
        <Content data={post.content} />
      </MainContainer>
    </MainWrapper>
  );
}
