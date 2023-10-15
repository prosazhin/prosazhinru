import { ArrowRightIcon } from '@heroicons/react/24/solid';

import contacts from '@/data/contacts';

import Badge from '@/components/Badge';
import Tag from '@/components/Tag';

const Contacts = () => {
  return (
    <ul className="mt-[24px] flex w-full flex-row flex-wrap">
      {contacts.map(({ url, link, title }, index) => (
        <li className="mr-[8px] mt-[8px]" key={index}>
          {link ? (
            <Tag
              tag="a"
              title={title}
              size="s"
              theme="border"
              place="right"
              href={url}
              target="_blank"
            >
              <ArrowRightIcon className="h-[16px] w-[16px]" />
            </Tag>
          ) : (
            <Badge title={title} size="s" color="secondary" theme="border" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
