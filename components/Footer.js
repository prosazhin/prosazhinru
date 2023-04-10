import React from "react";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import Container from "@/components/Container";
import { useAppContext } from "@/lib/context";

export default function Footer() {
  const { t } = useTranslation();
  const { contacts } = useAppContext();

  return (
    <footer className="block w-full border-t border-secondary-lighter py-[24px]">
      <Container>
        <div className="flex w-full flex-col space-y-[16px]">
          <ul className="flex flex-col sm:space-y-[8px] desktop:flex-row desktop:space-x-[32px]">
            {contacts.map((contact) => (
              <li className="inline-block" key={contact.url}>
                {contact.link ? (
                  <a className="text-tm3 text-primary-main transition hover:text-danger-main hover:underline" href={contact.url} target="_blank" rel="noreferrer">
                    {contact.title}
                  </a>
                ) : (
                  <span className="text-tm3 text-base-main">{contact.title}</span>
                )}
              </li>
            ))}
          </ul>
          <span className="w-full text-t4 text-base-light">
            © 2017 — {dayjs().format("YYYY")}, {t("common:name")}
          </span>
        </div>
      </Container>
    </footer>
  );
}
