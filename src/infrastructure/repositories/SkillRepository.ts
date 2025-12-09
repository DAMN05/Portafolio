// src/infrastructure/repositories/SkillRepository.ts

import { ISkillRepository } from '@/core/repositories';
import { SkillEntity } from '@/core/entities';
import { SKILLS_DATA } from '@/shared/constants/about.constants';
import { Skill } from '@/shared/types/about.types';

export class SkillRepository implements ISkillRepository {
  /**
   * Convierte datos raw a entidad
   */
  private toEntity(data: Skill): SkillEntity {
    return new SkillEntity(
      data.id,
      data.name,
      data.category,
      data.level,
      data.description,
      data.color || '#6B7280',
      data.yearsOfExperience,
      data.icon
    );
  }

  async getAll(): Promise<SkillEntity[]> {
    return SKILLS_DATA.map(s => this.toEntity(s));
  }

  async getByCategory(category: string): Promise<SkillEntity[]> {
    return SKILLS_DATA
      .filter(s => s.category === category)
      .map(s => this.toEntity(s));
  }

  async getExpertSkills(): Promise<SkillEntity[]> {
    const skills = await this.getAll();
    return skills.filter(s => s.isExpert);
  }

  async getById(id: string): Promise<SkillEntity | null> {
    const skill = SKILLS_DATA.find(s => s.id === id);
    return skill ? this.toEntity(skill) : null;
  }

  async getCategories(): Promise<string[]> {
    const categories = new Set(SKILLS_DATA.map(s => s.category));
    return Array.from(categories);
  }
}
