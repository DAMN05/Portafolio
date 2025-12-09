

export type ProjectCategory = 'all' | '3d'  | 'fullstack';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: ProjectCategory;
  technologies: string[];
  images: string[];
  thumbnail: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  completedAt: string;
  highlights?: string[];
}

export interface ProjectsContent {
  title: string;
  subtitle?: string;
}