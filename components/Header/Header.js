
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { Container } from '../'
import style from './Header.module.scss'



export default function Header({ navigations }) {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()

    const isActiveLink = (url) => {
        const result = router.pathname.search(url)
        return result === -1 ? false : true
    }

    return (
        <header className={`${style.header}${isActive ? ` ${style.header__mobile}` : ''}`}>
            <Container>
                <div className={style.header__wrapper}>
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
                    <nav className={`${style.nav} ${style.nav__desktop}`}>
                        {navigations.sort(( a, b ) => a.order - b.order).map(link =>
                            <React.Fragment key={link.id}>
                                {!!link.show &&
                                    <li className={style.nav__item}>
                                        <Link href={link.url}>
                                            <a className={`${style.nav__item__link}${isActiveLink(link.url) ? ` ${style.nav__item__link__active}` : ''}`}>
                                                {link.title}
                                            </a>
                                        </Link>
                                    </li>
                                }
                            </React.Fragment>
                        )}
                    </nav>
                </div>
                <nav className={`${style.nav} ${style.nav__mobile}${isActive ? ` ${style.nav__mobile_active}` : ''}`}>
                    {navigations.sort(( a, b ) => a.order - b.order).map(link =>
                        <React.Fragment key={link.id}>
                            {!!link.show &&
                                <li className={style.nav__item}>
                                    <Link href={link.url}>
                                        <a className={`${style.nav__item__link}${isActiveLink(link.url) ? ` ${style.nav__item__link__active}` : ''}`}>
                                            {link.title}
                                        </a>
                                    </Link>
                                </li>
                            }
                        </React.Fragment>
                    )}
                </nav>
                {isActive ?
                    <span
                        className={style.header__mobile_toogle}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    :
                    <span
                        className={style.header__mobile_toogle}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                }
            </Container>
        </header>
    )
}