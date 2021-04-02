
import React from 'react'
import Link from 'next/link'
import { StaticTag } from '../'
import dayjs from 'dayjs'
import style from './Posts.module.scss'
import 'dayjs/locale/ru'



export default function Posts({ array }) {
    return (
        <ul className={style.posts}>
            {array.sort(( a, b ) => new Date(b.create) - new Date(a.create)).map(post =>
                <li className={style.post} key={post.id}>
                    <Link href={`/posts/${post.slug}`}>
                        <a className={style.post__link}>
                            <span className={style.post__headline}>
                                {post.title}
                            </span>
                            <span className={style.post__description}>
                                {post.description}
                            </span>
                            <ul className={style.post__tags}>
                                {post.tags.map(tag =>
                                    <li
                                        className={style.post__tags__item}
                                        key={tag}
                                    >
                                        <StaticTag
                                            title={tag}
                                            url={false}
                                            notActive
                                        />
                                    </li>
                                )}
                            </ul>
                            <span className={style.post__date}>
                                {dayjs(post.create).locale('ru').format('DD MMMM YYYY')}
                            </span>
                        </a>
                    </Link>
                </li>
            )}
        </ul>
    )
}