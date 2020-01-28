import React from 'react'
import Tag from '../tag'
import style from './tags.scss'



const Tags = (props) => {
    return (
        <React.Fragment>
            <ul className="tags">
                {props.tags.length && props.tags.map(tag =>
                    <li
                        className="tags__item"
                        key={tag.sys.id}
                    >
                        <Tag
                            title={tag.fields.title}
                            url={tag.fields.url}
                            page={props.page}
                        />
                    </li>
                )}
            </ul>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Tags