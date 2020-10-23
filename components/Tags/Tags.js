import React from 'react'
import style from './Tags.module.scss'

import {
    Tag,
} from '../'



export default function Tags({ tags, page }) {
    return (
        <React.Fragment>
            <ul className={style.tags}>
                {tags.length && tags.map(tag =>
                    <li
                        className={style.tags__item}
                        key={tag.id}
                    >
                        <Tag
                            title={tag.title}
                            url={tag.url}
                            page={page}
                        />
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}