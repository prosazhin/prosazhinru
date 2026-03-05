'use client';

import { initClientI18n, initTranslations } from '@/i18n';
import type { i18n } from 'i18next';
import { createInstance } from 'i18next';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

const TranslationsProvider = ({
  children,
  locale,
  resources,
}: {
  children: React.ReactNode;
  locale: string;
  resources: Record<string, unknown>;
}) => {
  const hasResources = resources && Object.keys(resources).length > 0;
  const [i18n, setI18n] = useState<i18n | null>(null);

  useEffect(() => {
    if (hasResources) {
      initClientI18n(locale, resources as Record<string, Record<string, unknown>>).then(setI18n);
      return;
    }
    const instance = createInstance();
    initTranslations(locale, instance, undefined).then(() => {
      setI18n(instance);
    });
  }, [locale, resources, hasResources]);

  if (!i18n) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
