import Image from 'next/image';
import NextLink from 'next/link';

import { LangType } from '@/types';
import { Container } from '@pbcomponents/react';

import LangSwitch from '@/components/LangSwitch';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';

const Header = ({ locale }: { locale: LangType }) => (
  <header className='border-secondary-lighter group fixed top-0 z-40 block h-72 w-full border-b-1 bg-white py-16 transition-colors duration-150 print:relative'>
    <Container size='m'>
      <div className='flex w-full flex-row items-center gap-x-24'>
        <div className='inline-flex h-40 flex-1 items-center justify-start'>
          <NextLink
            href='/'
            className='h-40 w-auto no-underline'
          >
            <Image
              src={`/logo/${locale}.svg`}
              alt='Logotype'
              width={311}
              height={40}
              className='desktop:block hidden h-full w-auto print:block'
              loading='eager'
            />
            <Image
              src='/logo/icon.svg'
              alt='Logotype'
              width={51}
              height={40}
              className='desktop:hidden h-full w-auto print:hidden'
              loading='eager'
            />
          </NextLink>
        </div>
        <div className='flex flex-row items-center gap-x-24 print:hidden'>
          <LangSwitch />
          <MobileMenu />
        </div>
        <Nav className='desktop:flex hidden print:hidden' />
      </div>
    </Container>
  </header>
);

export default Header;
