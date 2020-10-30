
import React from 'react'
import { Container } from '../'
import style from './Footer.module.scss'



export default function Footer({ contacts }) {
    return (
        <footer className={style.wrapper}>
            <Container>
                <div className={style.footer}>
                    <ul className={style.contacts}>
                        {contacts.map(contact =>
                            <li className={style.contacts__item} key={contact.id}>
                                {contact.type === 'link' ?
                                    <a
                                        href={contact.url}
                                        target={contact.target}
                                    >
                                        {contact.title}
                                    </a>
                                    :
                                    <React.Fragment>
                                        {contact.title}
                                    </React.Fragment>
                                }
                            </li>
                        )}
                    </ul>
                    <span className={style.copyright}>
                        © 2017 - 2020, Евгений Сажин
                    </span>
                </div>
            </Container>
        </footer>
    )
}