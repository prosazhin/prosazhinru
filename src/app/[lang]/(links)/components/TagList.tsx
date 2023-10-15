'use client';

import { useSearchParams } from 'next/navigation';

import { AnyObjectType, LinksType } from '@/types';
import getQuery from '@/utils/get-query';

import Tag from '@/components/Tag';

type Props<T extends AnyObjectType> = {
  tags: T[];
  type: LinksType;
};

const TagList = <T extends AnyObjectType>({ tags, type }: Props<T>) => {
  const params = useSearchParams();
  const activeTag = params?.get('tag');
  const query = params?.get('query');

  return (
    <ul className="mb-[40px] mt-[4px] flex w-full flex-row flex-wrap">
      {tags.map(({ title, url }, index) => (
        <li className="mr-[8px] mt-[8px]" key={index}>
          <Tag
            tag="a"
            title={title}
            size="s"
            theme="border"
            selected={activeTag === url}
            href={getQuery(type, query, activeTag === url ? null : url)}
            target="_self"
          />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
