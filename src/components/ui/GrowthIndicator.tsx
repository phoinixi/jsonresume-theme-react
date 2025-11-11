import { FC } from 'react';
import { cn } from '../../lib/utils';
import { borders, colors, typography } from '../../lib/styleTokens';

interface GrowthIndicatorProps {
  label?: string; // e.g., "Promoted", "Growth: 3 roles"
  level?: number; // optional discrete level (1-5)
  percent?: number; // optional percent (0-100)
  className?: string;
  ariaLabel?: string;
}

// A small, unobtrusive pill to hint at career growth/progression
export const GrowthIndicator: FC<GrowthIndicatorProps> = ({
  label = 'Growth',
  level,
  percent,
  className,
  ariaLabel,
}) => {
  const clampedPercent = typeof percent === 'number' ? Math.max(0, Math.min(100, percent)) : undefined;
  const clampedLevel = typeof level === 'number' ? Math.max(1, Math.min(5, level)) : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5',
        `${typography.size.sm} ${borders.radius.default} ${borders.width.default}`,
        `${colors.bg.tag.brand} ${colors.border.brand} ${colors.text.brand}`,
        'align-middle',
        className
      )}
      role="status"
      aria-label={ariaLabel || label}
    >
      {/* Simple arrow glyph, avoids extra icon deps in tests */}
      <span aria-hidden="true" className="font-bold leading-none">↑</span>
      <span className="leading-none">{label}</span>

      {/* Optional tiny level dots (1-5) */}
      {typeof clampedLevel === 'number' && (
        <span className="ml-1 flex items-center gap-0.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                'w-1.5 h-1.5 rounded-full border',
                i < clampedLevel ? 'bg-brand border-brand' : 'bg-transparent border-brand/40'
              )}
            />
          ))}
        </span>
      )}

      {/* Optional tiny progress bar */}
      {typeof clampedPercent === 'number' && (
        <span className="ml-1 inline-flex items-center w-12 h-1.5 rounded-full bg-brand/10 overflow-hidden" aria-hidden="true">
          <span
            className="h-full bg-brand"
            style={{ width: `${clampedPercent}%` }}
          />
        </span>
      )}
    </span>
  );
};
