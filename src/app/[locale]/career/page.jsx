import Contacts from '@/components/Contacts';
import LeftAside from '@/components/aside';
import career from '@/data/career';
import { initTranslations } from '@/i18n';
import { getDiffJobDate, getFormatJobDate, ucFirst } from '@/utils/formatter';
import getMetadata from '@/utils/get-metadata';
import { Badge, Container, Tab, Tabs } from '@pbcomponents/react';
import clsx from 'clsx';

const CareerPage = async ({ params }) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale);
  const wrapperId = 'careerList';

  return (
    <Container
      size='s'
      leftAside={
        <LeftAside
          wrapperId={wrapperId}
          data={career.map(({ type }) => ({
            title: t(`career:${type}.titleForAside`),
            type: type,
          }))}
        />
      }
    >
      <h1 className='text-t24 text-basic-main'>{t('pages:index.title')}</h1>
      <p
        className='text-t24 text-basic-main link mt-16'
        dangerouslySetInnerHTML={{ __html: t('pages:index.description') }}
      />
      <Contacts />
      <Tabs
        defaultIndex={1}
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
          'text-h64 hidden print:mt-420 print:!block print:pt-20',
          locale === 'en' && 'print:pt-50'
        )}
      >
        {t('tabs.about', { returnObjects: true })[1].title}
      </span>
      <article
        className='mt-40 flex w-full flex-col gap-y-16'
        id={wrapperId}
      >
        {career.map(({ type, url, positions, dateFrom, dateTo, dismissal }, index) => {
          const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, locale));
          const formatDateTo =
            dateTo === 'now' ? t('now') : ucFirst(getFormatJobDate(dateTo, locale));
          const diffDate = getDiffJobDate(dateFrom, dateTo === 'now' ? new Date() : dateTo, locale);

          return (
            <section
              className='border-secondary-lighter rounded-16 flex w-full scroll-mt-96 flex-col gap-y-16 border-1 px-32 py-24'
              key={index}
              id={type}
            >
              <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-h32 text-basic-main link w-full'>
                  {url ? (
                    <a
                      href={url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {t(`career:${type}.title`)}
                    </a>
                  ) : (
                    <>{t(`career:${type}.title`)}</>
                  )}
                </h2>
                <span className='text-t16 text-basic-light w-full'>
                  {`${formatDateFrom} – ${formatDateTo}, ${diffDate}`}
                </span>
              </div>
              <ul className='flex w-full flex-col gap-y-16'>
                {positions.map((position, index) => (
                  <li
                    className='mt-[4px] mr-[4px]'
                    key={index}
                  >
                    <h3 className='text-tm20 text-basic-main w-full'>
                      {t(`career:positions.${position.type}`)}
                    </h3>
                    <p className='text-t16 text-basic-main mt-4 w-full'>
                      {t(`career:${type}.positions.${position.type}`)}
                    </p>
                    {position.hasDetails && (
                      <ul className='mt-4 flex w-full flex-col gap-4'>
                        {t(`career:${type}.details.${position.type}`, { returnObjects: true }).map(
                          (item, i) => (
                            <li
                              key={i}
                              className='flex gap-x-8'
                            >
                              <span>—</span>
                              <span
                                className='text-t16 text-basic-main flex-1'
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            </li>
                          )
                        )}
                      </ul>
                    )}
                    <ul className='mt-12 flex w-full flex-row flex-wrap gap-4'>
                      {position.stack.map((tool) => (
                        <li key={tool}>
                          <Badge
                            size='s'
                            color='secondary'
                            theme='light'
                            className='print:border-secondary-light print:border-1'
                          >
                            {tool}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {dismissal && (
                <div className='flex w-full flex-col'>
                  <span className='text-t12 text-basic-light w-full'>{t('dismissal')}:</span>
                  <span className='text-tm16 text-basic-main w-full'>
                    {t(`career:${type}.dismissal`)}
                  </span>
                </div>
              )}
            </section>
          );
        })}
      </article>
    </Container>
  );
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:career.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages:career.pathname'),
  });
}

export default CareerPage;
