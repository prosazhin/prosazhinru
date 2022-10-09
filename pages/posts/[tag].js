import React from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, Posts, ClickableTagsList } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'posts');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const tags = method.tags.serializer(await method.tags.getList());
  const activeTag = tags.filter((item) => item.url === context.params.tag)[0];
  const posts = method.posts.serializer(await method.posts.getList());
  const activePosts = method.posts.serializer(await method.posts.getListWithTag(activeTag.id));

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      tags: tags,
      activeTag: activeTag,
      posts: posts,
      activePosts: activePosts,
    },
  };
}

export default function PostsPage({ page, navigations, contacts, tags, activeTag, posts, activePosts }) {
  const router = useRouter();

  const activeTagsList = [];

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (activeTagsList.every((item) => item.url !== tag.url)) {
        activeTagsList.push(tag);
      }
    });
  });

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_POSTS_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing-posts.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={page.title} description={page.description} />
          <ClickableTagsList array={tags.filter((item) => activeTagsList.some((tag) => item.url === tag.url))} tagLinkTo="posts" customClass={style.tags} />
          <Posts array={activePosts} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
