import NextLink from 'next/link';

import { ArrowRightIcon } from '@heroicons/react/24/solid';

import skills from '@/data/skills';
import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Badge from '@/components/Badge';
import Contacts from '@/components/Contacts';
import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';
import Tabs from '@/components/Tabs';

const IndexPage = async ({ params: { lang } }) => {
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
        selected={lang === 'ru' ? '/' : `/${lang}`}
        className="mt-[80px]"
      />
      <ul className="mt-[40px] flex flex-col space-y-[40px]">
        {skills.map(({ type, title, description, tools, matrix }, index) => (
          <li className="flex flex-col w-full" key={index}>
            {title && <h2 className="w-full text-tm1 text-base-main">{t.skills[type].title}</h2>}
            {description && (
              <p className="mt-[4px] w-full text-t2 text-base-main">{t.skills[type].description}</p>
            )}
            {Boolean(tools.length) && (
              <ul className="mt-[12px] flex w-full flex-row flex-wrap">
                {tools.map((tool) => (
                  <li className="mr-[4px] mt-[4px]" key={tool}>
                    <Badge title={tool} size="xs" color="secondary" theme="light" />
                  </li>
                ))}
              </ul>
            )}
            {matrix && (
              <NextLink
                href={lang === 'ru' ? `${matrix.url}` : `/${lang}${matrix.url}`}
                target="_self"
                className="group mt-[24px] bg-white text-tm2 text-base-main !no-underline transition"
              >
                <div className="flex w-full flex-row items-center rounded-md border border-secondary-lighter px-[24px] py-[16px] transition group-hover:border-primary-main">
                  <span className="flex-1 group-hover:text-primary-main">
                    {t.skills[type].matrix}
                  </span>
                  <ArrowRightIcon className="h-[24px] w-[24px] group-hover:text-primary-main" />
                </div>
              </NextLink>
            )}
          </li>
        ))}
      </ul>
      <Mixpanel event="LOADING_MAIN_PAGE" />
    </Container>
  );
};

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: t.metaTitle,
    description: t.metaDescription,
    pathname: t.pages.index.pathname,
  });
}

export default IndexPage;
