import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Container from "@/components/Container";

export default function Header() {
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
              <Image src="/logo/line.svg" alt="Logotype" width={311} height={40} className="h-full w-auto sm:hidden" />
              <Image src="/logo/icon.svg" alt="Logotype" width={51} height={40} className="h-full w-auto desktop:hidden" />
            </Link>
          </div>
          <div className="flex flex-row space-x-[24px]">
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
              <li key={link.url}>
                <Link href={link.url} className={`text-tm3 text-base-main !no-underline hover:text-primary-main ${isActiveLink(link.active) ? "text-primary-main" : ""}`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
