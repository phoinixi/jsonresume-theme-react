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
      projects?.map(project => ({
        ...project,
        _id: crypto.randomUUID(),
        // Keep highlights as string[] for SectionCard
        highlights: project.highlights,
      })) || []
    );
  }, [projects]);

  if (!projectsWithIds.length) return null;

  return (
    <TimelineSection title="Projects">
      {projectsWithIds.map(project => (
        <TimelineEntry
          key={project._id}
          startDate={project.startDate}
          endDate={project.endDate}
          dotColor="brand"
        >
          <SectionCard
            title={project.name}
            highlights={project.highlights}
            summary={project.description}
            keywords={project.keywords}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:underline"
              >
                View Project
              </a>
            )}
          </SectionCard>
        </TimelineEntry>
      ))}
    </TimelineSection>
  );
};
