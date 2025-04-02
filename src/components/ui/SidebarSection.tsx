import { FC, ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';
import { cn } from '../../lib/utils';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const SidebarSection: FC<SidebarSectionProps> = ({
  title,
  children,
  className,
  contentClassName,
}) => {
  return (
    <section className={cn('mb-4 print:mb-3', className)}>
      <SectionTitle title={title} />
      <div className={cn('space-y-1.5 print:space-y-1', contentClassName)}>{children}</div>
    </section>
  );
};
