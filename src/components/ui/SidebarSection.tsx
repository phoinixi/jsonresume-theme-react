import { FC, ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';
import { cn } from '../../lib/utils';
import { spacing } from '../../lib/styleTokens';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  disableDefaultSpacing?: boolean;
}

export const SidebarSection: FC<SidebarSectionProps> = ({
  title,
  children,
  className,
  contentClassName,
  id,
  disableDefaultSpacing = false,
}) => {
  const sectionId = id || `section-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${sectionId}-title`;

  // Determine if we should apply default spacing
  // If contentClassName includes "grid", we don't want to apply spacing utilities
  const hasGrid = contentClassName?.includes('grid');
  const shouldDisableDefaultSpacing = disableDefaultSpacing || hasGrid;

  return (
    <section
      className={cn(spacing.section.margin.default, spacing.section.margin.print, className)}
      id={sectionId}
      aria-labelledby={titleId}
    >
      <SectionTitle title={title} id={titleId} />
      <div
        className={cn(
          // Only apply spacing utilities if not disabled
          !shouldDisableDefaultSpacing && spacing.section.item.default,
          !shouldDisableDefaultSpacing && spacing.section.item.print,
          !shouldDisableDefaultSpacing && spacing.section.item.mobile,
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
