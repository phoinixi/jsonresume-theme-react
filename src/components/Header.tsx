import React from 'react';
import { getContactIcon } from '../lib/socialIcons';
import { Summary } from './Summary';
import { ContactInfo } from './ui/ContactInfo';
import { SocialProfiles } from './ui/SocialProfiles';
import { ResumeSchema } from '../types/resumeSchema';

interface HeaderProps {
  basics: NonNullable<ResumeSchema['basics']>;
}

export const Header: React.FC<HeaderProps> = ({ basics }) => {
  const { name, label, email, phone, url, profiles, location, summary } = basics;
  const { icon: LocationIcon, color: locationColor } = getContactIcon('location');

  return (
    <header className="relative mb-2 print:mb-0 print:p-0">
      <h1 className="mb-1 text-5xl font-light text-foreground-muted print:mb-0.5 print:text-[32px]">
        {name}
      </h1>
      {label && (
        <h2 className="mb-2 text-xl font-normal text-foreground print:mb-1 print:text-[16px]">
          {label}
        </h2>
      )}

      {location && (
        <div
          className="flex gap-2 items-center print:gap-1"
          role="contentinfo"
          aria-label="Location"
        >
          <LocationIcon
            style={{ color: locationColor }}
            className="w-4 h-4 text-brand print:w-3 print:h-3"
            aria-hidden="true"
          />
          {[location.address, location.city, location.region, location.postalCode]
            .filter(Boolean)
            .join(', ')}
        </div>
      )}

      <ContactInfo email={email} phone={phone} url={url} />
      <SocialProfiles profiles={profiles} />

      {summary && (
        <div className="mt-6 leading-relaxed text-foreground-secondary print:m-0 print:py-4">
          <Summary summary={summary} />
        </div>
      )}
    </header>
  );
};
