import React from 'react'
import Router, { useRouter } from 'next/router'
import style from './Tag.module.scss'



export default function Tag({ title, url, page }) {
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
        <span
            className={`${style.tag}${url === router.query.tag ? ` ${style.tag__active}` : ''}`}
            onClick={(event) => handelClick(event)}
        >
            {title}
        </span>
    )
}