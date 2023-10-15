import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Badge from '@/components/Badge';
import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';

import { competenciesMethods } from '@/lib/api';

import Spoiler from './components/Spoiler';

const CompetenciesPage = async ({ params: { lang } }) => {
  const competenciesCategories = await competenciesMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container small>
      <h1 className="w-full text-h1 text-base-main">{t.pages.competencies.title}</h1>
      <p
        className="mt-[16px] w-full text-t1 text-base-main"
        dangerouslySetInnerHTML={{ __html: t.pages.competencies.description }}
      />
      <Spoiler t={t} />
      <ul className="mt-[40px] flex w-full flex-col space-y-[40px]">
        {competenciesCategories
          .sort((a, b) => a.order - b.order)
          .map(({ title, rating, competencies }, index) => (
            <li className="flex flex-col w-full" key={index}>
              <span className="mb-[8px] flex w-full flex-row items-center space-x-[16px] px-[16px]">
                <span className="flex-1 text-tm2 text-base-main">{title}</span>
                <Badge title={rating} size="xs" color="secondary" theme="border" />
              </span>
              <ul className="flex flex-col w-full border divide-y rounded-md divide-secondary-lighter border-secondary-lighter">
                {competencies
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <li
                      className="flex w-full flex-row items-center space-x-[16px] px-[16px] py-[12px]"
                      key={item.id}
                    >
                      <span className="flex-1 text-t3 text-base-main">{item.title}</span>
                      <Badge title={item.rating} size="xs" color="secondary" theme="light" />
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
      <Mixpanel event="LOADING_COMPETENCIES_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.competencies.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.competencies.pathname,
  });
}

export default CompetenciesPage;
