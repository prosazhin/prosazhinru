import React from 'react'
import Router, { useRouter } from 'next/router'
import style from './tag.scss'



const Tag = ({ title, url, page }) => {
    const router = useRouter()

    function handelClick(event) {
        event.preventDefault()
        
        let activeTag = {
            pathname: `/${page}`,
        }

        if (url !== router.query.tag) {
            activeTag.query = { tag: url }
        }

        Router.push(activeTag)
    }

    return (
        <React.Fragment>
            <span
                className={
                    `tag` +
                    `${url === router.query.tag ? ` tag__active` : ''}`
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