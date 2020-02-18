import React from 'react'
import style from './blog.scss'



const Blog = () => {
    return (
        <React.Fragment>
            <div className="blog">
                <img
                    src="/blog.png"
                    alt=""
                    className="blog__image"
                />
                <span className="blog__text">
                    Пишу про дизайн и разработку на <a href="https://zen.yandex.ru/id/5db230ef6f5f6f00ae7b97b3" target="_blank">дзене</a>, <a href="https://medium.com/@prosazhin" target="_blank">медиуме</a> или в <a href="https://t.me/prosazhin_channel" target="_blank">телеграме</a>.
                </span>
            </div>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Blog