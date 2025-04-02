import { FC } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SidebarCard } from './ui/SidebarCard';
import { SidebarSection } from './ui/SidebarSection';

type Reference = NonNullable<ResumeSchema['references']>[number];

interface ReferencesProps {
  references?: Reference[];
}

export const References: FC<ReferencesProps> = ({ references }) => {
  if (!references?.length) {
    return null;
  }

  return (
    <SidebarSection title="sections.references">
      {references.map((reference, index) => (
        <SidebarCard key={index} title={reference.name} content={reference.reference} />
      ))}
    </SidebarSection>
  );
};
