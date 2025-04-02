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
    <section className={cn('mb-6', className)}>
      <SectionTitle title={title} />
      <div className={cn('space-y-2', contentClassName)}>{children}</div>
    </section>
  );
};
