import { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { typography, borders, colors } from '../../lib/styleTokens';

interface TagProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'brand' | 'accent' | 'muted';
}

export const Tag: FC<TagProps> = ({ children, className, variant = 'default' }) => {
  const variantClasses = {
    default: `${colors.bg.tag.default} ${borders.color.default} ${colors.text.secondary}`,
    brand: `${colors.bg.tag.brand} ${colors.border.brand} ${colors.text.brand}`,
    accent: `${colors.bg.tag.accent} ${colors.border.accent} ${colors.text.accent}`,
    muted: `${colors.bg.tag.muted} ${colors.border.muted} ${colors.text.tertiary}`,
  };

  return (
    <span
      className={cn(
        `inline-flex items-center px-2 py-0.5 ${typography.size.sm} ${borders.radius.default} ${borders.width.default} print:px-1 print:py-0 ${typography.size.print.sm} ${borders.radius.print}`,
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
