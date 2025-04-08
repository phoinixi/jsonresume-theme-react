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
}

export const SidebarSection: FC<SidebarSectionProps> = ({
  title,
  children,
  className,
  contentClassName,
  id,
}) => {
  const sectionId = id || `section-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${sectionId}-title`;

  return (
    <section
      className={cn(spacing.section.margin.default, spacing.section.margin.print, className)}
      id={sectionId}
      aria-labelledby={titleId}
    >
      <SectionTitle title={title} id={titleId} />
      <div
        className={cn(
          spacing.section.item.default,
          spacing.section.item.print,
          spacing.section.item.mobile,
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
