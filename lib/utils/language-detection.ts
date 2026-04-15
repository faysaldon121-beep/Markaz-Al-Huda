// lib/utils/language-detection.ts
import { headers } from 'next/headers';

export const languages = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ur: { name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
} as const;

export type Language = keyof typeof languages;

// Country to language mapping
const countryToLanguage: Record<string, Language> = {
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es',
  DE: 'de', AT: 'de', CH: 'de',
  PK: 'ur', AF: 'ur',
  IN: 'hi',
  RU: 'ru', BY: 'ru', KZ: 'ru',
};

// Detect language from IP geolocation
export async function detectLanguageFromIP(): Promise<Language> {
  try {
    // Using Vercel's geolocation headers
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') || 'US';
    
    return countryToLanguage[country] || 'en';
  } catch (error) {
    return 'en';
  }
}

// Detect language from browser
export function detectLanguageFromBrowser(acceptLanguage: string): Language {
  const browserLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  
  const langMap: Record<string, Language> = {
    'en': 'en',
    'es': 'es',
    'de': 'de',
    'ur': 'ur',
    'hi': 'hi',
    'ru': 'ru',
  };
  
  return langMap[browserLang] || 'en';
}

// Get best language match
export async function getBestLanguage(
  preferredLang?: string
): Promise<Language> {
  if (preferredLang && preferredLang in languages) {
    return preferredLang as Language;
  }

  // Try IP detection
  const ipLang = await detectLanguageFromIP();
  if (ipLang) return ipLang;

  // Fallback to English
  return 'en';
}
