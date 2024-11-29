import Image from 'next/image';
import NextLink from 'next/link';

import { LangType } from '@/types';
import { Container } from '@pbcomponents/react';

import LangSwitch from '@/components/LangSwitch';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';

const Header = ({ locale }: { locale: LangType }) => (
  <header className="fixed top-0 z-40 block w-full py-16 transition-colors bg-white h-72 border-b-1 border-secondary-lighter group">
    <Container size="m">
      <div className="flex flex-row items-center w-full gap-x-24">
        <div className="inline-flex items-center justify-start flex-1 h-40">
          <NextLink href={`/${locale}`} className="w-auto h-40 no-underline">
            <Image
              src={`/logo/${locale}.svg`}
              alt="Logotype"
              width={311}
              height={40}
              className="w-auto h-full mobile:hidden"
              loading="eager"
            />
            <Image
              src="/logo/icon.svg"
              alt="Logotype"
              width={51}
              height={40}
              className="w-auto h-full desktop:hidden"
              loading="eager"
            />
          </NextLink>
        </div>
        <div className="flex flex-row items-center gap-x-24">
          <LangSwitch />
          <MobileMenu />
        </div>
        <Nav className="mobile:hidden" />
      </div>
    </Container>
  </header>
);

export default Header;
