import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './Headline.module.scss'



export default function Headline({ children, title, description, h1, bigMargin }) {
    return (
        <React.Fragment>
            <div className={style.headline}>
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
                    <div className={`${style.description}${bigMargin ? ` ${style.description_big_margin}` : ''}`}>
                        <ReactMarkdown
                            source={description}
                            linkTarget="_blank"
                            skipHtml
                        />
                    </div>
                }

                {children}
            </div>
        </React.Fragment>
    )
}