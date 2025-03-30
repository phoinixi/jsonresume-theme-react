import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import { getContactIcon } from '../../lib/socialIcons';

interface ContactInfoProps {
  email?: string;
  phone?: string;
  url?: string;
}

export const ContactInfo: FC<ContactInfoProps> = ({ email, phone, url }) => {
  const { t } = useTranslation();
  const { icon: EmailIcon, color: emailColor } = getContactIcon('email');
  const { icon: PhoneIcon, color: phoneColor } = getContactIcon('phone');

  return (
    <div
      className="flex flex-wrap gap-6 mt-4 text-sm text-foreground-tertiary print:mt-0 print:align-middle"
      role="contentinfo"
      aria-label={t('common.contactInfo')}
    >
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          aria-label={`${t('common.email')}: ${email}`}
        >
          <EmailIcon
            style={{ color: emailColor }}
            className="w-4 h-4 text-brand print:w-3 print:h-3"
            aria-hidden="true"
          />
          {email}
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          aria-label={`${t('common.phone')}: ${phone}`}
        >
          <PhoneIcon
            style={{ color: phoneColor }}
            className="w-4 h-4 text-brand print:flex"
            aria-hidden="true"
          />
          {phone}
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center transition-colors hover:text-brand print:gap-1"
          aria-label={`${t('common.website')}: ${url}`}
        >
          <BsGlobe className="w-4 h-4 text-brand print:w-4 print:h-4" aria-hidden="true" />
          {url}
        </a>
      )}
    </div>
  );
};
