import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: FC<SectionTitleProps> = memo(({ title }) => {
  const { t } = useTranslation();

  return (
    <h2 className="pb-2 mb-6 font-bold uppercase border-b-2 text-md text-brand border-brand print:text-lg print:font-semibold print:mb-3">
      {t(title)}
    </h2>
  );
});
