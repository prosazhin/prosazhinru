import React from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, StaticTagsList, Content, SocialLinks } from '../../components';

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

  // Отправляю событие про отправку страницы
  Mixpanel.event('LOADING_PROJECT_PAGE');

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={project.title} description={page.metaDescription} image="/sharing-projects.jpg" url={router.asPath}>
      <MainContainer>
        <Container small>
          <PageHeadline title={project.title} />
          <div className={style.wrapper}>
            <StaticTagsList array={project.tags} customClass={style.tags} />
            <span className={style.date}>{project.createString}</span>
            <SocialLinks
              data={[
                project.gitUrl ? { title: 'GitHub', url: project.gitUrl } : null,
                project.figmaUrl ? { title: 'Figma', url: project.figmaUrl } : null,
                project.projectUrl ? { title: 'Site', url: project.projectUrl } : null,
              ]}
              customClass={style.social_link}
            />
          </div>
        </Container>
        <Content data={project} />
      </MainContainer>
    </MainWrapper>
  );
}
