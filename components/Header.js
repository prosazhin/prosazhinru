import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Container from "@/components/Container";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const { nav, setIsActiveMenu } = useAppContext();

  const isActiveLink = (urls) => {
    return urls.some((item) => {
      if (item === "/" && router.pathname === "/") return true;
      if (item === "/" && router.pathname !== "/") return false;
      return router.pathname.search(item) === -1 ? false : true;
    });
  };

  return (
    <header className="fixed top-0 z-40 block h-[72px] w-full border-b border-secondary-lighter bg-white py-[16px]">
      <Container>
        <div className="flex w-full flex-row items-center space-x-[24px]">
          <div className="inline-flex h-[40px] flex-1 items-center justify-start">
            <Link href="/" className="h-[40px] w-auto no-underline">
              <Image src={`/logo/${lang}.svg`} alt="Logotype" width={311} height={40} className="h-full w-auto sm:hidden" />
              <Image src="/logo/icon.svg" alt="Logotype" width={51} height={40} className="h-full w-auto desktop:hidden" />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-[24px]">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-sm border border-secondary-light px-[8px] py-[4px] text-tm4 text-base-main transition hover:border-primary-main focus:outline-none">
                <span className="uppercase">{lang}</span>
                <ChevronUpDownIcon className="ml-[6px] h-[16px] w-[16px]" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-[4px] flex w-[240px] origin-top-right flex-col overflow-hidden rounded-md border border-secondary-lighter bg-white py-[12px] shadow-lg focus:outline-none">
                  <Menu.Item>
                    <a
                      href={`${process.env.NEXT_PUBLIC_HOST}${router.asPath}`}
                      target="_self"
                      className="flex flex-row items-center bg-white px-[24px] py-[12px] text-t3 text-base-main !no-underline transition hover:bg-base-lightest hover:text-primary-main"
                    >
                      {lang === "ru" && <CheckIcon className="mr-[8px] h-[24px] w-[24px] text-primary-main" aria-hidden="true" />}
                      {t("common:locales.ru")}
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      href={`${process.env.NEXT_PUBLIC_HOST}/en${router.asPath}`}
                      target="_self"
                      className="flex flex-row items-center bg-white px-[24px] py-[12px] text-t3 text-base-main !no-underline transition hover:bg-base-lightest hover:text-primary-main"
                    >
                      {lang === "en" && <CheckIcon className="mr-[8px] h-[24px] w-[24px] text-primary-main" aria-hidden="true" />}
                      {t("common:locales.en")}
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              type="button"
              className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-sm bg-white hover:bg-secondary-lighter desktop:hidden"
              onClick={() => setIsActiveMenu(true)}
            >
              <Bars2Icon className="h-[16px] w-[16px]" />
            </button>
          </div>
          <nav className="flex flex-row space-x-[24px] sm:hidden">
            {nav.map((link) => (
              <Fragment key={link.url}>
                {link.lang.includes(lang) && (
                  <li>
                    <Link href={link.url} className={`text-tm3 text-base-main !no-underline transition hover:text-primary-main ${isActiveLink(link.active) ? "text-primary-main" : ""}`}>
                      {link.title}
                    </Link>
                  </li>
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
