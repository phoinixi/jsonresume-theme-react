// Import generated schema
import { ResumeSchema } from './resumeSchema';

// Basic types from schema
export type Resume = ResumeSchema;
export type Basics = NonNullable<Resume['basics']>;

// Extract base types from the schema
type BaseWork = NonNullable<Resume['work']>[number];
type BaseEducation = NonNullable<Resume['education']>[number];
type BaseAward = NonNullable<Resume['awards']>[number];
type BaseCertificate = NonNullable<Resume['certificates']>[number];
type BaseInterest = NonNullable<Resume['interests']>[number];
type BaseLanguage = NonNullable<Resume['languages']>[number];
type BaseProject = NonNullable<Resume['projects']>[number];
type BasePublication = NonNullable<Resume['publications']>[number];
type BaseReference = NonNullable<Resume['references']>[number];
type BaseSkill = NonNullable<Resume['skills']>[number];
type BaseVolunteer = NonNullable<Resume['volunteer']>[number];

// Extended types with custom fields
export interface Work extends BaseWork {
  keywords?: string[]; // Add support for keywords in work experiences
}

// Export remaining types without modifications
export type Education = BaseEducation;
export type Award = BaseAward;
export type Certificate = BaseCertificate;
export type Interest = BaseInterest;
export type Language = BaseLanguage;
export type Project = BaseProject;
export type Publication = BasePublication;
export type Reference = BaseReference;
export type Skill = BaseSkill;
export type Volunteer = BaseVolunteer;
