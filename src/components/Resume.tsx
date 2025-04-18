import { FC, memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { Header } from './Header';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Awards } from './Awards';
import { Certificates } from './Certificates';
import { Publications } from './Publications';
import { Languages } from './Languages';
import { Interests } from './Interests';
import { References } from './References';
import { Volunteer } from './Volunteer';

interface ResumeProps {
  resume: ResumeSchema;
}

export const Resume: FC<ResumeProps> = memo(({ resume }) => {
  const {
    basics,
    work,
    education,
    skills,
    projects,
    awards,
    certificates,
    publications,
    languages,
    interests,
    references,
    volunteer,
  } = resume;

  if (!basics) return null;

  return (
    <div
      className={`container p-3 mx-auto lg:w-[960px] bg-color text-text print:max-w-full print:p-0 print:w-full print:px-6`}
    >
      <Header basics={basics} />

      <div className={`flex flex-col gap-6 lg:flex-row print:flex-row print:gap-3`}>
        <div className={`lg:w-2/3 print:w-[72%]`}>
          {work && work.length > 0 && <WorkExperience work={work} />}
          {education && education.length > 0 && <Education education={education} />}
          {projects && projects.length > 0 && <Projects projects={projects} />}
          {volunteer && volunteer.length > 0 && <Volunteer volunteer={volunteer} />}
        </div>

        <div className={`lg:w-1/3 print:w-[28%]`}>
          <div className="print:space-y-2">
            {skills && skills.length > 0 && <Skills skills={skills} />}
            {languages && languages.length > 0 && <Languages languages={languages} />}
            {publications && publications.length > 0 && (
              <Publications publications={publications} />
            )}
            {certificates && certificates.length > 0 && (
              <Certificates certificates={certificates} />
            )}
            {awards && awards.length > 0 && <Awards awards={awards} />}
            {references && references.length > 0 && <References references={references} />}
            {interests && interests.length > 0 && <Interests interests={interests} />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
