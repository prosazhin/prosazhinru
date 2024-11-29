'use client';

import { I18nextProvider } from 'react-i18next';

import { initTranslations } from '@/i18n';
import { createInstance } from 'i18next';

const TranslationsProvider = ({
  children,
  locale,
  resources,
}: {
  children: React.ReactNode;
  locale: string;
  resources: string;
}) => {
  const i18n = createInstance();
  initTranslations(locale, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
