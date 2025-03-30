import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocale = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState<string>(() => {
    // Check for URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    // Use URL parameter if valid, otherwise use 'en' as default
    const validLocales = ['en', 'de', 'fr', 'es', 'it', 'ru', 'zh'];
    return validLocales.includes(langParam || '') ? (langParam as string) : 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(locale);

    // Update URL when language changes
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState({}, '', url.toString());
  }, [locale, i18n]);

  const changeLocale = useCallback((newLocale: string) => {
    setLocale(newLocale);
  }, []);

  return {
    locale,
    changeLocale,
  };
};
