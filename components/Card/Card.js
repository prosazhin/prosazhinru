import React from 'react'
import style from './Card.module.scss'

import {
    Tag,
} from '../'



export default function Card({ item, tags, tagLinkTo }) {
    return (
        <a
            href={item.url}
            // eslint-disable-next-line
            target="_blank"
            className={style.card}
        >
            <span className={style.card__headline}>
                {item.title}
            </span>

            {item.description &&
                <span className={style.card__description}>
                    {item.description}
                </span>
            }

            {tags &&
                <ul className={style.card__tags}>
                    {item.tags.map(tag =>
                        <li
                            className={style.card__tags__item}
                            key={tag.id}
                        >
                            <Tag
                                title={tag.title}
                                url={tag.url}
                                page={tagLinkTo}
                            />
                        </li>
                    )}
                </ul>
            }
        </a>
    )
}