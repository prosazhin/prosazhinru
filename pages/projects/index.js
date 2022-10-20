import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import Mixpanel from '../../utils/Mixpanel';
import method from '../../methods';
import { MainWrapper, MainContainer, Container, PageHeadline, ClickableTagsList, Projects } from '../../components';

export async function getServerSideProps(context) {
  const pages = method.pages.serializer(await method.pages.getList(), 'projects');
  const contacts = method.contacts.serializer(await method.contacts.getList());
  const tags = method.tags.serializer(await method.tags.getList());
  const projects = method.projects.serializer(await method.projects.getList());

  return {
    props: {
      page: pages.page,
      navigations: pages.navigations,
      contacts: contacts,
      tags: tags,
      query: context.query,
      projects: projects,
    },
  };
}

export default function ProjectsPage({ page, navigations, contacts, tags, query, projects }) {
  const router = useRouter();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    const activeTagsList = [];

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);

    // Отправляю событие про отправку страницы
    Mixpanel.event('LOADING_PROJECTS_PAGE');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <MainWrapper navigations={navigations} contacts={contacts} title={page.metaTitle} description={page.metaDescription} image="/sharing/projects.jpg" url={router.asPath}>
      <MainContainer>
        <Container>
          <PageHeadline title={page.title} description={page.description} />
          <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="projects" activeTag={activeTag} customClass={style.tags} />
          <Projects
            array={activeTag !== undefined ? projects.filter((project) => project.tags.some((tag) => tag.url === activeTag.url)) : projects}
            tag={activeTag !== undefined ? activeTag.url : null}
          />
        </Container>
      </MainContainer>
    </MainWrapper>
  );
}
