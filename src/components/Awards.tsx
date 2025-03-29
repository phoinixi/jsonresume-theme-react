import React, { memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { BsStarFill } from 'react-icons/bs';
import { Markdown } from './ui/Markdown';
import { useDate } from '../lib/hooks/useDate';

type Award = NonNullable<ResumeSchema['awards']>[number];

interface AwardItemProps {
  award: Award;
  index: number;
}

const AwardItem = memo<AwardItemProps>(({ award, index }) => {
  const formattedDate = useDate(award.date);

  return (
    <div key={`award-${index}`} className="p-3 bg-white bg-opacity-5 border-l-2 border-brand">
      <div className="flex items-start">
        {/* Award Icon */}
        <div className="mr-3 text-brand">
          <BsStarFill className="w-4 h-4" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{award.title}</h3>

          <div className="mt-1 text-sm">
            {award.awarder && (
              <p className="text-foreground-secondary">Awarded by: {award.awarder}</p>
            )}

            {award.date && <p className="mt-1 text-sm text-foreground-tertiary">{formattedDate}</p>}

            {award.summary && (
              <div className="mt-2 text-sm text-foreground-secondary">
                <Markdown content={award.summary} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

interface AwardsProps {
  awards?: Award[];
}

export const Awards: React.FC<AwardsProps> = ({ awards }) => {
  if (!awards?.length) return null;

  return (
    <section className="mb-6">
      <SectionTitle title="Awards" />
      <div className="space-y-3">
        {awards.map((award, index) => (
          <AwardItem key={`award-${index}`} award={award} index={index} />
        ))}
      </div>
    </section>
  );
};
