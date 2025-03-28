import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';

interface LanguagesProps {
  languages: ResumeSchema['languages'];
}

export const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  // Generate UUIDs for languages only once
  const languagesWithIds = React.useMemo(() => {
    return (
      languages?.map(language => ({
        ...language,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [languages]);

  if (!languagesWithIds.length) return null;

  return (
    <section className="mb-4">
      <SectionTitle title="Languages" />
      <div className="grid grid-cols-2">
        {languagesWithIds.map(language => (
          <div key={language._id}>
            <h3 className="text-base font-medium text-foreground">{language.language}</h3>
            {language.fluency && (
              <p className="text-sm text-foreground-tertiary">{language.fluency}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
