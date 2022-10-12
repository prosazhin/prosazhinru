import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostInfoBar } from '../';
import style from './Projects.module.scss';

export default function Projects({ array, tag }) {
  const lineTypes = {
    0: ['xs', 'xs', 'xs'],
    1: ['s', 's'],
    2: ['m', 'm'],
    3: ['xs', 'l'],
    4: ['l', 'xs'],
    5: ['xl'],
  };
  const orderLines = tag === 'dev' ? [0] : [1, 3, 1, 4];
  const filteredArray = array.filter((item) => item.show).sort((a, b) => new Date(b.create) - new Date(a.create));
  const sortedArray = [];

  orderLines.forEach((line) => {
    lineTypes[line].forEach((type) => {
      const result = filteredArray.find((item) => {
        if (sortedArray.some((i) => i.id === item.id)) return false;
        if (item.cover !== null && (type === 'm' || type === 'l' || type === 'xl')) return true;
        if (item.cover === null && (type === 'xs' || type === 's')) return true;
      });
      if (result === undefined) return;
      sortedArray.push({
        ...result,
        className: `${style.project} ${style[`project__${type}`]}`,
      });
    });
  });

  return (
    <ul className={style.projects}>
      {sortedArray.map((project) => (
        <li key={project.id} className={project.className}>
          <Link href={`/project/${project.slug}`}>
            <a className={style.project__link}>
              <span className={style.project__headline}>{project.title}</span>
              {project.description && <span className={style.project__description}>{project.description}</span>}
              {project.cover && (
                <div className={style.project__cover_wrapper}>
                  <Image src={`https:` + project.cover.url} alt={project.title} layout="responsive" width={project.cover.width} height={project.cover.height} priority="true" unoptimized="true" />
                </div>
              )}
              <PostInfoBar data={project} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
