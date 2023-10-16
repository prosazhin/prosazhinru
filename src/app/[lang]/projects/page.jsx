import Image from 'next/image';

import { getDictionary } from '@/utils/get-dictionaries';
import getMetadata from '@/utils/get-metadata';
import clsx from 'clsx';

import Badge from '@/components/Badge';
import Container from '@/components/Container';
import Mixpanel from '@/components/Mixpanel';

import { projectsMethods } from '@/lib/api';

import ProjectTag from './components/ProjectTag';

const sizes = {
  2: {
    class: 'desktop:col-span-2',
    img: { w: 368, h: 236 },
  },
  3: {
    class: 'desktop:col-span-3',
    img: { w: 564, h: 362 },
  },
  4: {
    class: 'desktop:col-span-4',
    img: { w: 760, h: 488 },
  },
  6: {
    class: 'desktop:col-span-6',
    img: { w: 1152, h: 740 },
  },
};

const ProjectsPage = async ({ params: { lang } }) => {
  const projects = await projectsMethods.getList(lang);
  const t = await getDictionary(lang);

  return (
    <Container>
      <h1 className="mb-[24px] w-full text-h1 text-base-main">{t.pages.projects.title}</h1>
      <ul className="grid w-full grid-cols-6 gap-x-[24px] gap-y-[40px]">
        {projects
          .sort((a, b) => a.order - b.order)
          .map(
            (
              { size, url, cover, title, slug, description, resourceLinks, tags, createString },
              index
            ) => (
              <li key={index} className={clsx('sm:col-span-6', sizes[size].class)}>
                <a
                  className="group !no-underline transition"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={clsx(
                      'flex w-full flex-col items-start justify-start transition',
                      !cover
                        ? 'rounded-md border border-secondary-lighter px-[24px] py-[20px] group-hover:border-primary-main'
                        : ''
                    )}
                  >
                    {cover && (
                      <Image
                        className="block w-full transition-colors rounded-md bg-base-lighter group-hover:bg-base-lightest"
                        width={sizes[size].img.w}
                        height={sizes[size].img.h}
                        src={`/cover/${slug}/${lang}.png`}
                        alt={title}
                        loading="lazy"
                      />
                    )}
                    {!cover && (
                      <span className="w-full transition text-h4 text-base-main group-hover:text-primary-main">
                        {title}
                      </span>
                    )}
                    {description && !cover && (
                      <span className="mt-[4px] w-full text-t3 text-base-light transition group-hover:text-base-main">
                        {description}
                      </span>
                    )}
                    <ul className="mt-[16px] flex w-full flex-row flex-wrap">
                      {resourceLinks.map((link) => (
                        <li className="mr-[4px] mt-[4px]" key={link.url}>
                          <ProjectTag title={link.title} url={link.url} />
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-[4px] flex w-full flex-row flex-wrap">
                      <li className="mr-[4px] mt-[4px]">
                        <Badge title={createString} size="xs" color="secondary" theme="light" />
                      </li>
                      {tags.length > 0 &&
                        tags.map((tag) => (
                          <li className="mr-[4px] mt-[4px]" key={tag.url}>
                            <Badge title={tag.title} size="xs" color="secondary" theme="border" />
                          </li>
                        ))}
                    </ul>
                  </div>
                </a>
              </li>
            )
          )}
      </ul>
      <Mixpanel event="LOADING_PROJECTS_PAGE" />
    </Container>
  );
};

export const revalidate = 600;

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang);

  return getMetadata({
    lang,
    title: `${t.pages.projects.title} | ${t.metaTitle}`,
    description: t.metaDescription,
    pathname: t.pages.projects.pathname,
  });
}

export default ProjectsPage;
