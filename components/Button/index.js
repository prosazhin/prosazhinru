import React from 'react'
import style from './Button.module.scss'



export default function ButtonLink({ title, url, target, customClass }) {
    return (
        <div className={style.wrapper}>
            <a
                href={url}
                // eslint-disable-next-line
                target={target}
                className={`${style.button}${customClass ? ` ${customClass}`: ''}`}
            >
                {title}
            </a>
        </div>
    )
}
