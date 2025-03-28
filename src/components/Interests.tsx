import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

interface InterestsProps {
  interests: ResumeSchema['interests'];
}

export const Interests: React.FC<InterestsProps> = ({ interests }) => {
  // Generate UUIDs for interests and keywords only once
  const interestsWithIds = React.useMemo(() => {
    return (
      interests?.map(interest => ({
        ...interest,
        _id: crypto.randomUUID(),
        keywords: interest.keywords?.map(keyword => ({
          text: keyword,
          _id: crypto.randomUUID(),
        })),
      })) || []
    );
  }, [interests]);

  if (!interestsWithIds.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="Interests" />
      <TagList>
        {interestsWithIds.map(interest => (
          <Tag key={interest._id}>
            {interest.name}
            {interest.keywords && interest.keywords.length > 0 && (
              <span className="ml-1 text-foreground-muted">
                ({interest.keywords.map(k => k.text).join(', ')})
              </span>
            )}
          </Tag>
        ))}
      </TagList>
    </section>
  );
};
