import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
import { SectionCard } from './ui/SectionCard';
import { useTranslation } from 'react-i18next';

type Volunteer = NonNullable<ResumeSchema['volunteer']>[number];

interface VolunteerProps {
  volunteer?: Volunteer[];
}

export const Volunteer: FC<VolunteerProps> = ({ volunteer }) => {
  const { t } = useTranslation();

  if (!volunteer?.length) return null;

  return (
    <TimelineSection title="sections.volunteer">
      {volunteer.map((volunteer, index) => (
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
                {t('common.visitWebsite')}
              </a>
            )}
          </SectionCard>
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
