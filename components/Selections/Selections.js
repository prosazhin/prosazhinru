
import React from 'react'
import { Card, Links, Tags } from '../'
import style from './Selections.module.scss'



export default function Selections({ array }) {
    return (
        <ul className={style.selections}>
            {array.map(item =>
                <li className={style.selection} key={item.id}>
                    <span className={style.selection__headline}>
                        {item.title}
                    </span>
                    <span className={style.selection__description}>
                        {item.description}
                    </span>
                    <Tags
                        array={item.tags}
                        customClass={style.selection__tags}
                    />
                    <Links
                        array={item.links}
                        customClass={style.links}
                    />
                </li>
            )}
        </ul>
    )
}