
import { Card } from '../'
import style from './Links.module.scss'



export default function Links({ array, isShowTags, customClass }) {
    return (
        <div className={`${style.links}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item =>
                <Card
                    key={item.id}
                    item={item}
                    linkUrl={item.url}
                    linkTarger="_blank"
                    isShowTags={isShowTags}
                    isBigSize={false}
                />
            )}
        </div>
    )
}
