import React from 'react'
import style from './Footer.module.scss'

import {
    Container,
} from '../'



export default function Footer({ contacts }) {
    return (
        <React.Fragment>
            <footer className={style.footer}>
                <Container>
                    <ul className={style.contacts}>
                        {contacts.length && contacts.map(contact =>
                            <li className={style.contacts__item} key={contact.id}>
                                <a
                                    href={contact.url}
                                    target={contact.target}
                                >
                                    {contact.title}
                                </a>
                            </li>
                        )}
                    </ul>
                    <span className={style.copyright}>
                        © 2017 - 2019, Евгений Сажин
                    </span>
                </Container>
            </footer>
        </React.Fragment>
        
    )
}