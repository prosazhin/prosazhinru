
import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './PageHeadline.module.scss'



export default function PageHeadline({ title, description }) {
    return (
        <div className={style.headline}>
            {title &&
                <h1 className={style.title}>
                    {title}
                </h1>
            }
            {description &&
                <div className={style.description}>
                    <ReactMarkdown
                        children={description}
                        linkTarget="_blank"
                        skipHtml
                    />
                </div>
            }
        </div>
    )
}
