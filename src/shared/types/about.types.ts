// src/shared/types/about.types.ts

export interface Stat {
    id: string;
    label: string;
    value: string;
    icon?: string;
    suffix?: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    description: string;
    yearsOfExperience?: string;
    icon?: string;
    color?: string;
  }
  
  export type SkillCategory = 
    | 'frontend' 
    | 'backend' 
    | '3d' 
    | 'tools' 
    | 'other';

  export type SkillLevel = 
    | 'Básico' 
    | 'Intermedio' 
    | 'Avanzado' 
    | 'Experto';
  
  export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    type: 'work' | 'education' | 'freelance';
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    achievements?: string[];
    technologies?: string[];
    highlights?: string[]; // Características destacadas del proyecto
  }
  
  export interface AboutContent {
    title: string;
    description: string[];
    stats: Stat[];
  }