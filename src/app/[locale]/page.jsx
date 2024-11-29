import skills from '@/data/skills';
import { initTranslations } from '@/i18n';
import getMetadata from '@/utils/get-metadata';
import { Badge, Container, Tab, Tabs } from '@pbcomponents/react';

import Contacts from '@/components/Contacts';
import MatrixBanner from '@/components/MatrixBanner';
import Mixpanel from '@/components/Mixpanel';
import LeftAside from '@/components/aside';

const IndexPage = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale);
  const wrapperId = 'aboutList';

  return (
    <Container
      size="s"
      leftAside={
        <LeftAside
          wrapperId={wrapperId}
          data={skills.map(({ type }) => ({ title: t(`skills.${type}.title`), type: type }))}
        />
      }
    >
      <h1 className="text-t24 text-basic-main">{t('pages.index.title')}</h1>
      <p
        className="mt-16 text-t24 text-basic-main link"
        dangerouslySetInnerHTML={{ __html: t('pages.index.description') }}
      />
      <Contacts />
      <Tabs defaultIndex={0} className="mt-80">
        {t('tabs.about', { returnObjects: true }).map(({ title, url }, index) => (
          <Tab key={index} label={title} href={url} />
        ))}
      </Tabs>
      <ul className="flex flex-col mt-40 gap-y-40" id={wrapperId}>
        {skills.map(({ type, title, tools, matrix }, index) => (
          <li className="flex flex-col w-full gap-y-20 scroll-mt-96" key={index} id={type}>
            <div className="flex flex-col w-full gap-y-12">
              {title && (
                <h2 className="w-full text-h24 text-basic-main">{t(`skills.${type}.title`)}</h2>
              )}
              <p className="w-full text-t20 text-basic-main">{t(`skills.${type}.description`)}</p>
            </div>
            {Boolean(tools.length) && (
              <ul className="flex flex-row flex-wrap w-full gap-4">
                {tools.map((tool, index) => (
                  <li key={index}>
                    <Badge size="s" color="secondary" theme="light">
                      {tool}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            {matrix && (
              <MatrixBanner
                title={t(`skills.${type}.matrix.title`)}
                description={t(`skills.${type}.matrix.description`)}
                href={t(`skills.${type}.matrix.url`)}
              />
            )}
          </li>
        ))}
      </ul>
      <Mixpanel event="LOADING_MAIN_PAGE" />
    </Container>
  );
};

export async function generateMetadata({ params: { locale } }) {
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    pathname: t('pages.index.pathname'),
  });
}

export default IndexPage;
