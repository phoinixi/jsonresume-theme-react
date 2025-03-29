import React, { ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';
import { useDate, useDuration } from '../../lib/hooks/useDate';
import { BsArrowRight } from 'react-icons/bs';

interface TimelineEntryProps {
  startDate?: string;
  endDate?: string;
  children: ReactNode;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ startDate, endDate, children }) => {
  const formattedStartDate = useDate(startDate);
  const formattedEndDate = useDate(endDate);
  const duration = useDuration(startDate, endDate);

  return (
    <div className="mb-8 print:m-0 print:py-4 print:border-b print:border-color" role="article">
      {startDate && (
        <div className="mb-2 text-sm print:mb-1 print:text-[9px]">
          <div className="flex items-center">
            <span
              className="font-medium text-foreground"
              role="time"
              aria-label={`Start date: ${formattedStartDate}`}
            >
              {formattedStartDate}
            </span>
            {(endDate || endDate === null) && (
              <>
                <BsArrowRight
                  className="mx-1 text-foreground-tertiary print:w-2 print:h-2"
                  aria-hidden="true"
                />
                <span
                  className="font-medium text-foreground"
                  role="time"
                  aria-label={`End date: ${endDate ? formattedEndDate : 'Present'}`}
                >
                  {endDate ? formattedEndDate : 'Present'}
                </span>
              </>
            )}

            <span
              className="ml-2 text-sm text-foreground-tertiary print:ml-1"
              role="time"
              aria-label={`Duration: ${duration}`}
            >
              ({duration})
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
    <section
      className="mb-8 print:m-0 print:py-4 print:border-b print:border-color"
      role="region"
      aria-labelledby={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <SectionTitle
        title={title}
        id={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border print:pl-4 print:before:bg-border/50">
        {children}
      </div>
    </section>
  );
};
