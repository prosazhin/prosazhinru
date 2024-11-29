import { initReactI18next } from 'react-i18next/initReactI18next';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18nConfig = {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
};

export const initTranslations = async (locale, i18nInstance, resources) => {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language, namespace) => import(`@/i18n/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'main',
    fallbackNS: 'main',
    ns: 'main',
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
};
