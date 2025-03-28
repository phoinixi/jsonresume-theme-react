import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { getIcon, getContactIcon } from '../lib/socialIcons';
import { Summary } from './Summary';
import { BsGlobe } from 'react-icons/bs';

interface HeaderProps {
  basics: NonNullable<ResumeSchema['basics']>;
}

export const Header: React.FC<HeaderProps> = ({ basics }) => {
  const { name, label, email, phone, url, profiles, location, summary } = basics;
  const { icon: EmailIcon, color: emailColor } = getContactIcon('email');
  const { icon: PhoneIcon, color: phoneColor } = getContactIcon('phone');
  const { icon: LocationIcon, color: locationColor } = getContactIcon('location');

  const profilesWithIds = React.useMemo(() => {
    return (
      profiles?.map(profile => ({
        ...profile,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [profiles]);

  const locationWithId = React.useMemo(() => {
    return location ? { ...location, _id: crypto.randomUUID() } : null;
  }, [location]);

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

      {locationWithId && (
        <div className="flex gap-2 items-center print:gap-1">
          <LocationIcon
            style={{ color: locationColor }}
            className="w-4 h-4 text-brand print:w-3 print:h-3"
          />
          {[
            locationWithId.address,
            locationWithId.city,
            locationWithId.region,
            locationWithId.postalCode,
          ]
            .filter(Boolean)
            .join(', ')}
        </div>
      )}
      <div className="flex flex-wrap gap-6 mt-4 text-sm text-foreground-tertiary print:mt-0 print:align-middle">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          >
            <EmailIcon
              style={{ color: emailColor }}
              className="w-4 h-4 text-brand print:w-3 print:h-3"
            />
            {email}
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          >
            <PhoneIcon style={{ color: phoneColor }} className="w-4 h-4 text-brand print:flex" />
            {phone}
          </a>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          >
            <BsGlobe className="w-4 h-4 text-brand print:w-4 print:h-4" />
            {url}
          </a>
        )}
      </div>

      {profilesWithIds.length > 0 && (
        <div className="flex gap-4 mt-2 print:gap-2 print:mt-1">
          {profilesWithIds.map(profile => {
            const social = profile.network ? getIcon(profile.network) : null;
            if (!social) return null;
            const { icon: Icon, color } = social;
            return (
              <a
                key={profile._id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-sm print:gap-1"
                title={profile.network}
              >
                <Icon style={{ color }} className="w-4 h-4 print:w-3 print:h-3" />
                {profile.username}
              </a>
            );
          })}
        </div>
      )}

      {summary && (
        <div className="mt-6 leading-relaxed text-foreground-secondary print:m-0 print:py-4">
          <Summary summary={summary} />
        </div>
      )}
    </header>
  );
};
