import Image from 'next/image';
import NextLink from 'next/link';

import { LangType } from '@/types';
import { getDictionary } from '@/utils/get-dictionaries';

import Container from '@/components/Container';
import LangSwitch from '@/components/LangSwitch';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';

type Props = {
  lang: LangType;
};

const Header = async ({ lang }: Props) => {
  const t = await getDictionary(lang);

  return (
    <header className="fixed top-0 z-40 block h-[72px] w-full border-b border-secondary-lighter bg-white py-[16px]">
      <Container>
        <div className="flex w-full flex-row items-center space-x-[24px]">
          <div className="inline-flex h-[40px] flex-1 items-center justify-start">
            <NextLink
              href={lang === 'ru' ? '/' : `/${lang}`}
              className="h-[40px] w-auto no-underline"
            >
              <Image
                src={`/logo/${lang}.svg`}
                alt="Logotype"
                width={311}
                height={40}
                className="w-auto h-full sm:hidden"
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
          <div className="flex flex-row items-center space-x-[24px]">
            <LangSwitch lang={lang} t={t} />
            <MobileMenu lang={lang} t={t} />
          </div>
          <Nav lang={lang} t={t} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
