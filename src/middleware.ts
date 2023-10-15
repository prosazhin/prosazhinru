import { NextRequest, NextResponse } from 'next/server';

import { LangType } from '@/types';
import { i18n } from '@/utils/i18n';

function getLocale(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let result: LangType = i18n.defaultLocale;

  i18n.locales.forEach((locale) => {
    if (pathname.startsWith(`/${locale}`)) {
      result = locale;
    }
  });

  return result;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = getLocale(request);
  const isDefaultLocale = pathname.startsWith(`/${i18n.defaultLocale}`);
  const newPathname = pathname.replace(`/${i18n.defaultLocale}`, '');

  const newHeaders = new Headers(request.headers);
  newHeaders.set('x-lang', lang);

  if (isDefaultLocale) {
    return NextResponse.redirect(new URL(newPathname.length ? newPathname : '/', request.url));
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}`, request.url), {
      request: { headers: newHeaders },
    });
  }

  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next|favicon|sharing|cover|logo|sitemap|robots.txt).*)'],
};
