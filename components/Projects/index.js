import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticActiveTagsList, SocialLinks } from '../';
import style from './Projects.module.scss';

export default function Projects({ array }) {
  return (
    <ul className={style.projects}>
      {array
        .filter((item) => item.show)
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((project) => (
          <li className={style.project} key={project.id}>
            <Link href={`/project/${project.slug}`}>
              <a className={style.project__link}>
                <span className={style.project__headline}>{project.title}</span>
                {project.description && <span className={style.project__description}>{project.description}</span>}
                {project.cover && (
                  <div className={style.project__cover_wrapper}>
                    <Image src={`https:` + project.cover.url} alt={project.title} layout="responsive" width={project.cover.width} height={project.cover.height} priority="true" unoptimized="true" />
                  </div>
                )}
                <div className={style.project__wrapper}>
                  <StaticActiveTagsList array={project.tags} customClass={style.project__tags} />
                  <SocialLinks
                    data={[
                      project.gitUrl ? { title: 'GitHub', url: project.gitUrl } : null,
                      project.figmaUrl ? { title: 'Figma', url: project.figmaUrl } : null,
                      project.behanceUrl ? { title: 'Behance', url: project.behanceUrl } : null,
                      project.projectUrl ? { title: project.projectUrl, url: project.projectUrl } : null,
                    ]}
                    small={true}
                    customClass={style.project__social_link}
                  />
                  <span className={style.project__date}>{project.createString}</span>
                </div>
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
}
