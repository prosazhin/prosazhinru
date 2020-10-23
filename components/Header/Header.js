import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import style from './Header.module.scss'

import {
    Container,
} from '../'



export default function Header({ navigations }) {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()

    return (
        <React.Fragment>
            <header className={`${style.header}${isActive ? ` ${style.header__mobile}` : ''}`}>
                <Container>
                    <Link href="/">
                        <a className={style.logo}>
                            <img
                                src="/avatar.png"
                                alt=""
                                className={style.logo__image}
                            />
                            Евгений Сажин
                        </a>
                    </Link>
                    <nav className={`${style.nav}${isActive ? ` ${style.nav__mobile}` : ''}`}>
                        {navigations
                            .sort(( a, b ) => a.order - b.order)
                            .map(link =>
                            <React.Fragment key={link.id}>
                                {!!link.show &&
                                    <li className={style.nav__item}>
                                        <Link href={link.url}>
                                            <a className={`${style.nav__item__link}${router.pathname === link.url ? ` ${style.nav__item__link__active}` : ''}`}>
                                                {link.title}
                                            </a>
                                        </Link>
                                    </li>
                                }
                            </React.Fragment>
                        )}
                    </nav>
                </Container>

                {isActive
                    ?
                    <span
                        className={style.menu}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    :
                    <span
                        className={style.menu}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                }
            </header>
        </React.Fragment>
    )
}