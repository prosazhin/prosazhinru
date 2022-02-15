import React from "react";
import dayjs from "dayjs";
import { Container } from "../";
import style from "./Footer.module.scss";

export default function Footer({ contacts }) {
  return (
    <footer className={style.wrapper}>
      <Container>
        <div className={style.footer}>
          <ul className={style.contacts}>
            {contacts
              .sort((a, b) => a.order - b.order)
              .map((contact) => (
                <li className={style.contacts__item} key={contact.id}>
                  {contact.link ? (
                    <a href={contact.url} target="_blank" rel="noreferrer">
                      {contact.title}
                    </a>
                  ) : (
                    <React.Fragment>{contact.title}</React.Fragment>
                  )}
                </li>
              ))}
          </ul>
          <span className={style.copyright}>
            © 2017 — {dayjs().format("YYYY")}, Евгений Сажин
          </span>
        </div>
      </Container>
    </footer>
  );
}
