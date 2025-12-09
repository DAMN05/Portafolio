// src/core/entities/Portfolio.entity.ts

import { ProjectEntity } from './Project.entity';
import { SkillEntity } from './Skill.entity';
import { ExperienceEntity } from './Experience.entity';

/**
 * Entidad principal que representa el portfolio completo
 */
export class PortfolioEntity {
  constructor(
    public readonly owner: {
      name: string;
      title: string;
      email: string;
      location?: string;
      bio: string;
      avatarUrl?: string;
    },
    public readonly projects: ProjectEntity[] = [],
    public readonly skills: SkillEntity[] = [],
    public readonly experiences: ExperienceEntity[] = []
  ) {}

  /**
   * Obtiene solo los proyectos destacados
   */
  get featuredProjects(): ProjectEntity[] {
    return this.projects.filter(p => p.featured);
  }

  /**
   * Obtiene proyectos por categoría
   */
  getProjectsByCategory(category: string): ProjectEntity[] {
    return this.projects.filter(p => p.category === category);
  }

  /**
   * Obtiene proyectos recientes (últimos 6 meses)
   */
  get recentProjects(): ProjectEntity[] {
    return this.projects.filter(p => p.isRecent);
  }

  /**
   * Obtiene skills por categoría
   */
  getSkillsByCategory(category: string): SkillEntity[] {
    return this.skills.filter(s => s.category === category);
  }

  /**
   * Obtiene skills de nivel experto
   */
  get expertSkills(): SkillEntity[] {
    return this.skills.filter(s => s.isExpert);
  }

  /**
   * Obtiene la experiencia actual
   */
  get currentExperience(): ExperienceEntity | undefined {
    return this.experiences.find(e => e.isCurrent);
  }

  /**
   * Obtiene experiencias por tipo
   */
  getExperiencesByType(type: 'work' | 'education' | 'freelance'): ExperienceEntity[] {
    return this.experiences.filter(e => e.type === type);
  }

  /**
   * Calcula años totales de experiencia
   */
  get totalYearsOfExperience(): number {
    if (this.experiences.length === 0) return 0;
    
    const workExperiences = this.experiences.filter(e => e.type === 'work' || e.type === 'freelance');
    const totalMonths = workExperiences.reduce((acc, exp) => acc + exp.durationInMonths, 0);
    
    return Math.floor(totalMonths / 12);
  }

  /**
   * Obtiene todas las tecnologías únicas usadas en proyectos
   */
  get allTechnologies(): string[] {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }

  /**
   * Obtiene estadísticas del portfolio
   */
  get stats() {
    return {
      totalProjects: this.projects.length,
      featuredProjects: this.featuredProjects.length,
      totalSkills: this.skills.length,
      expertSkills: this.expertSkills.length,
      yearsOfExperience: this.totalYearsOfExperience,
      technologiesCount: this.allTechnologies.length
    };
  }

  /**
   * Verifica si el portfolio está completo
   */
  get isComplete(): boolean {
    return (
      this.projects.length > 0 &&
      this.skills.length > 0 &&
      this.experiences.length > 0 &&
      !!this.owner.name &&
      !!this.owner.email
    );
  }
}
