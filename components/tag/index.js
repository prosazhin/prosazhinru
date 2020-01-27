import React from 'react'
// import { withRouter } from 'react-router'
// import queryString from 'query-string'
import style from './tag.scss'



const Tag = ({ title, active, history, url }) => {

    function handelClick(event) {
        event.preventDefault()

        // const urlTag = queryString.parse(history.location.search)
        // let activeTag = ''

        // if (urlTag.tag !== tag.url) {
        //     activeTag = `?tag=${tag.url}`
        // }

        // history.push({
        //     pathname: `/${url}`,
        //     search: activeTag,
        // })
    }

    return (
        <React.Fragment>
            <span
                className={
                    `tag` +
                    `${active ? ` tag__active` : ''}`
                }
                onClick={(event) => handelClick(event)}
            >
                {title}
            </span>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Tag