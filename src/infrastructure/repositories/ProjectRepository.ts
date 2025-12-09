// src/infrastructure/repositories/ProjectRepository.ts

import { IProjectRepository } from '@/core/repositories';
import { ProjectEntity } from '@/core/entities';
import { PROJECTS_DATA } from '@/shared/constants/projects.constants';
import { Project } from '@/shared/types/projects.types';

export class ProjectRepository implements IProjectRepository {
  /**
   * Convierte datos raw a entidad
   */
  private toEntity(data: Project): ProjectEntity {
    return new ProjectEntity(
      data.id,
      data.title,
      data.shortDescription,
      data.longDescription,
      data.category,
      data.technologies,
      data.images,
      data.thumbnail,
      data.githubUrl,
      data.liveUrl,
      data.featured,
      data.completedAt,
      data.highlights
    );
  }

  async getAll(): Promise<ProjectEntity[]> {
    return PROJECTS_DATA.map(p => this.toEntity(p));
  }

  async getById(id: string): Promise<ProjectEntity | null> {
    const project = PROJECTS_DATA.find(p => p.id === id);
    return project ? this.toEntity(project) : null;
  }

  async getFeatured(): Promise<ProjectEntity[]> {
    return PROJECTS_DATA
      .filter(p => p.featured)
      .map(p => this.toEntity(p));
  }

  async getByCategory(category: string): Promise<ProjectEntity[]> {
    return PROJECTS_DATA
      .filter(p => p.category === category)
      .map(p => this.toEntity(p));
  }

  async getRecent(limit: number = 6): Promise<ProjectEntity[]> {
    const projects = await this.getAll();
    return projects
      .filter(p => p.isRecent)
      .slice(0, limit);
  }

  async getByTechnology(technology: string): Promise<ProjectEntity[]> {
    return PROJECTS_DATA
      .filter(p => 
        p.technologies.some(t => 
          t.toLowerCase().includes(technology.toLowerCase())
        )
      )
      .map(p => this.toEntity(p));
  }
}
