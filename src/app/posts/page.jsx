import posts from '@/data/posts';
import { initTranslations } from '@/i18n';
import { getFormatDate } from '@/utils/formatter';
import { getLocale } from '@/utils/get-locale';
import getMetadata from '@/utils/get-metadata';
import { Alert, Badge, Container } from '@pbcomponents/react';

const PostsPage = async () => {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return (
    <Container size='s'>
      {locale === 'en' && (
        <Alert
          description={t('langAlert')}
          className='mb-24'
          color='danger'
        />
      )}
      <h1 className='sr-only'>{t('pages:posts.title')}</h1>
      <ul className='flex w-full flex-col gap-y-24'>
        {posts
          .sort((a, b) => new Date(b.create) - new Date(a.create))
          .map(({ url, title, description, tags, create }) => (
            <li
              className='w-full'
              key={title}
            >
              <a
                href={url}
                target='_blank'
                className='group w-full no-underline! transition'
                rel='noreferrer'
              >
                <div className='rounded-8 border-secondary-lighter group-hover:border-primary-main flex w-full flex-col gap-y-20 border-1 border-solid px-28 py-20 transition-colors duration-150'>
                  <div className='flex w-full flex-col gap-y-6'>
                    <h2 className='text-tm24 text-basic-main group-hover:text-primary-darker w-full transition-colors duration-150'>
                      {title}
                    </h2>
                    <p className='text-t16 text-basic-main w-full'>{description}</p>
                  </div>
                  <div className='desktop:flex-row flex w-full flex-col items-center gap-8'>
                    {tags?.length > 0 && (
                      <ul className='flex w-full flex-row flex-wrap gap-4'>
                        {tags.map((tag) => (
                          <li key={tag}>
                            <Badge
                              size='s'
                              color='secondary'
                              theme='light'
                            >
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className='text-t12 text-basic-light whitespace-nowrap'>
                      {getFormatDate(create, locale)}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export async function generateMetadata() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  return getMetadata({
    locale,
    title: `${t('pages:posts.title')} | ${t('metaTitle')}`,
    description: t('metaDescription'),
    pathname: '/posts',
  });
}

export default PostsPage;
