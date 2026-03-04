import { i18nConfig } from '@/i18n';
import { cookies } from 'next/headers';

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;
  return locale && i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;
}
