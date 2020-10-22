import React from 'react'
import style from './Tags.module.scss'

import {
    Tag,
} from '../'



export default function Tags(props) {
    return (
        <React.Fragment>
            <ul className={style.tags}>
                {props.tags.length && props.tags.map(tag =>
                    <li
                        className={style.tags__item}
                        key={tag.sys.id}
                    >
                        <Tag
                            title={tag.fields.title}
                            url={tag.fields.url}
                            page={props.page}
                        />
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}