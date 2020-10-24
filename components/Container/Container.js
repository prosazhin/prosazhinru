import React from 'react'
import style from './Container.module.scss'



export function Container({ children, small }) {
    return (
        <React.Fragment>
            <div className={`${style.container} ${small ? style.container__size_small : style.container__size_normal}`}>
                {children}
            </div>
        </React.Fragment>
    )
}

export function MainContainer({ children }) {
    return (
        <React.Fragment>
            <main className={`${style.container} ${style.container__size_normal} ${style.main}`}>
                {children}
            </main>
        </React.Fragment>
    )
}