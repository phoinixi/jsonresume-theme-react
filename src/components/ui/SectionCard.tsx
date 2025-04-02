import { FC, ReactNode, memo } from 'react';
import { cn } from '../../lib/utils';
import { TagList } from './TagList';
import { Tag } from './Tag';
import { getContactIcon } from '../../lib/socialIcons';
import { Markdown } from './Markdown';
import { Subtitle } from './Subtitle';

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  subtitleUrl?: string;
  date?: string;
  location?: string;
  summary?: string;
  keywords?: string[];
  highlights?: string[];
  children?: ReactNode;
  className?: string;
}

export const SectionCard: FC<SectionCardProps> = memo(
  ({
    title,
    subtitle,
    subtitleUrl,
    date,
    location,
    summary,
    keywords,
    highlights,
    children,
    className,
  }) => {
    const { icon: LocationIcon, color: locationColor } = getContactIcon('location');

    return (
      <div
        className={cn(
          'p-4 mb-3 rounded-lg border border-transparent transition-shadow bg-color-secondary hover:shadow-sm hover:border-color print:bg-transparent print:p-0 print:m-0 print:mb-2 print:hover:border-transparent print:hover:shadow-none',
          className
        )}
        role="article"
        aria-labelledby={
          title ? `section-title-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined
        }
      >
        <div className="flex flex-col gap-1.5 print:gap-0.5">
          {title && (
            <div className="flex justify-between items-start">
              <h3
                id={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-lg font-medium text-foreground print:text-[11px]"
              >
                <Subtitle title={title} subtitle={subtitle} subtitleUrl={subtitleUrl} />
              </h3>
              {date && (
                <div
                  className="text-sm whitespace-nowrap text-foreground-tertiary print:text-[8px]"
                  role="time"
                  aria-label={`Date: ${date}`}
                >
                  {date}
                </div>
              )}
            </div>
          )}
          {location && (
            <div
              className="flex gap-1.5 items-center text-sm text-foreground-tertiary print:gap-1 print:text-[8px]"
              role="contentinfo"
              aria-label="Location"
            >
              <LocationIcon
                style={{ color: locationColor }}
                className="w-3.5 h-3.5 print:hidden"
                aria-hidden="true"
              />
              {location}
            </div>
          )}

          {keywords && keywords.length > 0 && (
            <TagList className="mt-1.5 print:mt-1">
              {keywords.map((keyword, index) => (
                <Tag key={`keyword-${index}`}>{keyword}</Tag>
              ))}
            </TagList>
          )}

          {summary && (
            <div
              className="mt-1 leading-snug text-base text-foreground-secondary print:mt-0.5 print:text-[9px]"
              role="contentinfo"
              aria-label="Summary"
            >
              <Markdown content={summary} />
            </div>
          )}
          {highlights && highlights.length > 0 && (
            <ul
              className="mt-1.5 space-y-1 list-disc list-outside ml-4 text-base text-foreground-secondary print:mt-0.5 print:space-y-0.5 print:ml-8 print:text-[8px]"
              role="list"
              aria-label="Highlights"
            >
              {highlights.map((highlight, index) => (
                <li key={`highlight-${index}`} className="print:mb-0" role="listitem">
                  <Markdown content={highlight} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {children && <div className="mt-2 print:mt-0.5">{children}</div>}
      </div>
    );
  }
);
