import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import Container from '../container'
import style from './header.scss'



// import { openMobileMenu, closeMobileMenu } from '../../app/index/actions'

// const state = state => ({
//     isActiveMobileMenu: state.index.isActiveMobileMenu,
// })

// const dispatch = dispatch => ({
//     openMobileMenu: bindActionCreators(openMobileMenu, dispatch),
//     closeMobileMenu: bindActionCreators(closeMobileMenu, dispatch),
// })



const Header = (props) => {
    const router = useRouter()

    return (
        <React.Fragment>
            <header className="header">
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
                    <nav className="nav">
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
            </header>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Header