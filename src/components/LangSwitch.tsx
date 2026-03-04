'use client';

import { i18nConfig } from '@/i18n';
import { setLocaleCookie } from '@/utils/set-locale-cookie';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem } from '@pbcomponents/react';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  const switchLocale = (newLocale: string) => {
    setLocaleCookie(newLocale);
    window.location.reload();
  };

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
          onClick={() => switchLocale(item)}
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
