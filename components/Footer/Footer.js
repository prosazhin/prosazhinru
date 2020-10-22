import React from 'react'
import style from './Footer.module.scss'

import {
    Container,
} from '../'



export default function Footer(props) {
    return (
        <React.Fragment>
            <footer className={style.footer}>
                <Container>
                    <ul className={style.contacts}>
                        {props.contacts.length && props.contacts.map(contact =>
                            <li className={style.contacts__item} key={contact.sys.id}>
                                <a
                                    href={contact.fields.url}
                                    target={contact.fields.target}
                                >
                                    {contact.fields.title}
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