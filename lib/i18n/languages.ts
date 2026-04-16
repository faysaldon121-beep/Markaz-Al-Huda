// lib/i18n/languages.ts
export const languages = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ur: { name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';
