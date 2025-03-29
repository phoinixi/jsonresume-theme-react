import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

interface InterestsProps {
  interests: ResumeSchema['interests'];
}

export const Interests: React.FC<InterestsProps> = ({ interests }) => {
  if (!interests?.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="Interests" />
      <TagList>
        {interests.map((interest, index) => (
          <Tag key={`interest-${index}`}>{interest.name}</Tag>
        ))}
      </TagList>
    </section>
  );
};
