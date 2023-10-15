import type { Locale } from '@/utils/i18n';
import 'server-only';

const dictionaries = {
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
