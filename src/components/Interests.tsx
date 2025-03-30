import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

type Interest = NonNullable<ResumeSchema['interests']>[number];

interface InterestItemProps {
  interest: Interest;
  index: number;
}

const InterestItem = memo<InterestItemProps>(({ interest, index }) => (
  <Tag key={`interest-${index}`}>{interest.name}</Tag>
));

interface InterestsProps {
  interests?: Interest[];
}

export const Interests: FC<InterestsProps> = ({ interests }) => {
  if (!interests?.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="sections.interests" />
      <TagList>
        {interests.map((item, index) => (
          <InterestItem key={`interest-${index}`} interest={item} index={index} />
        ))}
      </TagList>
    </section>
  );
};
