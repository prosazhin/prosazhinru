
import React from 'react'
import style from './Container.module.scss'



export function Container({ children, small, center }) {
    return (
        <div className={
            `${style.container} `+
            `${small ? style.container__size_small : style.container__size_normal}`+
            `${(small && center) ? ` ${style.container__align_center}` : ''}`
        }>
            {children}
        </div>
    )
}

export function MainContainer({ children }) {
    return (
        <main className={`${style.container} ${style.container__size_normal} ${style.main}`}>
            {children}
        </main>
    )
}