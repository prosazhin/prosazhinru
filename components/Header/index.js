import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context';
import { XMarkIcon, Bars2Icon } from '@heroicons/react/24/solid';
import { Container } from '../';
import style from './Header.module.scss';

export default function Header({ navigations }) {
  const router = useRouter();
  const context = useAppContext();

  const isActiveLink = (urls) => {
    return urls.some((item) => (router.pathname.search(item) === -1 ? false : true));
  };

  const navArr = navigations.sort((a, b) => a.order - b.order);

  return (
    <header className={`${style.header}${context.isActiveMenu ? ` ${style.header__mobile}` : ''}`}>
      <Container>
        <div className={style.header__wrapper}>
          <Link href="/" className={style.name}>
            <span className={style.name__title}>Евгений Сажин</span>
            <span className={style.name__description}>Дизайнер и фронтенд разработчик</span>
          </Link>
          <nav className={`${style.nav} ${style.nav__desktop}`}>
            {navArr.map((link) => (
              <React.Fragment key={link.id}>
                {!!link.show && (
                  <li className={style.nav__item}>
                    <Link href={`/${link.slug}`} className={`${style.nav__item__link}${isActiveLink(link.active !== null ? link.active : [link.slug]) ? ` ${style.nav__item__link__active}` : ''}`}>
                      {link.title}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
        <nav className={`${style.nav} ${style.nav__mobile}${context.isActiveMenu ? ` ${style.nav__mobile_active}` : ''}`}>
          {navArr.map((link) => (
            <React.Fragment key={link.id}>
              {!!link.show && (
                <li className={style.nav__item}>
                  <Link href={`/${link.slug}`} className={`${style.nav__item__link}${isActiveLink(link.active !== null ? link.active : [link.slug]) ? ` ${style.nav__item__link__active}` : ''}`}>
                    {link.title}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
        </nav>
        {context.isActiveMenu ? (
          <span className={style.header__mobile_toogle} onClick={context.toggleActiveMenu}>
            <XMarkIcon />
          </span>
        ) : (
          <span className={style.header__mobile_toogle} onClick={context.toggleActiveMenu}>
            <Bars2Icon />
          </span>
        )}
      </Container>
    </header>
  );
}
