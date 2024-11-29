'use client';

import NextLink from 'next/link';

import { LinkType, TagType } from '@/types';
import { Badge } from '@pbcomponents/react';
import clsx from 'clsx';

const Link = (props: LinkType) => {
  const { url = '', title, description, tags, activeTag, className } = props;

  return (
    <NextLink
      href={url}
      target="_blank"
      className={clsx(
        'group h-auto desktop:min-h-200 justify-self-stretch !no-underline transition-colors flex flex-col rounded-8 border-1 border-secondary-lighter px-16 py-12 hover:border-primary-main',
        className
      )}
    >
      <span className="w-full text-tm20 text-basic-main !no-underline transition-colors group-hover:text-primary-darker">
        {title}
      </span>
      <span className="mt-6 w-full flex-1 text-t14 text-basic-light !no-underline transition-colors group-hover:text-basic-main">
        {description}
      </span>
      {tags.length > 0 && (
        <ul className="flex flex-row flex-wrap items-end justify-start w-full gap-4 mt-16">
          {tags.map((tag: TagType, index: number) => (
            <li key={index}>
              <Badge size="s" color={activeTag === tag.url ? 'primary' : 'secondary'} theme="light">
                {tag.title}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </NextLink>
  );
};

export default Link;
