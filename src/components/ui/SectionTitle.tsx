import { FC } from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <h2 className="flex items-center pb-0 mb-5 text-sm font-bold tracking-wide uppercase border-b text-brand print:mb-1 print:pb-0.5 print:border-b-0 print:page-break-after-avoid">
      {title}
    </h2>
  );
};
