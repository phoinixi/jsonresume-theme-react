import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

type Work = NonNullable<ResumeSchema['work']>[number] & {
  keywords?: string[];
};

interface WorkExperienceProps {
  work: Work[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ work }) => {
  const workWithIds = React.useMemo(() => {
    return (
      work?.map(item => ({
        ...item,
        _id: crypto.randomUUID(),
        highlights: item.highlights,
      })) || []
    );
  }, [work]);

  if (!workWithIds.length) return null;

  return (
    <TimelineSection title="Work Experience">
      {workWithIds.map(workItem => (
        <TimelineEntry key={workItem._id} startDate={workItem.startDate} endDate={workItem.endDate}>
          <SectionCard
            title={workItem.position}
            subtitle={workItem.name}
            location={workItem.location}
            highlights={workItem.highlights}
            keywords={workItem.keywords}
            summary={workItem.summary}
          />
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
