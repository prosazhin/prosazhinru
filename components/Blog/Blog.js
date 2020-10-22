import React from 'react'
import style from './Blog.module.scss'



export default function Blog() {
    return (
        <React.Fragment>
            <div className={style.blog}>
                <img
                    src="/blog.png"
                    alt=""
                    className={style.blog__image}
                />
                <span className={style.blog__text}>
                    Пишу про дизайн и разработку на <a href="https://zen.yandex.ru/id/5db230ef6f5f6f00ae7b97b3" target="_blank">дзене</a>, <a href="https://medium.com/@prosazhin" target="_blank">медиуме</a> или в <a href="https://t.me/prosazhin_channel" target="_blank">телеграме</a>.
                </span>
            </div>
        </React.Fragment>
    )
}