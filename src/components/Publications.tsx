import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { useTranslation } from 'react-i18next';
import { useDate } from '../lib/hooks/useDate';
import { SidebarCard } from './ui/SidebarCard';
import { SidebarSection } from './ui/SidebarSection';

interface PublicationsProps {
  publications: NonNullable<ResumeSchema['publications']>;
}

export const Publications: FC<PublicationsProps> = memo(({ publications }) => {
  const { t } = useTranslation();

  if (!publications?.length) {
    return null;
  }

  return (
    <SidebarSection title="sections.publications">
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
    </SidebarSection>
  );
});
