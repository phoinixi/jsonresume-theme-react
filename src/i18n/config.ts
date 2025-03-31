import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import deTranslations from './locales/de.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import ruTranslations from './locales/ru.json';
import zhTranslations from './locales/zh.json';

export type Locale = 'en' | 'de' | 'fr' | 'es' | 'it' | 'ru' | 'zh';

export const locales = {
  en: { name: 'English' },
  de: { name: 'Deutsch' },
  fr: { name: 'Français' },
  es: { name: 'Español' },
  it: { name: 'Italiano' },
  ru: { name: 'Русский' },
  zh: { name: '中文' },
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: deTranslations },
    fr: { translation: frTranslations },
    es: { translation: esTranslations },
    it: { translation: itTranslations },
    ru: { translation: ruTranslations },
    zh: { translation: zhTranslations },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
