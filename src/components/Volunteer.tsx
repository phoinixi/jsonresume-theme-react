import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
import { SectionCard } from './ui/SectionCard';

type Volunteer = NonNullable<ResumeSchema['volunteer']>[number];

interface VolunteerProps {
  volunteer?: Volunteer[];
}

export const Volunteer: FC<VolunteerProps> = ({ volunteer }) => {
  if (!volunteer?.length) return null;

  return (
    <TimelineSection title="sections.volunteer">
      {volunteer.map((volunteerItem, index) => (
        <TimelineEntry
          key={`volunteer-${index}`}
          startDate={volunteerItem.startDate}
          endDate={volunteerItem.endDate}
        >
          <SectionCard
            title={volunteerItem.position}
            subtitle={volunteerItem.organization}
            url={volunteerItem.url}
            highlights={volunteerItem.highlights}
            summary={volunteerItem.summary}
            actionUrl={volunteerItem.url}
            actionLabelKey="common.visitWebsite"
          />
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
