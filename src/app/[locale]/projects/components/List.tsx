'use client';

import { LinkIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import { ProjectType } from '@/types';
import { Badge } from '@pbcomponents/react';
import { Tag } from '@pbcomponents/react';
import clsx from 'clsx';

const sizes: { [key: number]: string } = {
  2: 'md:col-span-3 lg:col-span-2 xl:col-span-2',
  3: 'desktop:col-span-3',
  4: 'md:col-span-3 lg:col-span-4 xl:col-span-4',
};

const ProjectList = ({ projects }: { projects: ProjectType[] }) => {
  const firstProjects = useMemo(() => {
    const result = [...projects.filter(({ first }) => first)];
    return result.sort((a, b) => a.order - b.order);
  }, [projects]);

  const sortedProjects = useMemo(() => {
    const result = [...projects.filter(({ first }) => !first)];
    return result.sort((a, b) => a.order - b.order);
  }, [projects]);

  return (
    <ul className="grid w-full grid-cols-6 gap-24">
      {firstProjects.map(({ title, description, resourceLinks, tags }, index) => (
        <li
          key={index}
          className="relative flex flex-col col-span-6 px-24 pt-20 pb-24 overflow-hidden transition-colors desktop:px-80 desktop:py-64 group gap-y-24 rounded-16 bg-basic-lightest hover:bg-primary-lighter"
        >
          <div className="flex flex-col flex-1 w-full gap-y-4 desktop:gap-y-8">
            <h2 className="w-full transition-colors text-basic-main group-hover:text-primary-darker text-tm24 desktop:text-h48">
              {title}
            </h2>
            <p className="w-full transition-colors text-t3 text-basic-light group-hover:text-basic-main text-t16 desktop:text-t24">
              {description}
            </p>
          </div>
          <ul className="flex flex-row flex-wrap w-full gap-4">
            {tags.map((tag) => (
              <li key={tag.url}>
                <Badge size="s" color="secondary" theme="border">
                  {tag.title}
                </Badge>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.url}>
                <Tag
                  type="button"
                  size="s"
                  theme="border"
                  rightIcon={LinkIcon}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="!z-20 !relative"
                >
                  {link.title}
                </Tag>
              </li>
            ))}
          </ul>
          <a
            className="absolute inset-0 z-10 w-full h-full m-auto"
            href={resourceLinks[0].url}
            target="_blank"
            rel="noreferrer"
          />
        </li>
      ))}
      {sortedProjects.map(({ size, title, description, accent, resourceLinks, tags }, index) => (
        <li
          key={index}
          className={clsx(
            'col-span-6 group transition-colors flex flex-col gap-y-24 rounded-16 overflow-hidden relative',
            sizes[size],
            accent
              ? 'px-24 pt-20 pb-24 desktop:px-40 desktop:pt-32 desktop:pb-40 bg-basic-lightest hover:bg-primary-lighter'
              : 'px-24 pt-20 pb-24 border-1 border-secondary-lighter hover:border-primary-main'
          )}
        >
          <div
            className={clsx(
              'flex flex-col flex-1 w-full ',
              accent ? 'gap-y-4 desktop:gap-y-8' : 'gap-y-4'
            )}
          >
            <h2
              className={clsx(
                'w-full transition-colors  text-basic-main group-hover:text-primary-darker',
                accent ? 'text-tm24 desktop:text-h32' : 'text-tm24'
              )}
            >
              {title}
            </h2>
            <p
              className={clsx(
                'w-full transition-colors text-t3 text-basic-light group-hover:text-basic-main',
                accent ? 'text-t16 desktop:text-t20' : 'text-t16'
              )}
            >
              {description}
            </p>
          </div>
          <ul className="flex flex-row flex-wrap w-full gap-4">
            {tags.map((tag) => (
              <li key={tag.url}>
                <Badge size="s" color="secondary" theme="border">
                  {tag.title}
                </Badge>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.url}>
                <Tag
                  type="button"
                  size="s"
                  theme="border"
                  rightIcon={LinkIcon}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="!z-20 !relative"
                >
                  {link.title}
                </Tag>
              </li>
            ))}
          </ul>
          <a
            className="absolute inset-0 z-10 w-full h-full m-auto"
            href={resourceLinks[0].url}
            target="_blank"
            rel="noreferrer"
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
