import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionTitle } from './ui/SectionTitle';
import { formatDate } from '../lib/utils';
import { BsAward } from 'react-icons/bs';

interface CertificatesProps {
  certificates: ResumeSchema['certificates'];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const certificatesWithIds = React.useMemo(() => {
    return (
      certificates?.map(certificate => ({
        ...certificate,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [certificates]);

  if (!certificatesWithIds.length) return null;

  return (
    <section className="mb-6">
      <SectionTitle title="Certificates" />
      <div className="space-y-3">
        {certificatesWithIds.map(certificate => (
          <div
            key={certificate._id}
            className="p-3 bg-white bg-opacity-5 rounded-md border-l-2 border-color"
          >
            <div className="flex items-start">
              <div className="mr-3 text-brand">
                <BsAward className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <h3 className="text-base font-medium text-foreground">{certificate.name}</h3>

                <div className="mt-1 text-sm text-foreground-secondary">
                  {certificate.issuer && (
                    <div className="mb-1">Issued by: {certificate.issuer}</div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm">
                    {certificate.date && <span>Date: {formatDate(certificate.date)}</span>}

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
        ))}
      </div>
    </section>
  );
};
