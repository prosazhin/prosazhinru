
import Link from 'next/link'
import { Tags } from '../'
import style from './Card.module.scss'



export default function Card({ item, targer, tags, tagLinkTo }) {
    return (
        <Link href={item.url}>
            <a target={targer} className={style.card}>
                <span className={style.card__headline}>
                    {item.title}
                </span>
                {(tags && item.tags.length) &&
                    <div className={style.card__tags}>
                        <Tags
                            array={item.tags}
                            tagLinkTo={tagLinkTo}
                        />
                    </div>
                }
                {item.description &&
                    <span className={style.card__description}>
                        {item.description}
                    </span>
                }
            </a>
        </Link>
    )
}