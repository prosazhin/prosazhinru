const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/**
 * Устанавливает куку локали на клиенте (для LangSwitch).
 */
export function setLocaleCookie(locale: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${COOKIE_MAX_AGE}`;
}
