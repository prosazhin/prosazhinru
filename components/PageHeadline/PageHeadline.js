
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
                        source={description}
                        renderers={{
                            link: props => props.href === '/links' || props.href === '/selections' || props.href === '/about' ?
                                <a href={props.href} target="_self">{props.children}</a>
                                :
                                <a href={props.href} target="_blank">{props.children}</a>
                        }}
                        skipHtml
                    />
                </div>
            }
        </div>
    )
}
