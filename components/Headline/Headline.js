
import style from './Headline.module.scss'



export default function Headline({ title, hideMarginTop }) {
    return (
        <span className={`${style.headline}${hideMarginTop ? ` ${style.headline__no_margin_top}` : ''}`}>
            {title}
        </span>
    )
}
