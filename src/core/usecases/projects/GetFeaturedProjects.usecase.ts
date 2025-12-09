// src/core/usecases/projects/GetFeaturedProjects.usecase.ts

import { IProjectRepository } from '@/core/repositories';
import { ProjectEntity } from '@/core/entities';

export class GetFeaturedProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<ProjectEntity[]> {
    return await this.projectRepository.getFeatured();
  }
}
