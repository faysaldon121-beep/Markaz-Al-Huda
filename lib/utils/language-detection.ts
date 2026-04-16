// lib/utils/language-detection.ts
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

// Get best language match (simplified for build compatibility)
export function getBestLanguage(preferredLang?: string): Language {
  if (preferredLang && preferredLang in languages) {
    return preferredLang as Language;
  }
  
  return 'en';
}

// Server-side language detection
export function detectLanguageFromCountry(country?: string): Language {
  if (!country) return 'en';
  return countryToLanguage[country] || 'en';
}


