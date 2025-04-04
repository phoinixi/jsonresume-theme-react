import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';
import { SectionCard } from './ui/SectionCard';

type Education = NonNullable<ResumeSchema['education']>[number];

interface EducationItemProps {
  education: Education;
  index: number;
}

const EducationItem = memo<EducationItemProps>(({ education, index }) => {
  const title = education.studyType || education.area || '';
  const institution = education.institution || '';

  return (
    <TimelineEntry
      key={`education-${index}`}
      startDate={education.startDate}
      endDate={education.endDate}
    >
      <SectionCard
        title={title}
        subtitle={institution}
        subtitleUrl={education.url}
        location={education.location as string | undefined}
        summary={education.score ? `GPA: ${education.score}` : undefined}
        keywords={education.courses || []}
      />
    </TimelineEntry>
  );
});

interface EducationProps {
  education?: Education[];
}

export const Education: FC<EducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <TimelineSection title="Education">
      {education.map((edu, index) => (
        <EducationItem key={`education-${index}`} education={edu} index={index} />
      ))}
    </TimelineSection>
  );
};
