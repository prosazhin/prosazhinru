
import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './PageHeadline.module.scss'



export default function PageHeadline({ children, title, description }) {
    return (
        <div className={style.headline}>
            {title &&
                <h1 className={style.title}>
                    {title}
                </h1>
            }
            <div className={style.description}>
                <ReactMarkdown
                    source={description}
                    linkTarget="_blank"
                    skipHtml
                />
            </div>
            {children}
        </div>
    )
}
