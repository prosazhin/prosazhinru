import career from '@/data/career';
import { initTranslations } from '@/i18n';
import { getDiffJobDate, getFormatJobDate, ucFirst } from '@/utils/formatter';
import getMetadata from '@/utils/get-metadata';
import { Badge, Container, Tab, Tabs } from '@pbcomponents/react';

import Contacts from '@/components/Contacts';
import Mixpanel from '@/components/Mixpanel';
import LeftAside from '@/components/aside';

const CareerPage = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale);
  const wrapperId = 'careerList';

  return (
    <Container
      size="s"
      leftAside={
        <LeftAside
          wrapperId={wrapperId}
          data={career.map(({ type }) => ({
            title: t(`career.${type}.titleForAside`),
            type: type,
          }))}
        />
      }
    >
      <h1 className="text-t24 text-basic-main">{t('pages.index.title')}</h1>
      <p
        className="mt-16 text-t24 text-basic-main link"
        dangerouslySetInnerHTML={{ __html: t('pages.index.description') }}
      />
      <Contacts />
      <Tabs defaultIndex={1} className="mt-80">
        {t('tabs.about', { returnObjects: true }).map(({ title, url }, index) => (
          <Tab key={index} label={title} href={url} />
        ))}
      </Tabs>
      <article className="flex flex-col w-full mt-40 gap-y-40" id={wrapperId}>
        {career.map(({ type, url, positions, dateFrom, dateTo }, index) => {
          const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, locale));
          const formatDateTo =
            dateTo === 'now' ? t('now') : ucFirst(getFormatJobDate(dateTo, locale));
          const diffDate = getDiffJobDate(dateFrom, dateTo === 'now' ? new Date() : dateTo, locale);

          return (
            <section className="flex flex-col w-full gap-y-16 scroll-mt-96" key={index} id={type}>
              <div className="flex flex-col w-full gap-y-8">
                <h2 className="w-full text-h32 text-basic-main link">
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      {t(`career.${type}.title`)}
                    </a>
                  ) : (
                    <>{t(`career.${type}.title`)}</>
                  )}
                </h2>
                <span className="w-full text-t16 text-basic-light">
                  {`${formatDateFrom} – ${formatDateTo}, ${diffDate}`}
                </span>
              </div>
              <ul className="flex flex-col w-full gap-y-16">
                {positions.map((position, index) => (
                  <li className="mr-[4px] mt-[4px]" key={index}>
                    <h3 className="w-full text-tm20 text-basic-main">
                      {t(`career.positions.${position.type}`)}
                    </h3>
                    <p className="w-full mt-4p text-t16 text-basic-main">
                      {t(`career.${type}.positions.${position.type}`)}
                    </p>
                    <ul className="flex flex-row flex-wrap w-full gap-4 mt-12">
                      {position.stack.map((tool) => (
                        <li key={tool}>
                          <Badge size="s" color="secondary" theme="light">
                            {tool}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </article>
      <Mixpanel event="LOADING_JOBS_PAGE" />
    </Container>
  );
};

export async function generateMetadata({ params: { locale } }) {
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.career.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.career.pathname'),
  });
}

export default CareerPage;
