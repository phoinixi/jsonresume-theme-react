import React, { ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';
import { formatDate } from '../../lib/utils';
import { BsArrowRight } from 'react-icons/bs';

interface TimelineEntryProps {
  startDate?: string;
  endDate?: string;
  dotColor?: string;
  children: ReactNode;
}

function formatDuration(startDate?: string, endDate?: string): string {
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
  } else {
    return 'Less than a month';
  }
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ startDate, endDate, children }) => {
  return (
    <div className="mb-8 print:m-0 print:py-4 print:border-b print:border-color">
      {startDate && (
        <div className="mb-2 text-sm print:mb-1 print:text-[9px]">
          <div className="flex items-center">
            <span className="font-medium text-foreground">{formatDate(startDate)}</span>
            {(endDate || endDate === null) && (
              <>
                <BsArrowRight className="mx-1 text-foreground-tertiary print:w-2 print:h-2" />
                <span className="font-medium text-foreground">
                  {endDate ? formatDate(endDate) : 'Present'}
                </span>
              </>
            )}

            <span className="ml-2 text-sm text-foreground-tertiary print:ml-1">
              ({formatDuration(startDate, endDate)})
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

interface TimelineSectionProps {
  title: string;
  children: ReactNode;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-8 print:mb-4 print:break-inside-auto">
      <SectionTitle title={title} />
      <div className="space-y-2 print:space-y-0">{children}</div>
    </section>
  );
};
