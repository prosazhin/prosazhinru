
import React from 'react'
import { Card } from '../'
import style from './Selections.module.scss'



export default function Selections({ array, tags, customClass }) {

    // function linksCount(count) {
    //     function declOfNum(number, titles) {
    //         const cases = [2, 0, 1, 1, 1, 2]
    //         return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
    //     }
    //     return `${count} ${declOfNum(count, ['ссылка', 'ссылки', 'ссылок'])}`
    // }

    return (
        <React.Fragment>
            <div className={`${style.selections}${customClass ? ` ${customClass}` : ''}`}>
                {array.map(item =>
                    <Card
                        item={item}
                        key={item.id}
                        tags={tags}
                        targer="_self"
                    />
                )}
            </div>

        {/* <Link href={`/selection/${selection.url}`}>
            <a className={`${style.selection}${selection.big ? ` ${style.selection_size_big}`: ''}`}>
                <span className={`${style.headline}${selection.big ? ` ${style.headline_size_big}`: ''}`}>
                    {selection.title}
                </span>

                {selection.description &&
                    <span className={`${style.description}${selection.big ? ` ${style.description_size_big}`: ''}`}>
                        {selection.description}
                    </span>
                }

                <div className={style.bottom}>
                    <span className={style.count}>
                        {linksCount(selection.links.length)}
                    </span>
                    <ul className={style.tags}>
                        {selection.tags.map(tag =>
                            <li
                                className={style.tags__item}
                                key={tag.id}
                            >
                            </li>
                        )}
                    </ul>
                </div>
            </a>
        </Link> */}
        </React.Fragment>
    )
}