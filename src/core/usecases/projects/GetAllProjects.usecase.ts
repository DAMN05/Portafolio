// src/core/usecases/projects/GetAllProjects.usecase.ts

import { IProjectRepository } from '@/core/repositories';
import { ProjectEntity } from '@/core/entities';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<ProjectEntity[]> {
    return await this.projectRepository.getAll();
  }
}
