import Mixpanel from '@/components/Mixpanel';
import { initTranslations } from '@/i18n';
import { projectsMethods } from '@/lib/api';
import getMetadata from '@/utils/get-metadata';
import { Container } from '@pbcomponents/react';
import ProjectList from './components//List';

const ProjectsPage = async ({ params }) => {
  const { locale } = await params;
  const projects = await projectsMethods.getList(locale);
  const { t } = await initTranslations(locale);

  return (
    <Container size='m'>
      <h1 className='sr-only'>{t('pages.projects.title')}</h1>
      <span className='text-h64 hidden print:mt-[100dvh] print:!block print:pt-20 print:pb-20'>
        {t('pages.projects.title')}
      </span>
      <ProjectList projects={projects} />
      <Mixpanel event='LOADING_PROJECTS_PAGE' />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.projects.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.projects.pathname'),
  });
}

export default ProjectsPage;
