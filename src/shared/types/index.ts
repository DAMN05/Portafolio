
// Project Types
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    category: ProjectCategory;
    images: string[];
    thumbnail: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    completedAt: Date;
  }
  
  export type ProjectCategory = 'web' | '3d' | 'mobile' | 'fullstack';
  
  // Skill Types
  export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    proficiency: number; // 0-100
    icon?: string;
    yearsOfExperience?: number;
  }
  
  export type SkillCategory = 'frontend' | 'backend' | '3d' | 'tools' | 'other';
  
  // Experience Types
  export interface Experience {
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    technologies: string[];
    isCurrentJob: boolean;
  }
  
  // Contact Types
  export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Date;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  export interface ContactFormErrors {
    name?: string;
    email?: string;
    message?: string;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Animation Types
  export interface AnimationConfig {
    duration: number;
    delay?: number;
    ease?: string;
  }
  
  // Theme Types
  export type Theme = 'light' | 'dark';
  
  export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
  }