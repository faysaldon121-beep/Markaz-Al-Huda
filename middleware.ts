// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'de', 'ur', 'hi', 'ru'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Get country from Vercel headers
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    
    // Map country to locale
    const countryToLocale: Record<string, string> = {
      'US': 'en', 'GB': 'en',
      'ES': 'es', 'MX': 'es',
      'DE': 'de',
      'PK': 'ur',
      'IN': 'hi',
      'RU': 'ru',
    };
    
    const locale = countryToLocale[country] || 'en';
    
    // Redirect to locale path
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
