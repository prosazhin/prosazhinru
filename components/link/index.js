import React from 'react'
import Tag from '../tag'
import style from './link.scss'



const Link = ({ link }) => {
    return (
        <React.Fragment>
            <a
                href={link.fields.url}
                // eslint-disable-next-line
                target="_blank"
                className="link"
            >
                <span className="link__headline">
                    {link.fields.title}
                </span>

                {link.fields.description &&
                    <span className="link__description">
                        {link.fields.description}
                    </span>
                }

                {link.fields.tags.length &&
                    <ul className="link__tags">
                        {link.fields.tags.map(tag =>
                            <li
                                className="link__tags__item"
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

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Link