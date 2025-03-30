import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { useTranslation } from 'react-i18next';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';
import { SectionCard } from './ui/SectionCard';

interface PublicationsProps {
  publications: NonNullable<ResumeSchema['publications']>;
}

export const Publications: FC<PublicationsProps> = memo(({ publications }) => {
  const { t } = useTranslation();

  return (
    <TimelineSection title="sections.publications">
      {publications.map((publication, index) => (
        <TimelineEntry key={index} startDate={publication.releaseDate} singleDate={true}>
          <SectionCard
            title={publication.name}
            subtitle={publication.publisher}
            summary={publication.summary}
          >
            {publication.url && (
              <div className="mt-2">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand"
                >
                  {t('common.viewPublication')}
                </a>
              </div>
            )}
          </SectionCard>
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
});
