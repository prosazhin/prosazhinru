'use client';

import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useMemo } from 'react';

import { AnyObjectType } from '@/types';
import getQuery from '@/utils/get-query';

import Tag from '@/components/Tag';

type Props<T extends AnyObjectType> = {
  links: T[];
};

const LinkList = <T extends AnyObjectType>({ links }: Props<T>) => {
  const router = useRouter();
  const params = useSearchParams();
  const activeTag = params?.get('tag');
  const query = params?.get('query');

  const filteredLinks = useMemo(() => {
    let result = [...links];

    if (activeTag) {
      result = result.filter(({ tags }) =>
        tags.some((tag: AnyObjectType) => activeTag === tag.url)
      );
    }

    if (query) {
      result = result.filter(
        ({ title, description }) =>
          title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')) ||
          description
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
      );
    }

    return result.sort((a, b) => +new Date(b.create) - +new Date(a.create));
  }, [links, activeTag, query]);

  return (
    <div className="mt-[24px] grid gap-x-[8px] gap-y-[16px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      {filteredLinks.map(({ url, title, description, tags }, index) => (
        <NextLink
          href={url}
          target="_blank"
          className="group h-auto justify-self-stretch !no-underline transition"
          key={index}
        >
          <div className="flex h-full w-full flex-col rounded-md border border-secondary-lighter px-[16px] py-[12px] !no-underline transition group-hover:border-primary-main">
            <span className="w-full text-tm2 text-base-main !no-underline transition group-hover:text-primary-main">
              {title}
            </span>
            <span className="mt-[6px] w-full flex-1 text-t4 text-base-light !no-underline transition group-hover:text-base-main">
              {description}
            </span>
            {tags.length > 0 && (
              <ul className="mt-[8px] flex w-full flex-row flex-wrap items-end justify-start">
                {tags.map((tag: AnyObjectType) => (
                  <li className="mr-[4px] mt-[4px]" key={tag.url}>
                    <Tag
                      tag="button"
                      type="button"
                      title={tag.title}
                      size="xs"
                      theme="border"
                      selected={activeTag === tag.url}
                      onClick={(event) => {
                        event.preventDefault();
                        router.push(
                          getQuery('links', query, activeTag === tag.url ? null : tag.url)
                        );
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </NextLink>
      ))}
    </div>
  );
};

export default LinkList;
