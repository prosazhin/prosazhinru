
import React from 'react'
// import { Links, Tags } from '../'
import style from './Years.module.scss'



export default function Years({ array }) {
    return (
        <ul className={style.years}>
            {array.sort(( a, b ) =>  b.title - a.title).map(item =>
                <li className={style.year} key={item.title}>
                    <span className={style.year__headline}>
                        {item.title}
                    </span>
                </li>
            )}
        </ul>
    )
}