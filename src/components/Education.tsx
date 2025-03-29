import { FC } from 'react';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';
import { SectionCard } from './ui/SectionCard';
import type { ResumeSchema } from '../types/resumeSchema';

type Education = NonNullable<ResumeSchema['education']>[number] & {
  location?: string;
};

interface EducationProps {
  education: Education[];
}

export const Education: FC<EducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <TimelineSection title="Education">
      {education.map((edu, index) => {
        const title = edu.studyType || edu.area || '';
        const institution = edu.institution || '';
        return (
          <TimelineEntry key={`education-${index}`} startDate={edu.startDate} endDate={edu.endDate}>
            <SectionCard
              title={title}
              subtitle={institution}
              subtitleUrl={edu.url}
              location={edu.location}
              summary={edu.score ? `GPA: ${edu.score}` : undefined}
              keywords={edu.courses || []}
            />
          </TimelineEntry>
        );
      })}
    </TimelineSection>
  );
};
