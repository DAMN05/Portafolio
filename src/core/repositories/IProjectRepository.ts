// src/core/repositories/IProjectRepository.ts

import { ProjectEntity } from '@/core/entities';

export interface IProjectRepository {
  /**
   * Obtiene todos los proyectos
   */
  getAll(): Promise<ProjectEntity[]>;

  /**
   * Obtiene un proyecto por ID
   */
  getById(id: string): Promise<ProjectEntity | null>;

  /**
   * Obtiene proyectos destacados
   */
  getFeatured(): Promise<ProjectEntity[]>;

  /**
   * Obtiene proyectos por categoría
   */
  getByCategory(category: string): Promise<ProjectEntity[]>;

  /**
   * Obtiene proyectos recientes
   */
  getRecent(limit?: number): Promise<ProjectEntity[]>;

  /**
   * Busca proyectos por tecnología
   */
  getByTechnology(technology: string): Promise<ProjectEntity[]>;
}
