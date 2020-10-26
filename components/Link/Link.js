import React from 'react'
import style from './Link.module.scss'

import {
    Tag,
} from '../'



export default function Link({ link, tags }) {
    return (
        <a
            href={link.url}
            // eslint-disable-next-line
            target="_blank"
            className={style.link}
        >
            <span className={style.link__headline}>
                {link.title}
            </span>

            {link.description &&
                <span className={style.link__description}>
                    {link.description}
                </span>
            }

            {link.tags.length && tags &&
                <ul className={style.link__tags}>
                    {link.tags.map(tag =>
                        <li
                            className={style.link__tags__item}
                            key={tag.id}
                        >
                            <Tag
                                title={tag.title}
                                url={tag.url}
                                page="links"
                            />
                        </li>
                    )}
                </ul>
            }
        </a>
    )
}