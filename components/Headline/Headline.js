import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './Headline.module.scss'



export default function Headline({ children, title, description, h1, notBottomMargin }) {
    return (
        <div className={`${style.headline}${notBottomMargin ? ` ${style.headline__not_bottom_margin}` : ''}`}>
            {!!title &&
                <React.Fragment>
                    {h1 ?
                        <h1 className={style.title}>
                            {title}
                        </h1>
                        :
                        <span className={style.title}>
                            {title}
                        </span>
                    }
                </React.Fragment>
            }
            {!!description &&
                <div className={style.description}>
                    <ReactMarkdown
                        source={description}
                        linkTarget="_blank"
                        skipHtml
                    />
                </div>
            }
            {children}
        </div>
    )
}