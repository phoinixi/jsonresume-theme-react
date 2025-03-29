import React, { memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { BsAward } from 'react-icons/bs';
import { SectionTitle } from './ui/SectionTitle';
import { useDate } from '../lib/hooks/useDate';

type Certificate = NonNullable<ResumeSchema['certificates']>[number];

interface CertificateItemProps {
  certificate: Certificate;
  index: number;
}

const CertificateItem = memo<CertificateItemProps>(({ certificate, index }) => {
  const formattedDate = useDate(certificate.date);

  return (
    <div
      key={`certificate-${index}`}
      className="p-3 bg-white bg-opacity-5 rounded-md border-l-2 border-color"
    >
      <div className="flex items-start">
        <div className="mr-3 text-brand">
          <BsAward className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{certificate.name}</h3>

          <div className="mt-1 text-sm text-foreground-secondary">
            {certificate.issuer && <div className="mb-1">Issued by: {certificate.issuer}</div>}

            <div className="flex flex-wrap gap-4 text-sm">
              {certificate.date && <span>Date: {formattedDate}</span>}

              {certificate.url && (
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  View Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

interface CertificatesProps {
  certificates?: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  if (!certificates?.length) return null;

  return (
    <section className="mb-6">
      <SectionTitle title="Certificates" />
      <div className="space-y-3">
        {certificates.map((certificate, index) => (
          <CertificateItem key={`certificate-${index}`} certificate={certificate} index={index} />
        ))}
      </div>
    </section>
  );
};
