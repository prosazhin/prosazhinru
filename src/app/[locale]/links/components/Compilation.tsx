'use client';

import { useTranslation } from 'react-i18next';

import { CompilationType, TagType } from '@/types';
import { Badge, useDialog } from '@pbcomponents/react';
import clsx from 'clsx';

import Link from './Link';

const Compilation = (props: CompilationType) => {
  const { title, description, tags, activeTag, links, className } = props;
  const { showDialog } = useDialog();
  const { t } = useTranslation();

  const DialogChildren = () => (
    <div className="flex flex-col w-full">
      <h3 className="text-h32 text-basic-main">{title}</h3>
      <p className="mt-8 text-basic-light text-t20">{description}</p>
      {links?.length && (
        <div className="grid grid-cols-2 gap-24 mt-24 xs:grid-cols-1">
          {links.map((item, index) => (
            <Link {...item} key={index} activeTag={activeTag} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={clsx(
        'flex flex-col h-auto desktop:min-h-200 px-24 py-16 cursor-pointer transition-colors group justify-self-stretch rounded-8 border-1 border-secondary-lighter hover:border-primary-main',
        className
      )}
      onClick={() => showDialog({ children: <DialogChildren /> })}
    >
      <span className="w-full transition-colors text-tm24 text-basic-main group-hover:text-primary-darker">
        {title}
      </span>
      <span className="flex-1 w-full mt-6 transition-colors text-t16 text-basic-light group-hover:text-basic-main">
        {description}
      </span>
      <ul className="flex flex-row flex-wrap items-end justify-start w-full gap-4 mt-16">
        <Badge size="s" color="primary" theme="filled">
          {t('compilation')}
        </Badge>
        {links && (
          <Badge size="s" color="secondary" theme="light">
            {t('plurals.links.links', { count: links?.length })}
          </Badge>
        )}
        {tags.map((tag: TagType, index: number) => (
          <li key={index}>
            <Badge size="s" color={activeTag === tag.url ? 'primary' : 'secondary'} theme="light">
              {tag.title}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Compilation;
