import { initTranslations } from '@/i18n';
import getMetadata from '@/utils/get-metadata';
import { Container } from '@pbcomponents/react';

import Mixpanel from '@/components/Mixpanel';

import { projectsMethods } from '@/lib/api';

import ProjectList from './components//List';

const ProjectsPage = async ({ params: { locale } }) => {
  const projects = await projectsMethods.getList(locale);
  const { t } = await initTranslations(locale);

  return (
    <Container size="m">
      <h1 className="sr-only">{t('pages.projects.title')}</h1>
      <ProjectList projects={projects} />
      <Mixpanel event="LOADING_PROJECTS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { locale } }) {
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.projects.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.projects.pathname'),
  });
}

export default ProjectsPage;
