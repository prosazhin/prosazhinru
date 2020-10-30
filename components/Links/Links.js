
import { Card } from '../'
import style from './Links.module.scss'



export default function Links({ array, tags, customClass }) {
    return (
        <div className={`${style.links}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item =>
                <Card
                    item={item}
                    key={item.id}
                    tags={tags}
                    targer="_blank"
                />
            )}
        </div>
    )
}
