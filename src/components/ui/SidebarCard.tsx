import { FC, ReactNode, memo } from 'react';
import { cn } from '../../lib/utils';
import { Markdown } from './Markdown';
import { spacing, colors, borders, typography } from '../../lib/styleTokens';

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
  id?: string;
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
    id,
  }) => {
    // Generate a unique ID for ARIA relationships if not provided
    const cardId = id || `sidebar-card-${Math.random().toString(36).substr(2, 9)}`;
    const titleId = `${cardId}-title`;
    const subtitleId = `${cardId}-subtitle`;
    const contentId = `${cardId}-content`;

    return (
      <div
        className={cn(
          `${spacing.card.margin.sidebar} ${spacing.card.padding.sidebar} ${colors.bg.highlight} ${borders.radius.default} ${borders.width.left} ${borders.color.brand} ${spacing.card.padding.print}`,
          'print:border-l-0 print:pl-0 print:pt-0 print:pb-1',
          className
        )}
        role="region"
        id={cardId}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={content ? contentId : undefined}
      >
        {title && (
          <h3
            id={titleId}
            className={cn(
              `${typography.size.base} ${typography.weight.medium} ${typography.color.primary} ${typography.size.print.sm}`,
              titleClassName
            )}
          >
            {title}
          </h3>
        )}

        {subtitle && (
          <div
            id={subtitleId}
            className={cn(
              `${typography.size.sm} ${typography.color.secondary} ${typography.size.print.sm}`,
              subtitleClassName
            )}
          >
            {subtitle}
          </div>
        )}

        <div
          className={`flex flex-wrap ${spacing.card.gap.default} mt-0.5 ${typography.size.sm} print:mt-0.5 print:gap-1 ${typography.size.print.sm}`}
        >
          {date && (
            <span className={typography.color.tertiary} role="time">
              {date}
            </span>
          )}

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${typography.color.brand} hover:underline`}
              aria-label={`${urlLabel || 'View'} (opens in a new tab)`}
            >
              {urlLabel || 'View'}
            </a>
          )}
        </div>

        {content && (
          <div
            id={contentId}
            className={`mt-1 ${typography.size.sm} ${typography.color.secondary} ${typography.size.print.sm} print:mt-0.5`}
            role="contentinfo"
          >
            <Markdown content={content} />
          </div>
        )}

        {children && <div className="mt-1.5 print:mt-0.5">{children}</div>}
      </div>
    );
  }
);
