import { initTranslations } from '@/i18n';
import getMetadata from '@/utils/get-metadata';
import { Container } from '@pbcomponents/react';
import { Alert, Badge } from '@pbcomponents/react';

import Mixpanel from '@/components/Mixpanel';

import { postsMethods } from '@/lib/api';

const PostsPage = async ({ params: { locale } }) => {
  const posts = await postsMethods.getList(locale);
  const { t } = await initTranslations(locale);

  return (
    <Container size="s">
      {locale === 'en' && <Alert description={t('langAlert')} className="mb-24" color="danger" />}
      <h1 className="sr-only">{t('pages.posts.title')}</h1>
      <ul className="flex flex-col w-full gap-y-24">
        {posts
          .sort((a, b) => new Date(b.create) - new Date(a.create))
          .map(({ url, title, description, tags, createString }, index) => (
            <li className="w-full" key={index}>
              <a
                href={url}
                target="_blank"
                className="group w-full !no-underline transition"
                rel="noreferrer"
              >
                <div className="flex flex-col w-full py-20 transition-colors border-solid gap-y-20 rounded-8 border-1 border-secondary-lighter px-28 group-hover:border-primary-main">
                  <div className="flex flex-col w-full gap-y-6">
                    <h2 className="w-full transition-colors text-tm24 text-basic-main group-hover:text-primary-darker">
                      {title}
                    </h2>
                    <p className="w-full text-t16 text-basic-main">{description}</p>
                  </div>
                  <div className="flex flex-col w-full gap-8 desktop:flex-row">
                    {tags.length > 0 && (
                      <ul className="flex flex-row flex-wrap w-full gap-4">
                        {tags.map((tag) => (
                          <li key={tag.url}>
                            <Badge size="s" color="secondary" theme="light">
                              {tag.title}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="text-t12 text-basic-light whitespace-nowrap">
                      {createString}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
      <Mixpanel event="LOADING_POSTS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { locale } }) {
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages.posts.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: t('pages.posts.pathname'),
  });
}

export default PostsPage;
