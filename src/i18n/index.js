import { initReactI18next } from 'react-i18next/initReactI18next';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const i18nConfig = {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
};

/**
 * Создаёт экземпляр i18n с resources и возвращает промис, резолвящийся когда init завершён.
 * Важно дождаться init(), иначе useTranslation может вернуть некорректные данные
 * и вызвать ошибку гидрации (разный вывод на сервере и клиенте).
 */
export function initClientI18n(locale, resources) {
  const i18n = createInstance();
  i18n.use(initReactI18next);

  return i18n
    .init({
      lng: locale,
      resources: resources || {},
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common', 'pages', 'projects', 'career', 'skills', 'matrix'],
      react: { useSuspense: false },
    })
    .then(() => i18n);
}

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
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common', 'pages', 'projects', 'career', 'skills', 'matrix'],
    preload: resources ? [] : [locale],
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
};
