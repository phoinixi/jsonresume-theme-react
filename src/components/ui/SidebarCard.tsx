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
          'mb-3 p-3 bg-white bg-opacity-5 rounded-md border-l-2 border-brand',
          className
        )}
      >
        {title && (
          <h3 className={cn('text-base font-medium text-foreground', titleClassName)}>{title}</h3>
        )}

        {subtitle && (
          <div className={cn('text-sm text-foreground-secondary', subtitleClassName)}>
            {subtitle}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-1 text-sm">
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
          <div className="mt-2 text-sm text-foreground-secondary">
            <Markdown content={content} />
          </div>
        )}

        {children && <div className="mt-2">{children}</div>}
      </div>
    );
  }
);
