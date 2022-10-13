import React from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, ClickableTagsList, Projects } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'projects');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const tags = method.tags.serializer(await method.tags.getList());
  const activeTag = tags.filter((item) => item.url === context.params.tag)[0];
  const projects = method.projects.serializer(await method.projects.getList());
  const activeProjects = method.projects.serializer(await method.projects.getListWithTag(activeTag.id));

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      tags: tags,
      activeTag: activeTag,
      projects: projects,
      activeProjects: activeProjects,
    },
  };
}

export default function ProjectsPage({ page, navigations, contacts, tags, activeTag, projects, activeProjects }) {
  const router = useRouter();

  const activeTagsList = [];

  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      if (activeTagsList.every((item) => item.url !== tag.url)) {
        activeTagsList.push(tag);
      }
    });
  });

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_PROJECTS_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing/projects.jpg" url={router.asPath}>
      <MainContainer>
        <Container>
          <PageHeadline title={page.title} description={page.description} />
          <ClickableTagsList array={tags.filter((item) => activeTagsList.some((tag) => item.url === tag.url))} tagLinkTo="projects" customClass={style.tags} />
          <Projects array={activeProjects} tag={activeTag.url} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
