import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { SectionCard } from './ui/SectionCard';

type Reference = NonNullable<ResumeSchema['references']>[number];

interface ReferenceItemProps {
  reference: Reference;
  index: number;
}

const ReferenceItem = memo<ReferenceItemProps>(({ reference, index }) => (
  <SectionCard key={`reference-${index}`} title={reference.name} summary={reference.reference} />
));

interface ReferencesProps {
  references?: Reference[];
}

export const References: FC<ReferencesProps> = ({ references }) => {
  if (!references?.length) return null;

  return (
    <section className="mb-8">
      <SectionTitle title="References" />
      {references.map((item, index) => (
        <ReferenceItem key={`reference-${index}`} reference={item} index={index} />
      ))}
    </section>
  );
};
