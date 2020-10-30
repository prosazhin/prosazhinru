
import style from './Blog.module.scss'



export default function Blog() {
    return (
        <div className={style.blog}>
            Пишу про дизайн и разработку на <a href="https://zen.yandex.ru/id/5db230ef6f5f6f00ae7b97b3" target="_blank">дзене</a> и <a href="https://medium.com/@prosazhin" target="_blank">медиуме</a>.
        </div>
    )
}