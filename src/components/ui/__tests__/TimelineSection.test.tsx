import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';

import { TimelineSection } from '../TimelineSection';

// Mock SectionTitle to simplify testing or verify props passed to it
vi.mock('../SectionTitle', () => ({
  SectionTitle: ({ title }: { title: string }) => <h2 data-testid="mock-section-title">{title}</h2>,
}));

const renderWithI18n = (ui: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe('TimelineSection Component', () => {
  beforeEach(async () => {
    await i18n.init();
    await i18n.loadNamespaces('translation');
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the title correctly using the title prop', () => {
    const title = 'Work Experience';
    renderWithI18n(
      <TimelineSection title={title}>
        <div>Child Content</div>
      </TimelineSection>
    );

    // Check if the mocked SectionTitle receives the correct title prop
    // and renders the h2 (or our mock)
    const heading = screen.getByRole('heading', { level: 2, name: title });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
    // You could also check if the mock component was called with the right props
    // expect(SectionTitle).toHaveBeenCalledWith({ title }, expect.anything());
  });

  it('renders children correctly', () => {
    const childText = 'This is the content inside the section.';
    renderWithI18n(
      <TimelineSection title="Test Section">
        <p>{childText}</p>
      </TimelineSection>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  // Removed className test as it's not a valid prop

  // Removed test for missing title as `title` is a required prop
});
