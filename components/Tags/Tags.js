import React from 'react'
import style from './Tags.module.scss'

import {
    Tag,
} from '../'



export default function Tags({ array, tagLinkTo }) {
    return (
        <ul className={style.tags}>
            {array.map(item =>
                <li
                    className={style.tags__item}
                    key={item.id}
                >
                    <Tag
                        title={item.title}
                        url={item.url}
                        tagLinkTo={tagLinkTo}
                    />
                </li>
            )}
        </ul>
    )
}