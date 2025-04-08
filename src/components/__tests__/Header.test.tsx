// --- Mocks --- (Moved to top)
vi.mock('../../lib/socialIcons', () => ({
  getContactIcon: () => ({
    icon: (props: any) => <span data-testid="mock-location-icon" {...props} />,
    color: '#000000',
  }),
}));
vi.mock('../Summary', () => ({
  Summary: ({ summary }: { summary: string }) => <div data-testid="mock-summary">{summary}</div>,
}));
vi.mock('../ui/ContactInfo', () => ({
  ContactInfo: (props: any) => <div data-testid="mock-contact-info">{JSON.stringify(props)}</div>,
}));
vi.mock('../ui/SocialProfiles', () => ({
  SocialProfiles: (props: any) => (
    <div data-testid="mock-social-profiles">{JSON.stringify(props.profiles)}</div>
  ),
}));
// --- End Mocks ---

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Header } from '../Header';
import type { ResumeSchema } from '../../types/resumeSchema';

// Helper function for basic props
const getMockBasics = (
  overrides?: Partial<ResumeSchema['basics']>
): NonNullable<ResumeSchema['basics']> => ({
  name: 'John Doe',
  label: 'Programmer',
  email: 'john@doe.com',
  phone: '123-456-7890',
  url: 'http://johndoe.com',
  summary: 'A summary.',
  location: {
    address: '123 Main St',
    postalCode: '90210',
    city: 'Beverly Hills',
    countryCode: 'US',
    region: 'CA',
  },
  profiles: [{ network: 'GitHub', username: 'johndoe', url: 'github.com/johndoe' }],
  image: '', // Default to no image
  ...overrides,
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('renders basic information correctly without image', () => {
    const basics = getMockBasics();
    render(<Header basics={basics} />);

    expect(screen.getByRole('heading', { level: 1, name: basics.name })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: basics.label })).toBeInTheDocument();
    expect(screen.getByTestId('mock-location-icon')).toBeInTheDocument();
    expect(screen.getByText(/123 Main St, Beverly Hills, CA, 90210/)).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact-info')).toBeInTheDocument();
    expect(screen.getByTestId('mock-social-profiles')).toBeInTheDocument();
    expect(screen.getByTestId('mock-summary')).toBeInTheDocument();
    // Check image is NOT rendered
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders the image when basics.image URL is provided', () => {
    const imageUrl = 'https://example.com/profile.jpg';
    const basics = getMockBasics({ image: imageUrl });
    // Destructure container from render result
    const { container } = render(<Header basics={basics} />);

    // Query the DOM directly for the img tag using the container
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument(); // Check if the element exists in the DOM

    // Verify attributes on the found element
    expect(img).toHaveAttribute('src', imageUrl);
    expect(img).toHaveAttribute('alt', `Headshot of ${basics.name}`);
    expect(img).toHaveAttribute('aria-hidden', 'true');
    // Check class names for styling
    expect(img?.className).toMatch(/float-right/);
    expect(img?.className).toMatch(/rounded-full/);
  });

  it('does not render the image when basics.image is an empty string', () => {
    const basics = getMockBasics({ image: '' });
    render(<Header basics={basics} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('does not render the image when basics.image is undefined', () => {
    const basics = getMockBasics();
    delete basics.image; // Simulate undefined
    render(<Header basics={basics} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  // Add more tests as needed, e.g., checking props passed to child components
});
