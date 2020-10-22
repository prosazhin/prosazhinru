import React from 'react'
import style from './Link.module.scss'

import {
    Tag,
} from '../'



export default function Link({ link, tags }) {
    return (
        <React.Fragment>
            <a
                href={link.fields.url}
                // eslint-disable-next-line
                target="_blank"
                className={style.link}
            >
                <span className={style.link__headline}>
                    {link.fields.title}
                </span>

                {link.fields.description &&
                    <span className={style.link__description}>
                        {link.fields.description}
                    </span>
                }

                {link.fields.tags.length && tags &&
                    <ul className={style.link__tags}>
                        {link.fields.tags.map(tag =>
                            <li
                                className={style.link__tags__item}
                                key={tag.sys.id}
                            >
                                <Tag
                                    title={tag.fields.title}
                                    url={tag.fields.url}
                                    page="links"
                                />
                            </li>
                        )}
                    </ul>
                }
            </a>
        </React.Fragment>
    )
}