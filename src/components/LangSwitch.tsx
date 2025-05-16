'use client';

import { i18nConfig } from '@/i18n';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem } from '@pbcomponents/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  useEffect(() => {
    let result: string | null = pathname;

    if (pathname === '/' || pathname === '/en') {
      result = '/';
    }

    setCurrentUrl(result ? result.replace(`/${lang}`, '') : '/');
  }, [pathname, lang]);

  return (
    <Dropdown
      button={
        <Button
          size='xs'
          color='secondary'
          theme='border'
          textClassName='uppercase'
        >
          {lang}
        </Button>
      }
      align='right'
      className='!w-160'
    >
      {i18nConfig.locales.map((item: string) => (
        <DropdownItem
          key={item}
          href={`/${item}${currentUrl}`}
          leftIcon={lang === item ? CheckIcon : undefined}
          leftIconClassName='!text-primary-darker'
        >
          {t(`locales.${item}`)}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default LangSwitch;
