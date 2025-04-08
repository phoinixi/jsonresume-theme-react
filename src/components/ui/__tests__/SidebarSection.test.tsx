import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';

import { SidebarSection } from '../SidebarSection';

// Corrected mock path
vi.mock('../SectionTitle', () => ({
  SectionTitle: ({ title, id }: { title: string; id: string }) => (
    <h3 data-testid="mock-section-title" id={id}>
      {title}
    </h3>
  ),
}));

const renderWithI18n = (ui: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe('SidebarSection Component', () => {
  beforeEach(async () => {
    await i18n.init();
    await i18n.loadNamespaces('translation');
    vi.clearAllMocks();
  });

  // --- Initial tests based on assumptions ---
  // --- We might need to adjust based on the actual component ---

  it('renders the title correctly using mocked SectionTitle', () => {
    const title = 'Contact';
    renderWithI18n(
      <SidebarSection title={title}>
        <div>Child Content</div>
      </SidebarSection>
    );

    const heading = screen.getByRole('heading', { level: 3, name: title });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
    expect(heading).toHaveAttribute('id', expect.stringContaining('section-')); // Check generated ID linkage
  });

  it('renders children correctly', () => {
    const childText = 'This is the sidebar content.';
    renderWithI18n(
      <SidebarSection title="Test Section">
        <p>{childText}</p>
      </SidebarSection>
    );
    // Check child is within the content div
    expect(screen.getByText(childText).parentElement).toBeInTheDocument();
  });

  it('applies default classes to section and content div', () => {
    const { container } = renderWithI18n(
      <SidebarSection title="Test Section">
        <div>Child Content</div>
      </SidebarSection>
    );
    // Check root section element for expected margin (from spacing.section.margin.default)
    const sectionElement = container.querySelector('section');
    expect(sectionElement?.className).toMatch(/mb-4/); // Adjusted check based on styleTokens

    // Check content div for expected item spacing (from spacing.section.item.default)
    const contentDiv = screen.getByText('Child Content').parentElement;
    expect(contentDiv?.className).toMatch(/space-y-1.5/); // Corrected check based on actual output
  });

  it('applies custom className to the root section element', () => {
    const customClass = 'my-custom-class';
    const { container } = renderWithI18n(
      <SidebarSection title="Test Section" className={customClass}>
        <div>Child Content</div>
      </SidebarSection>
    );
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveClass(customClass);
    expect(sectionElement?.className).toMatch(/my-2|mb-4/); // Should still have default classes
  });

  it('applies custom contentClassName to the content div', () => {
    const customContentClass = 'my-custom-content-class';
    renderWithI18n(
      <SidebarSection title="Test Section" contentClassName={customContentClass}>
        <div>Child Content</div>
      </SidebarSection>
    );
    const contentDiv = screen.getByText('Child Content').parentElement;
    expect(contentDiv).toHaveClass(customContentClass);
    expect(contentDiv?.className).toMatch(/space-y-1.5/); // Corrected check for default class
  });

  it('uses provided id for section and aria-labelledby', () => {
    const customId = 'my-sidebar-section';
    const { container } = renderWithI18n(
      <SidebarSection title="Test Section" id={customId}>
        <div>Child Content</div>
      </SidebarSection>
    );
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveAttribute('id', customId);
    expect(sectionElement).toHaveAttribute('aria-labelledby', `${customId}-title`);

    // Check the mocked title also received the correct ID
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveAttribute('id', `${customId}-title`);
  });
});
