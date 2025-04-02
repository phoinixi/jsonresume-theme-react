import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { BsStarFill } from 'react-icons/bs';
import { useDate } from '../lib/hooks/useDate';
import { useTranslation } from 'react-i18next';
import { SidebarCard } from './ui/SidebarCard';

type Award = NonNullable<ResumeSchema['awards']>[number];

interface AwardsProps {
  awards?: Award[];
}

export const Awards: React.FC<AwardsProps> = ({ awards }) => {
  if (!awards?.length) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <section className="mb-6">
      <SectionTitle title="sections.awards" />
      <div className="space-y-2">
        {awards.map((award, index) => {
          const formattedDate = useDate(award.date);
          const dateInfo = award.date ? `${t('date.label')}: ${formattedDate}` : '';
          const hasValidUrl = 'url' in award && typeof (award as any).url === 'string';

          return (
            <SidebarCard
              key={index}
              title={
                <div className="flex items-start">
                  <div className="mr-3 text-brand">
                    <BsStarFill className="w-5 h-5" />
                  </div>
                  <div>{award.title}</div>
                </div>
              }
              subtitle={award.awarder ? `${t('common.awardedBy')}: ${award.awarder}` : undefined}
              date={dateInfo}
              url={hasValidUrl ? (award as any).url : undefined}
              urlLabel={t('common.viewAward')}
              content={award.summary as string}
            />
          );
        })}
      </div>
    </section>
  );
};
