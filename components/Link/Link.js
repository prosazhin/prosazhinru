
import NextLink from 'next/link'
import style from './Link.module.scss'



export default function Link({ item }) {
    return (
        <NextLink href={item.url}>
            <a target="_blank" className={style.link}>
                <span className={style.link__title}>
                    {item.title}
                </span>
                {item.description &&
                    <span className={style.link__description}>
                        {item.description}
                    </span>
                }
            </a>
        </NextLink>
    )
}