
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './Tag.module.scss'



export function ClickableTag({ title, url, tagLinkTo }) {
    const router = useRouter()

    return (
        <Link href={router.query.tag === url ? `/${tagLinkTo}` : `/${tagLinkTo}/${url}`}>
            <a className={`${style.tag} ${style.tag__clickable}${router.query.tag === url ? ` ${style.tag__clickable_active}` : ''}`}>
                {title}
            </a>
        </Link>
    )
}

export function StaticActiveTag({ title, url, notActive }) {
    const router = useRouter()

    return (
        <span className={`${style.tag} ${style.tag__static}${(!notActive && router.query.tag === url) ? ` ${style.tag__static_active}` : ''}`}>
            {title}
        </span>
    )
}

export function StaticTag({ title }) {
    const router = useRouter()

    return (
        <span className={`${style.tag} ${style.tag__static}`}>
            {title}
        </span>
    )
}
