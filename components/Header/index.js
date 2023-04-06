import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import { XMarkIcon, Bars2Icon } from "@heroicons/react/24/solid";
import Container from "@/components/Container";
import style from "./Header.module.scss";

export default function Header() {
  const router = useRouter();
  const { nav, isActiveMenu, toggleActiveMenu } = useAppContext();

  const isActiveLink = (urls) => {
    return urls.some((item) => (router.pathname.search(item) === -1 ? false : true));
  };

  return (
    <header className={`${style.header}${isActiveMenu ? ` ${style.header__mobile}` : ""}`}>
      <Container>
        <div className={style.header__wrapper}>
          <Link href="/" className={style.name}>
            <span className={style.name__title}>Евгений Сажин</span>
            <span className={style.name__description}>Дизайнер и фронтенд разработчик</span>
          </Link>
          <nav className={`${style.nav} ${style.nav__desktop}`}>
            {nav.map((link) => (
              <li className={style.nav__item} key={link.url}>
                <Link href={`/${link.url}`} className={`${style.nav__item__link}${isActiveLink(link.active) ? ` ${style.nav__item__link__active}` : ""}`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </nav>
        </div>
        <nav className={`${style.nav} ${style.nav__mobile}${isActiveMenu ? ` ${style.nav__mobile_active}` : ""}`}>
          {nav.map((link) => (
            <li className={style.nav__item} key={link.url}>
              <Link href={`/${link.url}`} className={`${style.nav__item__link}${isActiveLink(link.active) ? ` ${style.nav__item__link__active}` : ""}`}>
                {link.title}
              </Link>
            </li>
          ))}
        </nav>
        {isActiveMenu ? (
          <span className={style.header__mobile_toogle} onClick={toggleActiveMenu}>
            <XMarkIcon />
          </span>
        ) : (
          <span className={style.header__mobile_toogle} onClick={toggleActiveMenu}>
            <Bars2Icon />
          </span>
        )}
      </Container>
    </header>
  );
}
