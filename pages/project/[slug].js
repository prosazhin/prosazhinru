import React, { useState } from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, Content, StateTabs, PostInfoBar } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'projects');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const project = method.project.serializer(await method.project.getItem(context.params.slug));

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      project: project,
    },
  };
}

export default function ProjectPage({ page, navigations, contacts, project }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_PROJECT_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={`${project.title} | ${page.metaTitle}`} description={page.metaDescription} image="/sharing-projects.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={project.title} />
          <PostInfoBar data={project} />
          {project.designContent && project.devContent && <StateTabs array={['Дизайн', 'Разработка']} active={activeTab} onChange={setActiveTab} customClass={style.tabs} />}
        </Container>
        {project.designContent && !project.devContent && <Content data={project.designContent} />}
        {project.devContent && !project.designContent && <Content data={project.devContent} />}
        {project.designContent && project.devContent && (
          <>
            {activeTab === 0 && <Content data={project.designContent} />}
            {activeTab === 1 && <Content data={project.devContent} />}
          </>
        )}
      </MainContainer>
    </MainWrapper>
  );
}
