import React from 'react';
import { useRouter } from 'next/router';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, Projects } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'projects');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const projects = method.projects.serializer(await method.projects.getList());

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      projects: projects,
    },
  };
}

export default function ProjectsPage({ page, navigations, contacts, projects }) {
  const router = useRouter();

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_PROJECTS_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing-projects.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={page.title} description={page.description} />
          <Projects array={projects} />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
