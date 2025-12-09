// src/core/repositories/ISkillRepository.ts

import { SkillEntity } from '@/core/entities';

export interface ISkillRepository {
  /**
   * Obtiene todas las habilidades
   */
  getAll(): Promise<SkillEntity[]>;

  /**
   * Obtiene habilidades por categoría
   */
  getByCategory(category: string): Promise<SkillEntity[]>;

  /**
   * Obtiene habilidades de nivel experto
   */
  getExpertSkills(): Promise<SkillEntity[]>;

  /**
   * Obtiene una habilidad por ID
   */
  getById(id: string): Promise<SkillEntity | null>;

  /**
   * Obtiene todas las categorías disponibles
   */
  getCategories(): Promise<string[]>;
}
