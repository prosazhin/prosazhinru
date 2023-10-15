import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';

import { projectsMethods } from '@/lib/api';

import ProjectList from './components/ProjectList';

const ProjectsPage = async ({ params: { lang } }) => {
  const projects = await projectsMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container>
      <h1 className="mb-[24px] w-full text-h1 text-base-main">{t.pages.projects.title}</h1>
      <ProjectList projects={projects} />
      <Mixpanel event="LOADING_PROJECTS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.projects.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.projects.pathname,
  });
}

export default ProjectsPage;
