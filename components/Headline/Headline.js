import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './Headline.module.scss'



export default function Headline({ title }) {
    return (
        <span className={style.headline}>
            {title}
        </span>
    )
}
