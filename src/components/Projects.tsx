import React from 'react';
// import { useTranslation } from 'react-i18next'; // No longer needed here
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';
// import { typography } from '../lib/styleTokens'; // No longer needed here
// import { FaExternalLinkAlt } from 'react-icons/fa'; // No longer needed here

type Project = NonNullable<ResumeSchema['projects']>[number];
interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // const { t } = useTranslation(); // No longer needed here
  if (!projects?.length) return null;

  return (
    <TimelineSection title="sections.projects">
      {projects.map((project, index) => (
        <TimelineEntry
          key={`project-${index}`}
          startDate={project.startDate}
          endDate={project.endDate}
        >
          <SectionCard
            title={project.name}
            subtitle={project.entity}
            url={project.url} // Keeps title/subtitle link logic
            summary={project.description}
            highlights={project.highlights}
            tags={project.keywords}
            actionUrl={project.url} // Pass URL for the action link
            actionLabelKey="common.viewProject" // Pass translation key for the label
          />
          {/* Link is now rendered inside SectionCard */}
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
