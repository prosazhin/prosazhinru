import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticTagsList } from '../';
import style from './Projects.module.scss';

export default function Projects({ array }) {
  return (
    <ul className={style.projects}>
      {array
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((project) => (
          <li className={style.project} key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <a className={style.project__link}>
                <span className={style.project__headline}>{project.title}</span>
                <Image className={style.project__cover} src={`https:` + project.cover.url} alt={project.title} layout="responsive" width={project.cover.width} height={project.cover.height} priority="true" unoptimized="true" />
                <div className={style.project__tags}>
                  <StaticTagsList array={project.tags} />
                </div>
                <span className={style.project__date}>{project.createString}</span>
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
}
