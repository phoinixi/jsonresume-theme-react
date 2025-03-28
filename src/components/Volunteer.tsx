import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

interface VolunteerProps {
  volunteer: ResumeSchema['volunteer'];
}

export const Volunteer: React.FC<VolunteerProps> = ({ volunteer }) => {
  // Generate UUIDs for volunteer experiences only once
  const volunteerWithIds = React.useMemo(() => {
    return (
      volunteer?.map(item => ({
        ...item,
        _id: crypto.randomUUID(),
        // Keep highlights as string[] for SectionCard
        highlights: item.highlights,
      })) || []
    );
  }, [volunteer]);

  if (!volunteerWithIds.length) return null;

  return (
    <TimelineSection title="Volunteer">
      {volunteerWithIds.map(item => (
        <TimelineEntry
          key={item._id}
          startDate={item.startDate}
          endDate={item.endDate}
          dotColor="accent"
        >
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
