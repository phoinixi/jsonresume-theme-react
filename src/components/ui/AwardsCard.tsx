import React, { memo } from 'react';
import type { ResumeSchema } from '../../types/resumeSchema';
import { BsStarFill } from 'react-icons/bs';
import { SectionCard } from './SectionCard';
import { Markdown } from './Markdown';
import { useDate } from '../../lib/hooks/useDate';
import { useTranslation } from 'react-i18next';

type Award = NonNullable<ResumeSchema['awards']>[number];

interface AwardItemProps {
  award: Award;
  index: number;
}

const AwardItem = memo<AwardItemProps>(({ award, index }) => {
  const formattedDate = useDate(award.date);
  const { t } = useTranslation();

  return (
    <div key={`award-${index}`} className="p-3 bg-white bg-opacity-5 border-l-2 border-brand">
      <div className="flex items-start">
        <div className="mr-3 text-brand">
          <BsStarFill className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{(award.title as string) || ''}</h3>

          <div className="mt-1 text-sm text-foreground-secondary">
            {award.awarder && (
              <div className="mb-1">
                {t('common.awardedBy')}: {award.awarder}
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {award.date && (
                <span>
                  {t('date.label')}: {formattedDate}
                </span>
              )}
            </div>
          </div>

          {award.summary && (
            <div className="mt-2 text-sm text-foreground-secondary">
              <Markdown content={award.summary as string} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

interface AwardsCardProps {
  awards: NonNullable<ResumeSchema['awards']>;
}

export const AwardsCard = memo<AwardsCardProps>(({ awards }) => {
  const { t } = useTranslation();

  if (!awards?.length) {
    return null;
  }

  return (
    <SectionCard title={t('sections.awards')}>
      <div className="space-y-3">
        {awards.map((award, index) => (
          <AwardItem key={index} award={award} index={index} />
        ))}
      </div>
    </SectionCard>
  );
});
