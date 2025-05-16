'use client';

import contacts from '@/data/contacts';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Badge, Tag } from '@pbcomponents/react';

const Contacts = () => {
  return (
    <ul className='mt-24 flex w-full flex-row flex-wrap gap-8'>
      {contacts.map(({ url, link, title }, index) => (
        <li key={index}>
          {link ? (
            <Tag
              size='m'
              theme='border'
              href={url}
              target='_blank'
              rel='noreferrer'
              rightIcon={LinkIcon}
            >
              {title}
            </Tag>
          ) : (
            <Badge
              size='m'
              color='secondary'
              theme='border'
            >
              {title}
            </Badge>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
