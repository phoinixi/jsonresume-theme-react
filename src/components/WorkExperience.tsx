import { FC } from 'react';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
import { SectionCard } from './ui/SectionCard';
import type { ResumeSchema } from '../types/resumeSchema';

type Work = NonNullable<ResumeSchema['work']>[number] & {
  keywords?: string[];
};

interface WorkExperienceProps {
  work?: Work[];
}

export const WorkExperience: FC<WorkExperienceProps> = ({ work }) => {
  if (!work || work.length === 0) return null;

  return (
    <TimelineSection title="sections.work">
      {work.map((workItem, index) => (
        <TimelineEntry
          key={`work-${index}`}
          startDate={workItem.startDate}
          endDate={workItem.endDate}
        >
          <SectionCard
            title={workItem.position}
            subtitle={workItem.name}
            url={workItem.url}
            location={workItem.location}
            summary={workItem.summary}
            highlights={workItem.highlights}
            tags={workItem.keywords}
          />
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
