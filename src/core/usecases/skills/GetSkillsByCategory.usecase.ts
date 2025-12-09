// src/core/usecases/skills/GetSkillsByCategory.usecase.ts

import { ISkillRepository } from '@/core/repositories';
import { SkillEntity } from '@/core/entities';

export class GetSkillsByCategoryUseCase {
  constructor(private skillRepository: ISkillRepository) {}

  async execute(category: string): Promise<SkillEntity[]> {
    return await this.skillRepository.getByCategory(category);
  }
}
