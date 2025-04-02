import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { SidebarCard } from './ui/SidebarCard';

type Reference = NonNullable<ResumeSchema['references']>[number];

interface ReferencesProps {
  references?: Reference[];
}

export const References: FC<ReferencesProps> = ({ references }) => {
  if (!references?.length) {
    return null;
  }

  return (
    <section className="mb-6">
      <SectionTitle title="sections.references" />
      <div className="space-y-2">
        {references.map((reference, index) => (
          <SidebarCard key={index} title={reference.name} content={reference.reference} />
        ))}
      </div>
    </section>
  );
};
