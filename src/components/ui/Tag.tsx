import { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TagProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'brand' | 'accent' | 'muted';
}

export const Tag: FC<TagProps> = ({ children, className, variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-color-secondary border-color text-foreground-secondary',
    brand: 'bg-brand/10 border-brand/20 text-brand',
    accent: 'bg-accent/10 border-accent/20 text-accent',
    muted: 'bg-border/40 border-color text-foreground-tertiary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-sm rounded-md border print:px-1.5 print:py-0.5 print:text-[9px] print:rounded-sm',
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label={typeof children === 'string' ? children : 'Tag'}
    >
      {children}
    </span>
  );
};
