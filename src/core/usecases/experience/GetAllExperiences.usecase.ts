// src/core/usecases/experience/GetAllExperiences.usecase.ts

import { IExperienceRepository } from '@/core/repositories';
import { ExperienceEntity } from '@/core/entities';

export class GetAllExperiencesUseCase {
  constructor(private experienceRepository: IExperienceRepository) {}

  async execute(): Promise<ExperienceEntity[]> {
    return await this.experienceRepository.getChronological();
  }
}
