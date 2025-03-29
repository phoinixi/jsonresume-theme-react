import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { SectionCard } from './ui/SectionCard';

interface ReferencesProps {
  references: ResumeSchema['references'];
}

export const References: React.FC<ReferencesProps> = ({ references }) => {
  if (!references?.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="References" />
      {references.map((reference, index) => (
        <SectionCard
          key={`reference-${index}`}
          title={reference.name}
          summary={reference.reference}
        />
      ))}
    </section>
  );
};
