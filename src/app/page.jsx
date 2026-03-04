import Contacts from '@/components/Contacts';
import MatrixBanner from '@/components/MatrixBanner';
import LeftAside from '@/components/aside';
import skillsByType from '@/data/skills';
import { initTranslations } from '@/i18n';
import { getLocale } from '@/utils/get-locale';
import getMetadata from '@/utils/get-metadata';
import { Badge, Container, Tab, Tabs } from '@pbcomponents/react';
import clsx from 'clsx';

const IndexPage = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);
  const wrapperId = 'aboutList';

  const skills = t('skills:entries', { returnObjects: true }).map((entry) => {
    const extra = skillsByType[entry.type];

    return {
      type: entry.type,
      title: entry.title,
      description: entry.description,
      matrixContent: entry.matrix,
      showTitle: extra?.title ?? false,
      tools: extra?.tools ?? [],
      matrixUrl: extra?.matrixUrl,
    };
  });

  return (
    <Container
      size='s'
      leftAside={
        <LeftAside
          wrapperId={wrapperId}
          data={t('skills:entries', { returnObjects: true }).map(({ type, title }) => ({
            type,
            title,
          }))}
        />
      }
    >
      <h1 className='text-t24 text-basic-main'>{t('pages:index.title')}</h1>
      <p
        className='text-t24 text-basic-main link mt-16 print:hidden'
        dangerouslySetInnerHTML={{ __html: t('pages:index.description') }}
      />
      <Contacts />
      <Tabs
        defaultIndex={0}
        className='mt-80 print:hidden'
      >
        {t('tabs.about', { returnObjects: true }).map(({ title, url }, index) => (
          <Tab
            key={index}
            label={title}
            href={url}
          />
        ))}
      </Tabs>
      <span
        className={clsx(
          'text-h64 hidden print:mt-230 print:block! print:pt-60',
          locale === 'en' && 'print:mt-230'
        )}
      >
        {t('tabs.about', { returnObjects: true })[0].title}
      </span>
      <ul
        className='mt-40 flex flex-col gap-y-40'
        id={wrapperId}
      >
        {skills.map(
          ({ type, title, description, showTitle, tools, matrixContent, matrixUrl }, index) => (
            <li
              className='flex w-full scroll-mt-96 flex-col gap-y-20'
              key={index}
              id={type}
            >
              <div className='flex w-full flex-col gap-y-12'>
                {showTitle && <h2 className='text-h24 text-basic-main w-full'>{title}</h2>}
                <p className='text-t20 text-basic-main w-full'>{description}</p>
              </div>
              {Boolean(tools.length) && (
                <ul className='flex w-full flex-row flex-wrap gap-4'>
                  {tools.map((tool, index) => (
                    <li key={index}>
                      <Badge
                        size='s'
                        color='secondary'
                        theme='light'
                        className='print:border-secondary-light print:border'
                      >
                        {tool}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
              {matrixContent && matrixUrl && (
                <MatrixBanner
                  title={matrixContent.title}
                  description={matrixContent.description}
                  href={matrixUrl}
                />
              )}
            </li>
          )
        )}
      </ul>
    </Container>
  );
};

export async function generateMetadata() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    pathname: '/',
  });
}

export default IndexPage;
