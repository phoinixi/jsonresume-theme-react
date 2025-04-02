import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';
import { SidebarSection } from './ui/SidebarSection';

interface InterestsProps {
  interests?: ResumeSchema['interests'];
}

export const Interests: FC<InterestsProps> = ({ interests }) => {
  if (!interests?.length) {
    return null;
  }

  return (
    <SidebarSection title="sections.interests" contentClassName="grid grid-cols-2 gap-4">
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
    </SidebarSection>
  );
};
