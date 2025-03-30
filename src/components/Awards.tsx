import React, { memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { BsStarFill } from 'react-icons/bs';
import { Markdown } from './ui/Markdown';
import { useDate } from '../lib/hooks/useDate';
import { useTranslation } from 'react-i18next';
import { SectionCard } from './ui/SectionCard';

type Award = NonNullable<ResumeSchema['awards']>[number];

interface AwardItemProps {
  award: Award;
  index: number;
}

const AwardItem = memo<AwardItemProps>(({ award, index }) => {
  const formattedDate = useDate(award.date);
  const { t } = useTranslation();

  console.log('Rendering award item:', award);

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
              <p className="text-foreground-secondary">
                {t('common.awardedBy')}: {award.awarder}
              </p>
            )}

            {award.date && <p className="mt-1 text-sm text-foreground-tertiary">{formattedDate}</p>}

            {award.summary && (
              <div className="mt-2 text-sm text-foreground-secondary">
                <Markdown content={award.summary} />
              </div>
            )}

            {typeof award.url === 'string' && award.url && (
              <a
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-brand hover:underline"
              >
                {t('common.viewAward')}
              </a>
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
  console.log('Awards component called with:', awards);

  if (!awards?.length) {
    console.log('No awards found or empty array');
    return null;
  }

  return (
    <section className="mb-6">
      <SectionTitle title="sections.awards" />
      <div className="space-y-3">
        {awards.map((award, index) => (
          <AwardItem key={`award-${index}`} award={award} index={index} />
        ))}
      </div>
    </section>
  );
};

export const AwardsCard: React.FC<AwardsProps> = memo(({ awards }) => {
  console.log('AwardsCard component called with:', awards);

  if (!awards?.length) {
    console.log('No awards found or empty array in AwardsCard');
    return null;
  }

  return (
    <SectionCard title="sections.awards">
      <div className="flex flex-col gap-2">
        {awards.map((award, index) => (
          <AwardItem key={index} award={award} index={index} />
        ))}
      </div>
    </SectionCard>
  );
});
