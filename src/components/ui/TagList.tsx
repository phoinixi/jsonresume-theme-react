import { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TagListProps {
  children: ReactNode;
  className?: string;
  layout?: 'inline' | 'grid';
}

export const TagList: FC<TagListProps> = ({ children, className, layout = 'inline' }) => {
  const layoutClasses = {
    inline: 'flex flex-wrap gap-2',
    grid: 'grid grid-cols-2 sm:grid-cols-3 gap-2',
  };

  return <div className={cn(layoutClasses[layout], className)}>{children}</div>;
};
