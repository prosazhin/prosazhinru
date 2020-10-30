
import { ClickableTag, StaticTag } from '../'
import style from './Tags.module.scss'



export default function Tags({ array, tagLinkTo, customClass, clickable }) {
    return (
        <ul className={`${style.tags}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item =>
                <li
                    className={style.tags__item}
                    key={item.id}
                >
                    {clickable ?
                        <ClickableTag
                            title={item.title}
                            url={item.url}
                            tagLinkTo={tagLinkTo}
                        />
                        :
                        <StaticTag
                            title={item.title}
                            url={item.url}
                        />
                    }
                </li>
            )}
        </ul>
    )
}
