import { format, isValid, Locale } from 'date-fns';
import { de, enUS, es, fr, it, ru, zhCN } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const getDateLocale = (locale: string) => {
  const localeMap: Record<string, Locale> = {
    en: enUS,
    de: de,
    fr: fr,
    es: es,
    it: it,
    ru: ru,
    zh: zhCN,
  };

  return localeMap[locale] || enUS;
};

export const useDate = (dateString?: string) => {
  const { t, i18n } = useTranslation();
  const dateLocale = getDateLocale(i18n.language);

  if (!dateString) return '';

  const date = new Date(dateString);
  if (!isValid(date)) return dateString;

  try {
    return format(date, t('date.format', 'MMM yyyy'), {
      locale: dateLocale,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const useDuration = (startDateString?: string, endDateString?: string) => {
  const { t } = useTranslation();

  if (!startDateString) return '';

  const startDate = new Date(startDateString);
  if (!isValid(startDate)) return '';

  const endDate = endDateString ? new Date(endDateString) : new Date();
  if (endDateString && !isValid(endDate)) return '';

  const diffYears = endDate.getFullYear() - startDate.getFullYear();
  const diffMonths = endDate.getMonth() - startDate.getMonth();

  let years = diffYears;
  let months = diffMonths;
  if (diffMonths < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? t('common.duration.year') : t('common.duration.years')}`);
  }

  if (months > 0) {
    parts.push(
      `${months} ${months === 1 ? t('common.duration.month') : t('common.duration.months')}`
    );
  }

  if (parts.length === 0) {
    return t('common.duration.lessThanMonth');
  }

  return parts.join(', ');
};

export const useDateRange = (startDateString?: string, endDateString?: string) => {
  const { t } = useTranslation();

  const startDate = useDate(startDateString);
  const endDate = useDate(endDateString);

  if (!startDate) return '';

  if (!endDateString) {
    return t('date.present', { start: startDate });
  }

  return t('date.range', { start: startDate, end: endDate });
};
