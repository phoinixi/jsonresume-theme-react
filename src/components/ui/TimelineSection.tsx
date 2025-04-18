import React, { ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';

interface TimelineSectionProps {
  title: string;
  children: ReactNode;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ title, children }) => {
  return (
    <section
      className="my-2 print:m-0 print:mb-4"
      role="region"
      aria-labelledby={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <SectionTitle title={title} />
      <div className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
        {children}
      </div>
    </section>
  );
};
