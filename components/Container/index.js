
import React from 'react'
import style from './Container.module.scss'



export function Container({ children, small }) {
    return (
        <div className={
            `${style.container} `+
            `${small ? style.container__size_small : style.container__size_normal}`
        }>
            {children}
        </div>
    )
}

export function MainContainer({ children }) {
    return (
        <main className={style.main}>
            {children}
        </main>
    )
}
