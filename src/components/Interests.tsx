import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

interface InterestsProps {
  interests: ResumeSchema['interests'];
}

export const Interests: React.FC<InterestsProps> = ({ interests }) => {
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
          <Tag key={interest._id}>{interest.name}</Tag>
        ))}
      </TagList>
    </section>
  );
};
