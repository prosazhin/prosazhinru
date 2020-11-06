
import { LinkComponent } from '../'
import style from './Links.module.scss'



export default function Links({ array, customClass }) {
    return (
        <div className={`${style.links}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item =>
                <LinkComponent
                    key={item.id}
                    item={item}
                />
            )}
        </div>
    )
}
