import React from 'react';
import type { ResumeSchema } from '../types/resumeSchema';
import { SectionCard } from './ui/SectionCard';
import { TimelineSection, TimelineEntry } from './ui/TimelineSection';

interface ProjectsProps {
  projects: ResumeSchema['projects'];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // Generate UUIDs for projects and highlights only once
  const projectsWithIds = React.useMemo(() => {
    return (
      projects?.map(item => ({
        ...item,
        _id: crypto.randomUUID(),
      })) || []
    );
  }, [projects]);

  if (!projectsWithIds.length) return null;

  return (
    <TimelineSection title="Projects">
      {projectsWithIds.map(project => (
        <TimelineEntry key={project._id} startDate={project.startDate} endDate={project.endDate}>
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
