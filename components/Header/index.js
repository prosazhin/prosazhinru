
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { Container } from '../'
import style from './Header.module.scss'



export default function Header({ navigations }) {
    const router = useRouter()
    const context = useAppContext()

    const isActiveLink = (url) => {
        const result = router.pathname.search(url)
        return result === -1 ? false : true
    }

    return (
        <header className={`${style.header}${context.isActiveMenu ? ` ${style.header__mobile}` : ''}`}>
            <Container>
                <div className={style.header__wrapper}>
                    <Link href="/">
                        <a className={style.name}>
                            <span className={style.name__title}>Евгений Сажин</span>
                            <span className={style.name__description}>Дизайнер и фронтенд разработчик</span>
                        </a>
                    </Link>
                    <nav className={`${style.nav} ${style.nav__desktop}`}>
                        {navigations.sort(( a, b ) => a.order - b.order).map(link =>
                            <React.Fragment key={link.id}>
                                {!!link.show &&
                                    <li className={style.nav__item}>
                                        <Link href={`/${link.slug}`}>
                                            <a className={`${style.nav__item__link}${isActiveLink(link.slug) ? ` ${style.nav__item__link__active}` : ''}`}>
                                                {link.title}
                                            </a>
                                        </Link>
                                    </li>
                                }
                            </React.Fragment>
                        )}
                    </nav>
                </div>
                <nav className={`${style.nav} ${style.nav__mobile}${context.isActiveMenu ? ` ${style.nav__mobile_active}` : ''}`}>
                    {navigations.sort(( a, b ) => a.order - b.order).map(link =>
                        <React.Fragment key={link.id}>
                            {!!link.show &&
                                <li className={style.nav__item}>
                                    <Link href={`/${link.slug}`}>
                                        <a className={`${style.nav__item__link}${isActiveLink(link.slug) ? ` ${style.nav__item__link__active}` : ''}`}>
                                            {link.title}
                                        </a>
                                    </Link>
                                </li>
                            }
                        </React.Fragment>
                    )}
                </nav>
                {context.isActiveMenu ?
                    <span
                        className={style.header__mobile_toogle}
                        onClick={context.toggleActiveMenu}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    :
                    <span
                        className={style.header__mobile_toogle}
                        onClick={context.toggleActiveMenu}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                }
            </Container>
        </header>
    )
}
