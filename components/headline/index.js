import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './headline.scss'



const Headline = ({ children, title, description, h1, bigMargin }) => {
    return (
        <React.Fragment>
            <div className="headline">
                {!!title &&
                    <React.Fragment>
                        {h1 ?
                            <h1 className="title">
                                {title}
                            </h1>
                            :
                            <span className="title">
                                {title}
                            </span>
                        }
                    </React.Fragment>
                }

                {!!description &&
                    <div className={`description` + `${bigMargin ? ` description_big_margin` : ''}`}>
                        <ReactMarkdown
                            source={description}
                            linkTarget="_blank"
                            skipHtml
                        />
                    </div>
                }

                {children}
            </div>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Headline