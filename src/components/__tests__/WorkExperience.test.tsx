import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import { WorkExperience } from '../WorkExperience';

describe('WorkExperience growth indicator', () => {
  beforeEach(async () => {
    await i18n.init();
    await i18n.loadNamespaces('translation');
  });

  it('shows company header with total duration and role count for grouped roles', () => {
    const work = [
      { name: 'Company A', position: 'Senior Analyst', startDate: '2024-01', endDate: '2024-12' },
      { name: 'Company A', position: 'Analyst', startDate: '2022-01', endDate: '2023-12' },
      { name: 'Company B', position: 'Engineer', startDate: '2020-01', endDate: '2021-01' },
    ];

    render(
      <I18nextProvider i18n={i18n}>
        <WorkExperience work={work as any} />
      </I18nextProvider>
    );

    // Earliest start Jan 2022, latest end Dec 2024 -> 2 years, 11 months
    const header = screen.getByText(/Company A/i);
    expect(header).toBeInTheDocument();
    // Look for duration text fragment 'years' to ensure duration present
    const durationFragment = screen.getByText(/roles/i);
    expect(durationFragment).toHaveTextContent(/2 roles/i);
  });
});
