import { FC } from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <h2 className="flex items-center pb-0 mb-5 text-sm font-bold tracking-wide uppercase border-b text-brand print:m-0 print:p-0 print:border-b-0 print:page-break-after-avoid">
      {title}
    </h2>
  );
};
