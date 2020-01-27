import React from 'react'
import style from './headline.scss'



const Headline = ({ children, title, description, h1 }) => {

    function pastDescription(value) {
        return { __html: value }
    }

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
                    <span
                        className={`description` + `${!title ? ` description_without_title` : ''}`}
                        dangerouslySetInnerHTML={pastDescription(description)}
                    />
                }

                {children}
            </div>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Headline