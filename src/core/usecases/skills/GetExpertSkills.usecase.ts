// src/core/usecases/skills/GetExpertSkills.usecase.ts

import { ISkillRepository } from '@/core/repositories';
import { SkillEntity } from '@/core/entities';

export class GetExpertSkillsUseCase {
  constructor(private skillRepository: ISkillRepository) {}

  async execute(): Promise<SkillEntity[]> {
    return await this.skillRepository.getExpertSkills();
  }
}
