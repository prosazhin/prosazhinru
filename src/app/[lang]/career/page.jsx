import career from '@/data/career';
import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Badge from '@/components/Badge';
import Contacts from '@/components/Contacts';
import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';
import Tabs from '@/components/Tabs';

import { getDiffJobDate, getFormatJobDate, ucFirst } from '@/lib/utils';

const CareerPage = async ({ params: { lang } }) => {
  const t = await getDictionary(lang);

  return (
    <Container small>
      <h1 className="text-t1 text-base-main">{t.pages.index.title}</h1>
      <p
        className="mt-[16px] text-t1 text-base-main"
        dangerouslySetInnerHTML={{ __html: t.pages.index.description }}
      />
      <Contacts />
      <Tabs
        data={t.tabs.about}
        keyName="url"
        display="title"
        selected={lang === 'ru' ? '/career' : `/${lang}/career`}
        className="mt-[80px]"
      />
      <article className="mt-[40px] flex w-full flex-col space-y-[40px]">
        {career.map(
          (
            { type, url, title, position, description, devStack, designStack, dateFrom, dateTo },
            index
          ) => {
            const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, lang));
            const formatDateTo = dateTo === 'now' ? t.now : ucFirst(getFormatJobDate(dateTo, lang));
            const diffDate = getDiffJobDate(dateFrom, dateTo === 'now' ? new Date() : dateTo, lang);

            return (
              <section className="flex flex-col w-full" key={index}>
                {title && (
                  <h3 className="w-full text-h2 text-base-main">
                    {url.length ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="!no-underline transition"
                      >
                        {t.career[type].title}
                      </a>
                    ) : (
                      <>{t.career[type].title}</>
                    )}
                  </h3>
                )}
                <span className="mt-[8px] w-full text-t3 text-base-light">
                  {`${formatDateFrom} – ${formatDateTo}, ${diffDate}`}
                </span>
                {position && (
                  <span className="mt-[16px] w-full text-tm2 text-base-main">
                    {t.career[type].position}
                  </span>
                )}
                {description && (
                  <span className="mb-[12px] mt-[4px] w-full text-t3 text-base-main">
                    {t.career[type].description}
                  </span>
                )}
                {devStack.length > 0 && (
                  <ul className="flex flex-row flex-wrap w-full">
                    {devStack.map((tool) => (
                      <li className="mr-[4px] mt-[4px]" key={tool}>
                        <Badge title={tool} size="xs" color="secondary" theme="light" />
                      </li>
                    ))}
                  </ul>
                )}
                {designStack.length > 0 && (
                  <ul className="flex flex-row flex-wrap w-full">
                    {designStack.map((tool) => (
                      <li className="mr-[4px] mt-[4px]" key={tool}>
                        <Badge title={tool} size="xs" color="secondary" theme="light" />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          }
        )}
      </article>
      <Mixpanel event="LOADING_JOBS_PAGE" />
    </Container>
  );
};

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.career.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.career.pathname,
  });
}

export default CareerPage;
