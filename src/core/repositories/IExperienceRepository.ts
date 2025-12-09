// src/core/repositories/IExperienceRepository.ts

import { ExperienceEntity } from '@/core/entities';

export interface IExperienceRepository {
  /**
   * Obtiene todas las experiencias ordenadas por fecha
   */
  getAll(): Promise<ExperienceEntity[]>;

  /**
   * Obtiene una experiencia por ID
   */
  getById(id: string): Promise<ExperienceEntity | null>;

  /**
   * Obtiene la experiencia actual
   */
  getCurrent(): Promise<ExperienceEntity | null>;

  /**
   * Obtiene experiencias por tipo
   */
  getByType(type: 'work' | 'education' | 'freelance'): Promise<ExperienceEntity[]>;

  /**
   * Obtiene experiencias ordenadas cronológicamente
   */
  getChronological(): Promise<ExperienceEntity[]>;
}
