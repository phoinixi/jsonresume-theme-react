import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

interface PublicationsProps {
  publications: ResumeSchema['publications'];
}

export const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  // Generate UUIDs for publications only once
  const publicationsWithIds = React.useMemo(() => {
    return (
      publications?.map(publication => ({
        ...publication,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [publications]);

  if (!publicationsWithIds.length) return null;

  return (
    <TimelineSection title="Publications">
      {publicationsWithIds.map(publication => (
        <TimelineEntry key={publication._id} startDate={publication.releaseDate} dotColor="brand">
          <SectionCard
            title={publication.name}
            subtitle={publication.publisher}
            summary={publication.summary}
          >
            {publication.url && (
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-brand hover:underline"
              >
                View Publication
              </a>
            )}
          </SectionCard>
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
