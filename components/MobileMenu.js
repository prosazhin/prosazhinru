import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { useAppContext } from "@/lib/context";
import useTranslation from "next-translate/useTranslation";

export default function MobileMenu() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const { nav, isActiveMenu, setIsActiveMenu } = useAppContext();

  const isActiveLink = (urls) => {
    return urls.some((item) => {
      if (item === "/" && router.pathname === "/") return true;
      if (item === "/" && router.pathname !== "/") return false;
      return router.pathname.search(item) === -1 ? false : true;
    });
  };

  return (
    <Modal isOpen={isActiveMenu} setIsOpen={(value) => setIsActiveMenu(value)}>
      <nav className="flex w-full flex-col space-y-[12px]">
        {nav.map((link) => (
          <Fragment key={link.url}>
            {link.lang.includes(lang) && (
              <li>
                <Link href={link.url} className={`text-tm3 !text-base-main !no-underline hover:!text-primary-main ${isActiveLink(link.active) ? "!text-primary-main" : ""}`}>
                  {link.title}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
      </nav>
    </Modal>
  );
}
