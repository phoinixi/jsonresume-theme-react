import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { Header } from './Header';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Volunteer } from './Volunteer';
import { Awards } from './Awards';
import { Publications } from './Publications';
import { Languages } from './Languages';
import { Interests } from './Interests';
import { References } from './References';
import { Certificates } from './Certificates';

interface ResumeProps {
  resume: ResumeSchema;
}

export const Resume: React.FC<ResumeProps> = ({ resume }) => {
  return (
    <div className="container p-4 mx-auto lg:w-[960px] bg-color text-text print:max-w-full print:p-0 print:w-full">
      {resume.basics && <Header basics={resume.basics} />}

      <div className="flex flex-col gap-8 lg:flex-row print:flex-row print:gap-4">
        {/* Main content - left column (wider) */}
        <div className="lg:w-2/3 print:w-[72%] print:pr-4">
          {resume.work && resume.work.length > 0 && <WorkExperience work={resume.work} />}
          {resume.education && resume.education.length > 0 && (
            <Education education={resume.education} />
          )}
          {resume.projects && resume.projects.length > 0 && <Projects projects={resume.projects} />}
          {resume.volunteer && resume.volunteer.length > 0 && (
            <Volunteer volunteer={resume.volunteer} />
          )}
          {resume.publications && resume.publications.length > 0 && (
            <Publications publications={resume.publications} />
          )}
        </div>

        {/* Sidebar - right column (narrower) */}
        <div className="lg:w-1/3 print:w-[28%]">
          {resume.skills && resume.skills.length > 0 && <Skills skills={resume.skills} />}
          {resume.languages && resume.languages.length > 0 && (
            <Languages languages={resume.languages} />
          )}
          {resume.certificates && resume.certificates.length > 0 && (
            <Certificates certificates={resume.certificates} />
          )}
          {resume.awards && resume.awards.length > 0 && <Awards awards={resume.awards} />}
          {resume.interests && resume.interests.length > 0 && (
            <Interests interests={resume.interests} />
          )}
          {resume.references && resume.references.length > 0 && (
            <References references={resume.references} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
