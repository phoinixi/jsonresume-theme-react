import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

interface VolunteerProps {
  volunteer: ResumeSchema['volunteer'];
}

export const Volunteer: React.FC<VolunteerProps> = ({ volunteer }) => {
  if (!volunteer?.length) return null;

  return (
    <TimelineSection title="Volunteer">
      {volunteer.map((item, index) => (
        <TimelineEntry key={`volunteer-${index}`} startDate={item.startDate} endDate={item.endDate}>
          <SectionCard
            title={item.position}
            subtitle={item.organization}
            highlights={item.highlights}
            summary={item.summary}
          >
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:underline"
              >
                Visit Website
              </a>
            )}
          </SectionCard>
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
