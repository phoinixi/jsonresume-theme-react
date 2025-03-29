import { FC } from 'react';
import { getIcon } from '../../lib/socialIcons';

interface Profile {
  network?: string;
  url?: string;
  username?: string;
}

interface SocialProfilesProps {
  profiles?: Profile[];
}

export const SocialProfiles: FC<SocialProfilesProps> = ({ profiles }) => {
  if (!profiles?.length) return null;

  return (
    <div
      className="flex gap-4 mt-2 print:gap-2 print:mt-1"
      role="contentinfo"
      aria-label="Social profiles"
    >
      {profiles.map((profile, index) => {
        const social = profile.network ? getIcon(profile.network) : null;
        if (!social) return null;
        const { icon: Icon, color } = social;
        return (
          <a
            key={`profile-${index}`}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center text-sm print:gap-1"
            title={profile.network}
            aria-label={`${profile.network} profile: ${profile.username}`}
          >
            <Icon style={{ color }} className="w-4 h-4 print:w-3 print:h-3" aria-hidden="true" />
            {profile.username}
          </a>
        );
      })}
    </div>
  );
};
