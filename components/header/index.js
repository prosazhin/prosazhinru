import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import style from './header.scss'
import { Container } from '../'
import { openMobileMenu, closeMobileMenu } from '../../app/index/actions'



const state = state => ({
    isActiveMobileMenu: state.index.isActiveMobileMenu,
})

const dispatch = dispatch => ({
    openMobileMenu: bindActionCreators(openMobileMenu, dispatch),
    closeMobileMenu: bindActionCreators(closeMobileMenu, dispatch),
})



class Header extends Component {

    toggleMobileMenu = (actions) => {
        actions()
    }

    render() {
        return (
            <React.Fragment>
                <header className={`${style.header}${this.props.isActiveMobileMenu ? ` ${style.header__mobile}` : ''}`}>
                    <Container>
                        <Link
                            className={style.logo}
                            to="/"
                            onClick={this.props.closeMobileMenu}
                        >
                            <img
                                src="/images/avatar.png"
                                alt=""
                                className={style.logo__image}
                            />
                            Евгений Сажин
                        </Link>
                        <nav className={`${style.nav}${this.props.isActiveMobileMenu ? ` ${style.nav__mobile}` : ''}`}>
                            <li
                                className={style.nav__item}
                                onClick={this.props.closeMobileMenu}
                            >
                                <NavLink
                                    to="/links"
                                    className={style.nav__item__link}
                                    activeClassName={style.nav__item__link__active}
                                >
                                    Cсылки
                                </NavLink>
                            </li>
                            <li
                                className={style.nav__item}
                                onClick={this.props.closeMobileMenu}
                            >
                                <NavLink
                                    to="/selections"
                                    className={style.nav__item__link}
                                    activeClassName={style.nav__item__link__active}
                                >
                                    Подборки
                                </NavLink>
                            </li>
                            <li
                                className={style.nav__item}
                                onClick={this.props.closeMobileMenu}
                            >
                                <NavLink
                                    to="/about"
                                    className={style.nav__item__link}
                                    activeClassName={style.nav__item__link__active}
                                >
                                    Про себя
                                </NavLink>
                            </li>
                        </nav>
                    </Container>

                    {this.props.isActiveMobileMenu
                        ?
                        <span
                            className={style.menu}
                            onClick={() => this.toggleMobileMenu(this.props.closeMobileMenu)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        :
                        <span
                            className={style.menu}
                            onClick={() => this.toggleMobileMenu(this.props.openMobileMenu)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    }
                </header>

                <style jsx>{style}</style>
            </React.Fragment>
        )
    }
}

export default withRouter(connect(state, dispatch)(Header))