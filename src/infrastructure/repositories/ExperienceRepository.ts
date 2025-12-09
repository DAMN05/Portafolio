// src/infrastructure/repositories/ExperienceRepository.ts

import { IExperienceRepository } from '@/core/repositories';
import { ExperienceEntity } from '@/core/entities';
import { EXPERIENCE_DATA } from '@/shared/constants/about.constants';
import { Experience } from '@/shared/types/about.types';

export class ExperienceRepository implements IExperienceRepository {
  /**
   * Convierte datos raw a entidad
   */
  private toEntity(data: Experience): ExperienceEntity {
    return new ExperienceEntity(
      data.id,
      data.title,
      data.company,
      data.location,
      data.type,
      data.startDate,
      data.endDate,
      data.isCurrent,
      data.description,
      data.achievements || [],
      data.technologies || []
    );
  }

  async getAll(): Promise<ExperienceEntity[]> {
    return EXPERIENCE_DATA.map(e => this.toEntity(e));
  }

  async getById(id: string): Promise<ExperienceEntity | null> {
    const experience = EXPERIENCE_DATA.find(e => e.id === id);
    return experience ? this.toEntity(experience) : null;
  }

  async getCurrent(): Promise<ExperienceEntity | null> {
    const current = EXPERIENCE_DATA.find(e => e.isCurrent);
    return current ? this.toEntity(current) : null;
  }

  async getByType(type: 'work' | 'education' | 'freelance'): Promise<ExperienceEntity[]> {
    return EXPERIENCE_DATA
      .filter(e => e.type === type)
      .map(e => this.toEntity(e));
  }

  async getChronological(): Promise<ExperienceEntity[]> {
    const experiences = await this.getAll();
    return experiences.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime(); // Más reciente primero
    });
  }
}
