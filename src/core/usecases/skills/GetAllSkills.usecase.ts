
import { ISkillRepository } from '@/core/repositories';
import { SkillEntity } from '@/core/entities';

export class GetAllSkillsUseCase {
  constructor(private skillRepository: ISkillRepository) {}

  async execute(): Promise<SkillEntity[]> {
    return await this.skillRepository.getAll();
  }
}
