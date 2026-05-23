
import { ISocialLinkRepository } from '@/core/repositories';
import { SocialLinkEntity } from '@/core/entities';

export class GetAllSocialLinksUseCase {
  constructor(private socialLinkRepository: ISocialLinkRepository) {}

  async execute(): Promise<SocialLinkEntity[]> {
    return await this.socialLinkRepository.getAll();
  }
}
