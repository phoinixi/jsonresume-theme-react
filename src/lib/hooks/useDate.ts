import { useMemo } from 'react';

export const useDate = (dateString?: string) => {
  return useMemo(() => {
    if (!dateString) return '';
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
      }).format(new Date(dateString));
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }, [dateString]);
};

export const useDuration = (startDate?: string, endDate?: string) => {
  return useMemo(() => {
    if (!startDate) return '';

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    let totalMonths = years * 12 + months;

    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }

    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    if (displayYears > 0 && displayMonths > 0) {
      return `${displayYears} ${displayYears === 1 ? 'year' : 'years'} ${displayMonths} ${displayMonths === 1 ? 'month' : 'months'}`;
    } else if (displayYears > 0) {
      return `${displayYears} ${displayYears === 1 ? 'year' : 'years'}`;
    } else if (displayMonths > 0) {
      return `${displayMonths} ${displayMonths === 1 ? 'month' : 'months'}`;
    }
    return 'Less than a month';
  }, [startDate, endDate]);
};
