// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'de', 'ur', 'hi', 'ru'];

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const currentLang = searchParams.get('lang');
  
  // If lang parameter exists and is valid, let it through
  if (currentLang && locales.includes(currentLang)) {
    return NextResponse.next();
  }
  
  // If lang parameter is missing or invalid, redirect with detected locale
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  
  // Map country to locale
  const countryToLocale: Record<string, string> = {
    'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
    'DE': 'de', 'AT': 'de', 'CH': 'de',
    'PK': 'ur',
    'IN': 'hi',
    'RU': 'ru', 'BY': 'ru', 'KZ': 'ru',
  };
  
  const locale = countryToLocale[country] || 'en';
  
  // Create new URL with lang parameter
  const url = request.nextUrl.clone();
  url.searchParams.set('lang', locale);
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
