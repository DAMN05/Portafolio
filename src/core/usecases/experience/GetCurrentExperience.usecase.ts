// src/core/usecases/experience/GetCurrentExperience.usecase.ts

import { IExperienceRepository } from '@/core/repositories';
import { ExperienceEntity } from '@/core/entities';

export class GetCurrentExperienceUseCase {
  constructor(private experienceRepository: IExperienceRepository) {}

  async execute(): Promise<ExperienceEntity | null> {
    return await this.experienceRepository.getCurrent();
  }
}
