import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from './ui/SectionTitle';
import { useDate } from '../lib/hooks/useDate';
import { SidebarCard } from './ui/SidebarCard';

interface PublicationsProps {
  publications: NonNullable<ResumeSchema['publications']>;
}

export const Publications: FC<PublicationsProps> = memo(({ publications }) => {
  const { t } = useTranslation();

  if (!publications?.length) {
    return null;
  }

  return (
    <section className="mb-6">
      <SectionTitle title="sections.publications" />
      <div className="space-y-2">
        {publications.map((publication, index) => {
          const formattedDate = useDate(publication.releaseDate);

          return (
            <SidebarCard
              key={index}
              title={publication.name}
              subtitle={publication.publisher}
              date={formattedDate}
              url={publication.url || undefined}
              urlLabel={t('common.viewPublication')}
              content={publication.summary}
            />
          );
        })}
      </div>
    </section>
  );
});
