import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config'; // Adjusted path

import { SectionCard } from '../SectionCard'; // Adjusted path

// Mock ALL icons imported from react-icons/fa in the project
vi.mock('react-icons/fa', () => ({
  FaExternalLinkAlt: (props: any) => <span data-testid="icon-external-link" {...props} />,
  FaMapMarkerAlt: (props: any) => <span data-testid="icon-location" {...props} />,
  // Add mocks for icons used in socialIcons.ts
  FaGithub: (props: any) => <span data-testid="icon-github" {...props} />,
  FaLinkedin: (props: any) => <span data-testid="icon-linkedin" {...props} />,
  FaTwitter: (props: any) => <span data-testid="icon-twitter" {...props} />,
  FaXing: (props: any) => <span data-testid="icon-xing" {...props} />,
  FaMobileAlt: (props: any) => <span data-testid="icon-mobile" {...props} />,
  // Add any other Fa icons if used elsewhere
}));

const renderWithI18n = (ui: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe('SectionCard', () => {
  // Ensure i18n is initialized before each test
  beforeEach(async () => {
    await i18n.init(); // Or use i18n.changeLanguage('en') if init() is already called elsewhere
    // Ensure translations are loaded if needed (might require specific i18n setup for tests)
    await i18n.loadNamespaces('translation');
  });

  it('renders title and subtitle correctly without url', async () => {
    const props = { title: 'Pos Title', subtitle: 'Sub Title' };
    renderWithI18n(<SectionCard {...props} />);
    const heading = await screen.findByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent(/Pos Title/);
    expect(heading).toHaveTextContent(/Sub Title/);
    // Check subtitle is NOT a link
    expect(screen.queryByRole('link', { name: props.subtitle })).not.toBeInTheDocument();
  });

  it('renders subtitle as a link when url is provided', async () => {
    const props = { title: 'Pos Title', subtitle: 'Sub Title', url: 'http://test.com' };
    renderWithI18n(<SectionCard {...props} />);
    const heading = await screen.findByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent(/Pos Title/);
    const link = screen.getByRole('link', { name: props.subtitle });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.url);
    expect(heading).toContainElement(link);
  });

  it('renders action link correctly', async () => {
    const props = {
      title: 'Proj',
      actionUrl: 'http://action.com',
      actionLabelKey: 'common.viewProject',
    };
    renderWithI18n(<SectionCard {...props} />);
    const actionLink = await screen.findByRole('link', { name: /view project/i });
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute('href', props.actionUrl);
    expect(actionLink).toContainElement(screen.getByTestId('icon-external-link'));
  });

  it('does not render action link if actionUrl is missing', () => {
    const props = { title: 'Proj', actionLabelKey: 'common.viewProject' };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.queryByRole('link', { name: /view project/i })).not.toBeInTheDocument();
  });

  it('renders location and date correctly', () => {
    const props = {
      location: 'Test City',
      date: 'Jan 2023 - Dec 2023',
    };
    renderWithI18n(<SectionCard {...props} />);

    // Check location text and icon
    expect(screen.getByText(props.location)).toBeInTheDocument();
    expect(screen.getByTestId('icon-location')).toBeInTheDocument();

    // Check date text
    expect(screen.getByText(props.date)).toBeInTheDocument();

    // Check separator is present when both exist
    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('renders only location when date is missing', () => {
    const props = { location: 'Test City' };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText(props.location)).toBeInTheDocument();
    expect(screen.getByTestId('icon-location')).toBeInTheDocument();
    expect(screen.queryByText('•')).not.toBeInTheDocument(); // No separator
  });

  it('renders only date when location is missing', () => {
    const props = { date: 'Jan 2023' };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText(props.date)).toBeInTheDocument();
    expect(screen.queryByTestId('icon-location')).not.toBeInTheDocument(); // No location icon
    expect(screen.queryByText('•')).not.toBeInTheDocument(); // No separator
  });

  it('renders tags correctly', () => {
    const props = { tags: ['Tag1', 'Tag2', 'Tag3'] };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('Tag3')).toBeInTheDocument();
  });

  it('renders summary correctly', () => {
    const props = { summary: 'This is the summary text.' };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText(props.summary)).toBeInTheDocument();
  });

  it('renders highlights correctly with optional title', () => {
    const props = {
      highlightTitle: 'Key Achievements:',
      highlights: ['Did X', 'Did Y'],
    };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText(props.highlightTitle)).toBeInTheDocument();

    // Find the text content and ensure it's within list items
    const item1 = screen.getByText('Did X');
    const item2 = screen.getByText('Did Y');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    // Check that each text is within a list item, even if not direct parent
    expect(item1.closest('li')).not.toBeNull();
    expect(item2.closest('li')).not.toBeNull();
  });

  it('renders highlights without title if highlightTitle is missing', () => {
    const props = { highlights: ['Did X'] };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.queryByText('Key Achievements:')).not.toBeInTheDocument(); // Assuming default title isn't used

    // Find the text and ensure it's within a list item
    const item = screen.getByText('Did X');
    expect(item.closest('li')).not.toBeNull();
  });

  it('does not render empty sections', () => {
    // Render with only a title
    const props = { title: 'Minimal Card' };
    renderWithI18n(<SectionCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    // Assert that elements from other sections are NOT present
    expect(screen.queryByTestId('icon-location')).not.toBeInTheDocument();
    expect(screen.queryByText(/Jan 2023/)).not.toBeInTheDocument();
    expect(screen.queryByText('Tag1')).not.toBeInTheDocument();
    expect(screen.queryByText(/summary text/)).not.toBeInTheDocument();
    expect(screen.queryByText('Did X')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view project/i })).not.toBeInTheDocument();
  });
});
