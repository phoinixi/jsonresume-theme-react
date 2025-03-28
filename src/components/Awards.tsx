import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { formatDate } from '../lib/utils';
import { BsStarFill } from 'react-icons/bs';
import { Markdown } from './ui/Markdown';

interface AwardsProps {
  awards: ResumeSchema['awards'];
}

export const Awards: React.FC<AwardsProps> = ({ awards }) => {
  const awardsWithIds = React.useMemo(() => {
    return (
      awards?.map(award => ({
        ...award,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [awards]);

  if (!awardsWithIds.length) return null;

  return (
    <section className="mb-6">
      <SectionTitle title="Awards" />
      <div className="space-y-3">
        {awardsWithIds.map(award => (
          <div key={award._id} className="p-3 bg-white bg-opacity-5 border-l-2 border-brand">
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

                  {award.date && (
                    <p className="mt-1 text-sm text-foreground-tertiary">
                      {formatDate(award.date)}
                    </p>
                  )}

                  {award.summary && (
                    <div className="mt-2 text-sm text-foreground-secondary">
                      <Markdown content={award.summary} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
