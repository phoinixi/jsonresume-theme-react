import { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SubtitleProps {
  title: string;
  subtitle?: ReactNode;
  subtitleUrl?: string;
}

export const Subtitle: FC<SubtitleProps> = ({ title, subtitle, subtitleUrl }) => {
  if (!subtitle) return <>{title}</>;

  const subtitleElement = (
    <span
      className={cn(
        'font-normal',
        subtitleUrl && 'hover:text-brand hover:underline cursor-pointer'
      )}
    >
      {subtitle}
    </span>
  );

  return (
    <>
      {title} <span className="font-normal text-foreground-secondary">at</span>{' '}
      {subtitleUrl ? (
        <a href={subtitleUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
          {subtitleElement}
        </a>
      ) : (
        subtitleElement
      )}
    </>
  );
};
