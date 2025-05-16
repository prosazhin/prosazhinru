'use client';

import { TagType } from '@/types';
import getQuery from '@/utils/get-query';
import { Tag } from '@pbcomponents/react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const linkType = ['link', 'compilation'];

const TagList = ({ tags }: { tags: TagType[] }) => {
  const params = useSearchParams();
  const type = params?.get('type');
  const activeTag = params?.get('tag');
  const query = params?.get('query');
  const { t } = useTranslation();

  return (
    <ul className='mt-12 mb-24 flex w-full flex-row flex-wrap gap-8'>
      {linkType.map((item, index) => (
        <li key={index}>
          <Tag
            size='m'
            theme='border'
            checked={type === item}
            href={getQuery(type === item ? null : item, query, activeTag)}
            target='_self'
          >
            {t(`linkType.${item}`)}
          </Tag>
        </li>
      ))}
      {tags.map(({ title, url }, index) => (
        <li key={index}>
          <Tag
            size='m'
            theme='border'
            checked={activeTag === url}
            href={getQuery(type, query, activeTag === url ? null : url)}
            target='_self'
          >
            {title}
          </Tag>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
