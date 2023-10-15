'use client';

import Image from 'next/image';

import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

import { AnyObjectType } from '@/types';
import clsx from 'clsx';

import Badge from '@/components/Badge';
import Tag from '@/components/Tag';

const sizes: AnyObjectType = {
  2: {
    class: 'desktop:col-span-2',
    img: {
      w: 368,
      h: 236,
    },
  },
  3: {
    class: 'desktop:col-span-3',
    img: {
      w: 564,
      h: 362,
    },
  },
  4: {
    class: 'desktop:col-span-4',
    img: {
      w: 760,
      h: 488,
    },
  },
  6: {
    class: 'desktop:col-span-6',
    img: {
      w: 1152,
      h: 740,
    },
  },
};

type Props<T extends AnyObjectType> = {
  projects: T[];
};

const ProjectList = <T extends AnyObjectType>({ projects }: Props<T>) => {
  return (
    <ul className="grid w-full grid-cols-6 gap-x-[24px] gap-y-[40px]">
      {projects
        .sort((a, b) => a.order - b.order)
        .map(
          ({ size, url, cover, title, description, resourceLinks, tags, createString }, index) => (
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
                      className="block w-full rounded-md"
                      width={sizes[size].img.w}
                      height={sizes[size].img.h}
                      src={cover}
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
                    {resourceLinks.map((link: AnyObjectType) => (
                      <li className="mr-[4px] mt-[4px]" key={link.url}>
                        <Tag
                          tag="button"
                          type="button"
                          title={link.title}
                          size="xs"
                          theme="border"
                          place="right"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <ArrowLongRightIcon className="h-[16px] w-[16px]" />
                        </Tag>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-[4px] flex w-full flex-row flex-wrap">
                    <li className="mr-[4px] mt-[4px]">
                      <Badge title={createString} size="xs" color="secondary" theme="light" />
                    </li>
                    {tags.length > 0 &&
                      tags.map((tag: AnyObjectType) => (
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
  );
};

export default ProjectList;
