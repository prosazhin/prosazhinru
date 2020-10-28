import React from 'react'
import style from './Card.module.scss'

import {
    Tag,
    Tags,
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
            {(tags && item.tags.length) &&
                <div className={style.card__tags}>
                    <Tags
                        array={item.tags}
                        tagLinkTo={tagLinkTo}
                    />
                </div>
            }
            {item.description &&
                <span className={style.card__description}>
                    {item.description}
                </span>
            }
        </a>
    )
}