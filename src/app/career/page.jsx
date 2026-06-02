import Contacts from '@/components/Contacts';
import PageWithLeftAside from '@/components/PageWithLeftAside';
import LeftAside from '@/components/aside';
import { initTranslations } from '@/i18n';
import { getDiffJobDate, getFormatJobDate, ucFirst } from '@/utils/formatter';
import { getLocale } from '@/utils/get-locale';
import getMetadata from '@/utils/get-metadata';
import { Badge, Tab, Tabs } from '@prosazhin/pbcomponents';
import clsx from 'clsx';

const CareerPage = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);
  const [{ default: careerByType }, { default: contacts }] = await Promise.all([
    import('@/data/career'),
    import('@/data/contacts'),
  ]);
  const wrapperId = 'careerList';

  return (
    <PageWithLeftAside
      aside={
        <LeftAside
          wrapperId={wrapperId}
          data={t('career:entries', { returnObjects: true }).map(({ type, titleForAside }) => ({
            type,
            title: titleForAside,
          }))}
        />
      }
      size='s'
    >
      <h1 className='text-t24 text-basic-main'>{t('pages:index.title')}</h1>
      <p
        className='text-t24 text-basic-main link mt-16'
        dangerouslySetInnerHTML={{ __html: t('pages:index.description') }}
      />
      <Contacts contacts={contacts} />
      <Tabs
        defaultIndex={1}
        className='mt-80 print:hidden'
      >
        {t('tabs.about', { returnObjects: true }).map(({ title, url }) => (
          <Tab
            key={url}
            label={title}
            href={url}
          />
        ))}
      </Tabs>
      <span
        className={clsx(
          'text-h64 hidden print:mt-420 print:block! print:pt-20',
          locale === 'en' && 'print:pt-50'
        )}
      >
        {t('tabs.about', { returnObjects: true })[1].title}
      </span>
      <article
        className='mt-40 flex w-full flex-col gap-y-16'
        id={wrapperId}
      >
        {t('career:entries', { returnObjects: true }).map((entry) => {
          const extra = careerByType[entry.type];
          if (!extra) return null;
          const { url, positions, dateFrom, dateTo } = extra;
          const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, locale));
          const formatDateTo =
            dateTo === 'now' ? t('now') : ucFirst(getFormatJobDate(dateTo, locale));
          const diffDate = getDiffJobDate(dateFrom, dateTo === 'now' ? new Date() : dateTo, locale);
          const hasDismissal = entry.dismissal && String(entry.dismissal).trim().length > 0;

          return (
            <section
              className='border-secondary-lighter rounded-16 flex w-full scroll-mt-96 flex-col gap-y-16 border px-32 py-24'
              key={entry.type}
              id={entry.type}
            >
              <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-h32 text-basic-main link w-full'>
                  {url ? (
                    <a
                      href={url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <>{entry.title}</>
                  )}
                </h2>
                <span className='text-t16 text-basic-light w-full'>
                  {`${formatDateFrom} – ${formatDateTo}, ${diffDate}`}
                </span>
              </div>
              <ul className='flex w-full flex-col gap-y-16'>
                {positions.map((position) => {
                  const detailsList = entry.details?.[position.type];
                  const hasDetails = Array.isArray(detailsList) && detailsList.length > 0;
                  return (
                    <li
                      className='mt-4 mr-4'
                      key={position.type}
                    >
                      <h3 className='text-tm20 text-basic-main w-full'>
                        {t(`career:positions.${position.type}`)}
                      </h3>
                      <p className='text-t16 text-basic-main mt-4 w-full'>
                        {entry.positions?.[position.type] ?? ''}
                      </p>
                      {hasDetails && (
                        <ul className='mt-4 flex w-full flex-col gap-4'>
                          {detailsList.map((item, i) => (
                            <li
                              key={`${position.type}-${i}`}
                              className='flex gap-x-8'
                            >
                              <span>—</span>
                              <span
                                className='text-t16 text-basic-main flex-1'
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      <ul className='mt-12 flex w-full flex-row flex-wrap gap-4'>
                        {position.stack.map((tool) => (
                          <li key={tool}>
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
                    </li>
                  );
                })}
              </ul>
              {hasDismissal && (
                <div className='flex w-full flex-col'>
                  <span className='text-t12 text-basic-light w-full'>{t('dismissal')}:</span>
                  <span className='text-tm16 text-basic-main w-full'>{entry.dismissal}</span>
                </div>
              )}
            </section>
          );
        })}
      </article>
    </PageWithLeftAside>
  );
};

export async function generateMetadata() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:career.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: '/career',
  });
}

export default CareerPage;
