import { i18nConfig } from '@/i18n';
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value;
  const hasValidLocale = locale && i18nConfig.locales.includes(locale);

  if (hasValidLocale || request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', i18nConfig.defaultLocale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
  });
  return response;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
