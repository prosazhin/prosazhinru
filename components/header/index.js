import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import Container from '../container'
import style from './header.scss'



const Header = (props) => {
    const [isActive, setIsActive] = useState(false)
    const router = useRouter()

    return (
        <React.Fragment>
            <header className={`header` + `${isActive ? ` header__mobile`: ''}`}>
                <Container>
                    <Link href="/">
                        <a className="logo">
                            <img
                                src="/avatar.png"
                                alt=""
                                className="logo__image"
                            />
                            Евгений Сажин
                        </a>
                    </Link>
                    <nav className={`nav` + `${isActive ? ` nav__mobile`: ''}`}>
                        {props.pages.length && props.pages.filter(link => link.fields.linkUrl !== '/').map((link, index) =>
                            <li
                                key={link.sys.id}
                                className="nav__item"
                            >
                                <Link href={link.fields.linkUrl}>
                                    <a className={`nav__item__link` + `${router.pathname === link.fields.linkUrl ? ` nav__item__link__active` : ''}`}>
                                        {link.fields.linkName}
                                    </a>
                                </Link>
                            </li>
                        )}
                    </nav>
                </Container>

                {isActive
                    ?
                    <span
                        className="menu"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    :
                    <span
                        className="menu"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                }
            </header>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Header