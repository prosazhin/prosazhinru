
import Link from 'next/link'
import { Tags } from '../'
import style from './Card.module.scss'



export default function Card({ item, linkUrl, linkTarger, isShowTags, isBigSize }) {
    return (
        <Link href={linkUrl}>
            <a target={linkTarger} className={`${style.card}${isBigSize ? ` ${style.card__state_big_size}` : ''}`}>
                <span className={`${style.card__headline}${isBigSize ? ` ${style.card__headline__state_big_size}` : ''}`}>
                    {item.title}
                </span>
                {(isShowTags && item.tags.length) &&
                    <Tags
                        array={item.tags}
                        customClass={style.card__tags}
                    />
                }
                {item.description &&
                    <span className={`${style.card__description}${isBigSize ? ` ${style.card__description__state_big_size}` : ''}`}>
                        {item.description}
                    </span>
                }
            </a>
        </Link>
    )
}