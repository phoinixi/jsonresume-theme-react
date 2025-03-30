import { useTranslation } from 'react-i18next';
import type { Locale } from '../../i18n/config';

export function useLocale(): Locale {
  const { i18n } = useTranslation();
  return i18n.language as Locale;
}
