'use client';

import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useMemo } from 'react';

import { AnyObjectType } from '@/types';
import getQuery from '@/utils/get-query';

import Badge from '@/components/Badge';
import Tag from '@/components/Tag';

type Props<T extends AnyObjectType> = {
  compilations: T[];
};

const CompilationList = <T extends AnyObjectType>({ compilations }: Props<T>) => {
  const router = useRouter();
  const params = useSearchParams();
  const activeTag = params?.get('tag');
  const query = params?.get('query');

  const filteredCompilations = useMemo(() => {
    let result = [...compilations];

    if (activeTag) {
      result = result.filter(({ tags }) =>
        tags.some((tag: AnyObjectType) => activeTag === tag.url)
      );
    }

    if (query) {
      result = result.filter(
        ({ title, description, links }) =>
          title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')) ||
          description
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')) ||
          links.some(
            (link: AnyObjectType) =>
              link.title
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, '')) ||
              link.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
          )
      );
    }

    return result.sort((a, b) => +new Date(b.create) - +new Date(a.create));
  }, [compilations, activeTag, query]);

  return (
    <ul className="mt-[40px] flex h-auto w-full flex-col space-y-[40px]">
      {filteredCompilations.map(({ title, description, tags, links }, index) => (
        <li className="flex flex-col w-full h-auto" key={index}>
          <span className="w-full text-h2 text-base-main">{title}</span>
          <span className="mt-[6px] w-full text-t2 text-base-light">{description}</span>
          {tags.length > 0 && (
            <ul className="mt-[12px] flex w-full flex-row flex-wrap">
              {tags.map((tag: AnyObjectType) => (
                <li className="mr-[4px] mt-[4px]" key={tag.url}>
                  <Badge title={tag.title} size="xs" color="secondary" theme="border" />
                </li>
              ))}
            </ul>
          )}
          <div className="mt-[24px] grid gap-x-[8px] gap-y-[16px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            {links
              .sort(
                (a: AnyObjectType, b: AnyObjectType) => +new Date(b.create) - +new Date(a.create)
              )
              .map((link: AnyObjectType) => (
                <NextLink
                  href={link.url}
                  target="_blank"
                  className="group h-auto justify-self-stretch !no-underline transition"
                  key={link.id}
                >
                  <div className="flex h-full w-full flex-col rounded-md border border-secondary-lighter px-[16px] py-[12px] !no-underline transition group-hover:border-primary-main">
                    <span className="w-full text-tm2 text-base-main !no-underline transition group-hover:text-primary-main">
                      {link.title}
                    </span>
                    <span className="mt-[6px] w-full flex-1 text-t4 text-base-light !no-underline transition group-hover:text-base-main">
                      {link.description}
                    </span>
                    {link.tags.length > 0 && (
                      <ul className="mt-[8px] flex w-full flex-row flex-wrap items-end justify-start">
                        {link.tags.map((tag: AnyObjectType) => (
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
                                  getQuery(
                                    'compilations',
                                    query,
                                    activeTag === tag.url ? null : tag.url
                                  )
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
        </li>
      ))}
    </ul>
  );
};

export default CompilationList;
