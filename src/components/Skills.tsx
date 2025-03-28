import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { Tag } from './ui/Tag';
import { TagList } from './ui/TagList';

interface SkillsProps {
  skills: ResumeSchema['skills'];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Generate UUIDs for skills and keywords only once
  const skillsWithIds = React.useMemo(() => {
    return (
      skills?.map(skill => ({
        ...skill,
        _id: crypto.randomUUID(),
        keywords: skill.keywords?.map(keyword => ({
          text: keyword,
          _id: crypto.randomUUID(),
        })),
      })) || []
    );
  }, [skills]);

  if (!skillsWithIds.length) return null;

  return (
    <section className="mb-6">
      <SectionTitle title="Skills" />
      <div className="grid grid-cols-2 gap-4">
        {skillsWithIds.map(skill => (
          <div key={skill._id}>
            <h3 className="text-base font-medium text-foreground">{skill.name}</h3>
            {skill.level && <span className="text-sm text-foreground-tertiary">{skill.level}</span>}

            {skill.keywords && skill.keywords.length > 0 && (
              <TagList className="mt-1">
                {skill.keywords.map(keyword => (
                  <Tag key={keyword._id}>{keyword.text}</Tag>
                ))}
              </TagList>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
