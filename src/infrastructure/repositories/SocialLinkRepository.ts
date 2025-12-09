// src/infrastructure/repositories/SocialLinkRepository.ts

import { ISocialLinkRepository } from '@/core/repositories';
import { SocialLinkEntity } from '@/core/entities';
import { SOCIAL_LINKS } from '@/shared/constants/contact.constants';
import { SocialLink } from '@/shared/types/contact.types';

export class SocialLinkRepository implements ISocialLinkRepository {
  /**
   * Convierte datos raw a entidad
   */
  private toEntity(data: SocialLink): SocialLinkEntity {
    return new SocialLinkEntity(
      data.id,
      data.name,
      data.url,
      data.icon,
      data.color
    );
  }

  async getAll(): Promise<SocialLinkEntity[]> {
    return SOCIAL_LINKS.map(s => this.toEntity(s));
  }

  async getById(id: string): Promise<SocialLinkEntity | null> {
    const link = SOCIAL_LINKS.find(s => s.id === id);
    return link ? this.toEntity(link) : null;
  }
}
