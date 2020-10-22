import React from 'react'
import style from './Container.module.scss'



export default function Container({ children, main }) {
    return (
        <React.Fragment>
            {main ?
                <main className={`${style.container} ${style.main}`}>
                    {children}
                </main>
            :
                <div className={style.container}>
                    {children}
                </div>
            }
        </React.Fragment>
    )
}