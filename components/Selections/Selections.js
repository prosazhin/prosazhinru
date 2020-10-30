
import { Card } from '../'
import style from './Selections.module.scss'



export default function Selections({ array, isShowTags, customClass }) {
    return (
        <div className={`${style.selections}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item =>
                <Card
                    key={item.id}
                    item={item}
                    linkUrl={`/selection/${item.url}`}
                    linkTarger="_self"
                    isShowTags={isShowTags}
                    isBigSize={item.big}
                />
            )}
        </div>
    )
}