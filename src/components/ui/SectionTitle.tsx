import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: FC<SectionTitleProps> = memo(({ title }) => {
  const { t } = useTranslation();

  return (
    <h2 className="flex items-center my-2 font-bold uppercase text-base text-brand print:text-xs print:my-1.5 print:font-semibold">
      <span>{t(title)}</span>
      <span className="flex-grow ml-1 border-b-2 border-brand"></span>
    </h2>
  );
});
