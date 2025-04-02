import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

interface InterestsProps {
  interests?: ResumeSchema['interests'];
}

export const Interests: FC<InterestsProps> = ({ interests }) => {
  if (!interests?.length) {
    return null;
  }

  return (
    <section className="mb-6">
      <SectionTitle title="sections.interests" />
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest, index) => (
          <div key={`interest-${index}`}>
            <h3 className="text-base font-medium text-foreground">{interest.name}</h3>
            {interest.keywords && interest.keywords.length > 0 && (
              <TagList className="mt-1">
                {interest.keywords.map((keyword, keywordIndex) => (
                  <Tag key={`keyword-${index}-${keywordIndex}`}>{keyword}</Tag>
                ))}
              </TagList>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
