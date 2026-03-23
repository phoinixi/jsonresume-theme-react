import { FC, ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { spacing, colors, borders, typography } from '../../lib/styleTokens';
import { TagList } from './TagList';
import { Tag } from './Tag';
import { getContactIcon } from '../../lib/socialIcons';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Markdown } from './Markdown';

interface SectionCardProps {
  title?: string;
  subtitle?: string | ReactNode;
  url?: string;
  location?: string;
  date?: string;
  tags?: string[];
  highlightTitle?: string;
  highlights?: string[];
  summary?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  actionUrl?: string;
  actionLabelKey?: string;
  addonAfterTitle?: ReactNode; // new slot for inline elements (e.g., growth badge)
}

export const SectionCard: FC<SectionCardProps> = memo(
  ({
    title,
    subtitle,
    url,
    location,
    date,
    tags,
    highlightTitle,
    highlights,
    summary,
    children,
    className,
    id,
    actionUrl,
    actionLabelKey,
    addonAfterTitle,
  }) => {
    const { t } = useTranslation();
    const { icon: LocationIcon, color: locationColor } = getContactIcon('location');

    const cardId = id ? `card-${id}` : undefined;
    const titleId = title ? `title-${cardId}` : undefined;
    const summaryId = summary ? `summary-${cardId}` : undefined;
    const highlightsId = highlights?.length ? `highlights-${cardId}` : undefined;

    return (
      <div
        className={cn(
          `${spacing.card.padding.default} ${borders.radius.lg} ${spacing.card.margin.default} ${colors.bg.card}`,
          'border border-transparent transition-shadow hover:shadow-sm hover:border-color',
          'print:bg-transparent print:hover:border-transparent print:hover:shadow-none print:p-0',
          className
        )}
        role="article"
        id={cardId}
        aria-labelledby={titleId}
        aria-describedby={[summaryId, highlightsId].filter(Boolean).join(' ') || undefined}
      >
        <div className={`flex flex-col ${spacing.card.gap.default} ${spacing.card.gap.print}`}>
          {title && (
            <div className="flex items-start justify-between gap-2">
              <h3
                id={titleId}
                className={`${typography.weight.medium} ${typography.size.base} flex-1`}
              >
                {title}
                {subtitle && (
                  <span className={typography.color.secondary}>
                    {` ${t('common.at', 'at')} `}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={typography.color.brand + ' hover:underline'}
                      >
                        {subtitle}
                      </a>
                    ) : (
                      subtitle
                    )}
                  </span>
                )}
              </h3>
              {addonAfterTitle && (
                <div className="flex-shrink-0 mt-0.5 print:hidden" aria-hidden="false">
                  {addonAfterTitle}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1 print:gap-0.5">
            {location && (
              <div
                className={`flex items-center ${typography.size.sm} ${typography.color.secondary} ${typography.size.print.sm}`}
              >
                <LocationIcon className="mr-1 w-3 h-3" style={{ color: locationColor }} />
                {location}
              </div>
            )}
            {date && (
              <div
                className={`${typography.size.sm} ${typography.color.secondary} ${typography.size.print.sm}`}
              >
                {location && <span className="mx-1 print:mx-0.5">•</span>}
                {date}
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <TagList className="mt-1">
              {tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </TagList>
          )}

          {summary && (
            <div
              id={summaryId}
              className={`${typography.size.sm} ${typography.color.secondary} ${typography.size.print.sm}`}
            >
              <Markdown content={summary} />
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <div id={highlightsId} className="print:px-4">
              {highlightTitle && (
                <div
                  className={`mb-1 ${typography.size.sm} ${typography.weight.medium} ${typography.size.print.sm} print:mb-0.5`}
                >
                  {highlightTitle}
                </div>
              )}
              <ul
                className={cn(
                  `ml-4 ${typography.size.sm} list-disc ${typography.color.secondary}`,
                  `${typography.size.print.sm} print:ml-4 print:list-disc`
                )}
              >
                {highlights.map((highlight, i) => (
                  <li key={i}>
                    <Markdown content={highlight} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {actionUrl && actionLabelKey && (
            <a
              href={actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-flex items-center ${typography.size.sm} ${typography.color.brand} hover:underline print:hidden`}
            >
              {t(actionLabelKey)}
              <FaExternalLinkAlt className="ml-1.5 h-3 w-3" />
            </a>
          )}

          {children && <div className="mt-2 print:mt-0.5">{children}</div>}
        </div>
      </div>
    );
  }
);
