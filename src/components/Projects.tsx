import React, { memo } from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection } from './ui/TimelineSection';
import { TimelineEntry } from './ui/TimelineEntry';

type Project = NonNullable<ResumeSchema['projects']>[number];

interface ProjectItemProps {
  project: Project;
  index: number;
}

const ProjectItem = memo<ProjectItemProps>(({ project, index }) => (
  <TimelineEntry key={`project-${index}`} startDate={project.startDate} endDate={project.endDate}>
    <SectionCard
      title={project.name}
      subtitle={project.entity}
      subtitleUrl={project.url}
      summary={project.description}
      highlights={project.highlights}
      keywords={project.keywords}
    />
  </TimelineEntry>
));

interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <TimelineSection title="sections.projects">
      {projects.map((project, index) => (
        <ProjectItem key={`project-${index}`} project={project} index={index} />
      ))}
    </TimelineSection>
  );
};
