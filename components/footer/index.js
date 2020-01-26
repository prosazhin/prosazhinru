import React from 'react'
import style from './footer.scss'



export const Footer = () => {
    return (
        <footer className={style.footer}>
            <ul className={style.contacts}>
                <li className={style.contacts__item}>
                    <a
                        href="mailto:prosazhin@ya.ru"
                        target="_self"
                    >
                        prosazhin@ya.ru
                    </a>
                </li>
                <li className={style.contacts__item}>
                    <a
                        href="https://t.me/prosazhin"
                        // eslint-disable-next-line
                        target="_blank"
                    >
                        Телеграм
                    </a>
                </li>
                <li className={style.contacts__item}>
                    <a
                        href="https://vk.com/prosazhin"
                        // eslint-disable-next-line
                        target="_blank"
                    >
                        Вконтакте
                    </a>
                </li>
            </ul>
            <span className={style.copyright}>
                © 2017 - 2019, Евгений Сажин
            </span>
        </footer>
    )
}

export default Footer