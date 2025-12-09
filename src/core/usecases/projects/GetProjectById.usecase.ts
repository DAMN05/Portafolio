// src/core/usecases/projects/GetProjectById.usecase.ts

import { IProjectRepository } from '@/core/repositories';
import { ProjectEntity } from '@/core/entities';

export class GetProjectByIdUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<ProjectEntity | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Project ID is required');
    }
    return await this.projectRepository.getById(id);
  }
}
