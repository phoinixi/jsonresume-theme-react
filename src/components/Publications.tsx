import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';
import { SectionCard } from './ui/SectionCard';

type Publication = NonNullable<ResumeSchema['publications']>[number];

interface PublicationItemProps {
  publication: Publication;
  index: number;
}

const PublicationItem = memo<PublicationItemProps>(({ publication, index }) => (
  <TimelineEntry key={`publication-${index}`} startDate={publication.releaseDate}>
    <SectionCard
      title={publication.name}
      subtitle={publication.publisher}
      highlights={publication.highlights as string[] | undefined}
      summary={publication.summary}
    >
      {publication.url && (
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand hover:underline"
        >
          View Publication
        </a>
      )}
    </SectionCard>
  </TimelineEntry>
));

interface PublicationsProps {
  publications?: Publication[];
}

export const Publications: FC<PublicationsProps> = ({ publications }) => {
  if (!publications?.length) return null;

  return (
    <TimelineSection title="Publications">
      {publications.map((item, index) => (
        <PublicationItem key={`publication-${index}`} publication={item} index={index} />
      ))}
    </TimelineSection>
  );
};
