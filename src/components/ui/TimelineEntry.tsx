import React, { ReactNode } from 'react';
import { useDate, useDuration, useDateRange } from '../../lib/hooks/useDate';

interface TimelineEntryProps {
  startDate?: string;
  endDate?: string;
  children: ReactNode;
  singleDate?: boolean;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  startDate,
  endDate,
  children,
  singleDate = false,
}) => {
  const formattedDate = useDate(startDate);
  const dateRange = useDateRange(startDate, endDate);
  const duration = useDuration(startDate, endDate);

  const dateDisplay = singleDate ? formattedDate : dateRange;

  return (
    <div className="mb-4 print:m-0 print:py-2 print:border-b print:border-color" role="article">
      {startDate && (
        <div className="mb-2 text-sm print:mb-1 print:text-[9px]">
          <div className="flex items-center">
            <span className="font-medium text-foreground" role="time">
              {dateDisplay}
            </span>
            {!singleDate && duration && (
              <span
                className="ml-2 text-sm text-foreground-tertiary print:ml-1"
                role="time"
                aria-label={`Duration: ${duration}`}
              >
                ({duration})
              </span>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
