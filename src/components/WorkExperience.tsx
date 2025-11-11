import { FC } from 'react';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
import { SectionCard } from './ui/SectionCard';
import { useDuration } from '../lib/hooks/useDate';
import type { ResumeSchema } from '../types/resumeSchema';

// Extend the work item with optional custom growth metadata.
// These are non-standard JSONResume additions but harmless to consumers.
type Work = NonNullable<ResumeSchema['work']>[number] & {
  keywords?: string[];
  growth?: {
    label?: string; // e.g., "3 Promotions" or "Rapid Growth"
    level?: number; // 1-5 discrete representation
    percent?: number; // 0-100 percentage bar
  };
};

interface WorkExperienceProps {
  work?: Work[];
}

export const WorkExperience: FC<WorkExperienceProps> = ({ work }) => {
  if (!work || work.length === 0) return null;

  // Group contiguous roles by company name (assuming work is reverse chronological).
  // Each group gets a wrapper with a single GrowthIndicator summarizing progression.
  const groups: { company: string; items: Work[] }[] = [];
  work.forEach((item) => {
    const company = item.name || '';
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.company === company) {
      lastGroup.items.push(item);
    } else {
      groups.push({ company, items: [item] });
    }
  });

  // Small helper subcomponent so we can use hooks without breaking the rules of hooks.
  const GroupHeader: FC<{ company: string; start?: string; end?: string; roles: number }> = ({
    company,
    start,
    end,
    roles,
  }) => {
    const total = useDuration(start, end);
    return (
      <div className="mb-2 flex items-center justify-between text-sm text-foreground-tertiary print:mb-1 print:text-[9px]">
        <span className="font-medium text-foreground">{company}</span>
        <span>
          {total}
          {roles > 1 ? ` • ${roles} roles` : ''}
        </span>
      </div>
    );
  };

  return (
    <TimelineSection title="sections.work">
      {groups.map((group, gi) => {
        const totalRoles = group.items.length;
        // Determine earliest start and latest end across the contiguous group
        const earliestStart = group.items.reduce<string | undefined>((acc, item) => {
          if (!item.startDate) return acc;
          if (!acc) return item.startDate;
          return item.startDate < acc ? item.startDate : acc;
        }, undefined);
        const latestEnd = group.items.reduce<string | undefined>((acc, item) => {
          if (!item.endDate) return acc; // skip open-ended current role
          if (!acc) return item.endDate;
          return item.endDate > acc ? item.endDate : acc;
        }, undefined);

        const showHeader = totalRoles > 1;

        return (
          <div key={`group-${gi}`} className={showHeader ? 'pl-3 border-l-2 border-brand mb-4 print:mb-2' : 'mb-4 print:mb-2'}>
            {showHeader && (
              <GroupHeader company={group.company} start={earliestStart} end={latestEnd} roles={totalRoles} />
            )}
            {group.items.map((workItem, wi) => (
              <TimelineEntry
                key={`work-${gi}-${wi}`}
                startDate={workItem.startDate}
                endDate={workItem.endDate}
              >
                <SectionCard
                  title={workItem.position}
                  subtitle={showHeader ? undefined : workItem.name}
                  url={workItem.url}
                  location={workItem.location}
                  summary={workItem.summary}
                  highlights={workItem.highlights}
                  tags={workItem.keywords}
                />
              </TimelineEntry>
            ))}
          </div>
        );
      })}
    </TimelineSection>
  );
};
