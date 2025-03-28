import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

interface EducationProps {
  education: ResumeSchema['education'];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  const educationWithIds = React.useMemo(() => {
    return (
      education?.map(item => ({
        ...item,
        _id: crypto.randomUUID(),
        courses: item.courses,
      })) || []
    );
  }, [education]);

  if (!educationWithIds.length) return null;

  return (
    <TimelineSection title="Education">
      {educationWithIds.map(edu => (
        <TimelineEntry key={edu._id} startDate={edu.startDate} endDate={edu.endDate}>
          <SectionCard
            title={edu.studyType || edu.area}
            subtitle={edu.institution}
            keywords={edu.courses}
            summary={edu.score ? `GPA: ${edu.score}` : undefined}
          />
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
