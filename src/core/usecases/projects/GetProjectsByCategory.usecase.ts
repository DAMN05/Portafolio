// src/core/usecases/projects/GetProjectsByCategory.usecase.ts

import { IProjectRepository } from '@/core/repositories';
import { ProjectEntity } from '@/core/entities';

export class GetProjectsByCategoryUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(category: string): Promise<ProjectEntity[]> {
    if (category === 'all' || !category) {
      return await this.projectRepository.getAll();
    }
    return await this.projectRepository.getByCategory(category);
  }
}
