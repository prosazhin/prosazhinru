'use client';

import { useSearchParams } from 'next/navigation';

import { useMemo } from 'react';

import { CompilationType, LinkType, TagType } from '@/types';

import Compilation from './Compilation';
import Link from './Link';

const List = ({ data }: { data: LinkType[] | CompilationType[] }) => {
  const params = useSearchParams();
  const type = params?.get('type');
  const activeTag = params?.get('tag');
  const query = params?.get('query');

  const filteredData = useMemo(() => {
    let result = [...data];

    if (type) {
      result = result.filter(({ type: itemType }) => itemType === type);
    }

    if (activeTag) {
      result = result.filter(({ tags }) => tags.some((tag: TagType) => activeTag === tag.url));
    }

    if (query) {
      result = result.filter(({ title, description }) => {
        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          (description && description.toLowerCase().includes(query.toLowerCase()))
        );
      });
    }

    return result.sort((a, b) => +new Date(b.create) - +new Date(a.create));
  }, [data, activeTag, query, type]);

  return (
    <div className="grid gap-24 mt-24 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-flow-dense">
      {filteredData.map((item, index) => {
        const { type } = item;

        if (type === 'compilation') {
          return (
            <Compilation
              {...item}
              key={index}
              activeTag={activeTag}
              className="col-span-2 xs:col-span-1"
            />
          );
        }

        return <Link {...item} key={index} activeTag={activeTag} />;
      })}
    </div>
  );
};

export default List;
