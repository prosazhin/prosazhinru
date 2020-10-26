import React from 'react'
import style from './Links.module.scss'

import {
    Card,
} from '../'



export default function Links({ array, tags, tagLinkTo }) {
    return (
        <div className={style.links}>
            {array.map(item =>
                <Card
                    item={item}
                    key={item.id}
                    tags={tags}
                    tagLinkTo={tagLinkTo}
                />
            )}
        </div>
    )
}