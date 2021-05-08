
import { Link } from '../'
import style from './Links.module.scss'



export default function Links({ array, customClass }) {
    return (
        <div className={`${style.links}${customClass ? ` ${customClass}` : ''}`}>
            {array.sort(( a, b ) => new Date(b.create) - new Date(a.create)).map(item =>
                <Link
                    key={item.id}
                    item={item}
                />
            )}
        </div>
    )
}
