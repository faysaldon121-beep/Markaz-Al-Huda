// lib/utils/detect-language.ts
import { headers } from 'next/headers';
import { Language, defaultLanguage, languages } from '@/lib/i18n/languages';

const countryToLanguage: Record<string, Language> = {
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  DE: 'de', AT: 'de', CH: 'de',
  PK: 'ur', AF: 'ur',
  IN: 'hi',
  RU: 'ru', BY: 'ru', KZ: 'ru', UA: 'ru',
};

export async function detectLanguageFromIP(): Promise<Language> {
  try {
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') || 'US';
    return countryToLanguage[country] || defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export async function getBestLanguage(preferredLang?: string): Promise<Language> {
  // Check if preferred language is valid
  if (preferredLang && preferredLang in languages) {
    return preferredLang as Language;
  }
  
  // Fallback to IP detection
  return await detectLanguageFromIP();
}
