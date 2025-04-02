import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';

type Project = NonNullable<ResumeSchema['projects']>[number];
interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
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
            subtitleUrl={project.url}
            summary={project.description}
            highlights={project.highlights}
            keywords={project.keywords}
          />
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
