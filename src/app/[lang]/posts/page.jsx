import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';

import Badge from '@/components/Badge';
import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';

import { postsMethods } from '@/lib/api';

const PostsPage = async ({ params: { lang } }) => {
  const posts = await postsMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container small>
      <h1 className="w-full text-h1 text-base-main">{t.pages.posts.title}</h1>
      <ul className="mt-[24px] flex w-full flex-col space-y-[16px]">
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
                <div className="flex w-full flex-col rounded-md border border-secondary-lighter px-[24px] py-[20px] transition group-hover:border-primary-main">
                  <span className="w-full transition text-tm1 text-base-main group-hover:text-primary-main">
                    {title}
                  </span>
                  <span className="mt-[8px] w-full text-t3 text-base-main">{description}</span>
                  {tags.length > 0 && (
                    <ul className="mt-[12px] flex w-full flex-row flex-wrap">
                      {tags.map((tag) => (
                        <li className="mr-[4px] mt-[4px]" key={tag.url}>
                          <Badge title={tag.title} size="xs" color="secondary" theme="light" />
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-[8px] w-full text-t4 text-base-light">{createString}</span>
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

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.posts.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.posts.pathname,
  });
}

export default PostsPage;
