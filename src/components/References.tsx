import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { SectionCard } from './ui/SectionCard';

interface ReferencesProps {
  references: ResumeSchema['references'];
}

export const References: React.FC<ReferencesProps> = ({ references }) => {
  // Generate UUIDs for references
  const referencesWithIds = React.useMemo(() => {
    return (
      references?.map(reference => ({
        ...reference,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [references]);

  if (!referencesWithIds.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="References" />
      {referencesWithIds.map(reference => (
        <SectionCard key={reference._id} title={reference.name} summary={reference.reference} />
      ))}
    </section>
  );
};
