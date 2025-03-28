import { FC } from 'react';
import { SectionTitle } from './ui/SectionTitle';
import { SectionCard } from './ui/SectionCard';

interface SummaryProps {
  summary: string;
}

export const Summary: FC<SummaryProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <>
      <SectionTitle title="About" />
      <SectionCard summary={summary} />
    </>
  );
};
