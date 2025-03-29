import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';
import { SectionCard } from './ui/SectionCard';

type Volunteer = NonNullable<ResumeSchema['volunteer']>[number];

interface VolunteerItemProps {
  volunteer: Volunteer;
  index: number;
}

const VolunteerItem = memo<VolunteerItemProps>(({ volunteer, index }) => (
  <TimelineEntry
    key={`volunteer-${index}`}
    startDate={volunteer.startDate}
    endDate={volunteer.endDate}
  >
    <SectionCard
      title={volunteer.position}
      subtitle={volunteer.organization}
      highlights={volunteer.highlights}
      summary={volunteer.summary}
    >
      {volunteer.url && (
        <a
          href={volunteer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand hover:underline"
        >
          Visit Website
        </a>
      )}
    </SectionCard>
  </TimelineEntry>
));

interface VolunteerProps {
  volunteer?: Volunteer[];
}

export const Volunteer: FC<VolunteerProps> = ({ volunteer }) => {
  if (!volunteer?.length) return null;

  return (
    <TimelineSection title="Volunteer">
      {volunteer.map((item, index) => (
        <VolunteerItem key={`volunteer-${index}`} volunteer={item} index={index} />
      ))}
    </TimelineSection>
  );
};
