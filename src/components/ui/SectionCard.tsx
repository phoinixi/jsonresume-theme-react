import { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { TagList } from './TagList';
import { Tag } from './Tag';
import { getContactIcon } from '../../lib/socialIcons';
import { Markdown } from './Markdown';
import { Subtitle } from './Subtitle';

interface SectionCardProps {
  title?: string;
  subtitle?: ReactNode;
  subtitleUrl?: string;
  date?: string;
  location?: string;
  summary?: string;
  keywords?: string[];
  highlights?: string[];
  children?: ReactNode;
  className?: string;
}

export const SectionCard: FC<SectionCardProps> = ({
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
        'p-5 mb-5 rounded-lg border border-transparent transition-shadow bg-color-secondary hover:shadow-sm hover:border-color print:mb-0 print:bg-transparent print:p-0 print:m-0 print:hover:border-transparent print:hover:shadow-none',
        className
      )}
    >
      <div className="flex flex-col gap-2 print:gap-1">
        {title && (
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-foreground print:text-[12px]">
              <Subtitle title={title} subtitle={subtitle} subtitleUrl={subtitleUrl} />
            </h3>
            {date && (
              <div className="text-sm whitespace-nowrap text-foreground-tertiary print:text-[9px]">
                {date}
              </div>
            )}
          </div>
        )}
        {location && (
          <div className="flex gap-2 items-center text-sm text-foreground-tertiary print:gap-1 print:text-[9px]">
            <LocationIcon style={{ color: locationColor }} className="w-4 h-4 print:hidden" />
            {location}
          </div>
        )}

        {keywords && keywords.length > 0 && (
          <TagList>
            {keywords.map(keyword => (
              <Tag key={crypto.randomUUID()}>{keyword}</Tag>
            ))}
          </TagList>
        )}

        {summary && (
          <div className="mt-1 leading-snug text-foreground-secondary print:mt-0.5">
            <Markdown content={summary} />
          </div>
        )}
        {highlights && highlights.length > 0 && (
          <ul className="mt-2 space-y-1.5 list-disc list-outside ml-5 text-foreground-secondary print:mt-1 print:space-y-1 print:ml-10">
            {highlights.map(highlight => (
              <li key={crypto.randomUUID()} className="print:mb-0.5">
                <Markdown content={highlight} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {children && <div className="mt-3 print:mt-1">{children}</div>}
    </div>
  );
};
