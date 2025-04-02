import { FC, ReactNode, memo } from 'react';
import { cn } from '../../lib/utils';
import { Markdown } from './Markdown';

interface SidebarCardProps {
  title?: ReactNode;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  date?: string;
  url?: string;
  urlLabel?: string;
  content?: string;
  children?: ReactNode;
  className?: string;
}

export const SidebarCard: FC<SidebarCardProps> = memo(
  ({
    title,
    titleClassName,
    subtitle,
    subtitleClassName,
    date,
    url,
    urlLabel,
    content,
    children,
    className,
  }) => {
    return (
      <div
        className={cn(
          'mb-2 p-2 bg-white bg-opacity-5 rounded-md border-l-2 border-brand print:p-1.5 print:mb-1.5',
          className
        )}
      >
        {title && (
          <h3 className={cn('text-base font-medium text-foreground print:text-xs', titleClassName)}>
            {title}
          </h3>
        )}

        {subtitle && (
          <div
            className={cn(
              'text-sm text-foreground-secondary print:text-[0.65rem]',
              subtitleClassName
            )}
          >
            {subtitle}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-0.5 text-sm print:mt-0.5 print:gap-1.5 print:text-[0.65rem]">
          {date && <span className="text-foreground-tertiary">{date}</span>}

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              {urlLabel || 'View'}
            </a>
          )}
        </div>

        {content && (
          <div className="mt-1 text-sm text-foreground-secondary print:text-[0.65rem]">
            <Markdown content={content} />
          </div>
        )}

        {children && <div className="mt-1.5 print:mt-1">{children}</div>}
      </div>
    );
  }
);
