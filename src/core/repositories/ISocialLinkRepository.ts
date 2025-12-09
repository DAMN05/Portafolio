// src/core/repositories/ISocialLinkRepository.ts

import { SocialLinkEntity } from '@/core/entities';

export interface ISocialLinkRepository {
  /**
   * Obtiene todos los enlaces sociales
   */
  getAll(): Promise<SocialLinkEntity[]>;

  /**
   * Obtiene un enlace social por ID
   */
  getById(id: string): Promise<SocialLinkEntity | null>;
}
