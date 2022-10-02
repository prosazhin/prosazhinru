import React from 'react';
import Link from 'next/link';
import { StaticTagsList, SocialLinks } from '../';
import style from './Posts.module.scss';

export default function Posts({ array }) {
  return (
    <ul className={style.posts}>
      {array
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((post) => (
          <li className={style.post} key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <a className={style.post__link}>
                <span className={style.post__headline}>{post.title}</span>
                <span className={style.post__description}>{post.description}</span>
                <div className={style.post__wrapper}>
                  <StaticTagsList array={post.tags} />
                  <span className={style.post__date}>{post.createString}</span>
                  <SocialLinks
                    data={[post.dzenUrl ? { title: 'Дзен', url: post.dzenUrl } : null, post.mediumUrl ? { title: 'Medium', url: post.mediumUrl } : null]}
                    small={true}
                    customClass={style.post__social_link}
                  />
                </div>
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
}
