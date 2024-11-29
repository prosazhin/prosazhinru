'use client';

import { LinkIcon } from '@heroicons/react/24/outline';

import contacts from '@/data/contacts';
import { Badge, Tag } from '@pbcomponents/react';

const Contacts = () => {
  return (
    <ul className="flex flex-row flex-wrap w-full gap-8 mt-24">
      {contacts.map(({ url, link, title }, index) => (
        <li key={index}>
          {link ? (
            <Tag
              size="m"
              theme="border"
              href={url}
              target="_blank"
              rel="noreferrer"
              rightIcon={LinkIcon}
            >
              {title}
            </Tag>
          ) : (
            <Badge size="m" color="secondary" theme="border">
              {title}
            </Badge>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
