import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';

type Language = NonNullable<ResumeSchema['languages']>[number];

interface LanguageItemProps {
  language: Language;
  index: number;
}

const LanguageItem = memo<LanguageItemProps>(({ language, index }) => (
  <SectionCard key={`language-${index}`} title={language.language} subtitle={language.fluency} />
));

interface LanguagesProps {
  languages?: Language[];
}

export const Languages: FC<LanguagesProps> = ({ languages }) => {
  if (!languages?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {languages.map((item, index) => (
          <LanguageItem key={`language-${index}`} language={item} index={index} />
        ))}
      </div>
    </div>
  );
};
