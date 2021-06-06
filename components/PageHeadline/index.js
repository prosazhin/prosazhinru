
import React from 'react'
import showdown from 'showdown'
import style from './PageHeadline.module.scss'



export default function PageHeadline({ title, description }) {

    const converter = new showdown.Converter({ openLinksInNewWindow: true })
    const html = converter.makeHtml(description)

    return (
        <div className={style.headline}>
            {title &&
                <h1 className={style.title}>
                    {title}
                </h1>
            }
            {description &&
                <div
                    className={style.description}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            }
        </div>
    )
}
