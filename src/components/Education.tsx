import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
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
    <TimelineSection title="sections.education">
      {education.map((edu, index) => (
        <EducationItem key={`education-${index}`} education={edu} index={index} />
      ))}
    </TimelineSection>
  );
};
