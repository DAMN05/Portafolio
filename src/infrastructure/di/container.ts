// src/infrastructure/di/container.ts

/**
 * Dependency Injection Container
 * Centraliza la creación e inyección de dependencias
 */

import {
  ProjectRepository,
  SkillRepository,
  ExperienceRepository,
  ContactRepository,
  SocialLinkRepository
} from '@/infrastructure/repositories';

import {
  GetAllProjectsUseCase,
  GetFeaturedProjectsUseCase,
  GetProjectsByCategoryUseCase,
  GetProjectByIdUseCase,
  GetAllSkillsUseCase,
  GetSkillsByCategoryUseCase,
  GetExpertSkillsUseCase,
  GetAllExperiencesUseCase,
  GetCurrentExperienceUseCase,
  SendContactMessageUseCase,
  GetAllSocialLinksUseCase
} from '@/core/usecases';

// ========== Repositories ==========
const projectRepository = new ProjectRepository();
const skillRepository = new SkillRepository();
const experienceRepository = new ExperienceRepository();
const contactRepository = new ContactRepository();
const socialLinkRepository = new SocialLinkRepository();

// ========== Use Cases - Projects ==========
export const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
export const getFeaturedProjectsUseCase = new GetFeaturedProjectsUseCase(projectRepository);
export const getProjectsByCategoryUseCase = new GetProjectsByCategoryUseCase(projectRepository);
export const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);

// ========== Use Cases - Skills ==========
export const getAllSkillsUseCase = new GetAllSkillsUseCase(skillRepository);
export const getSkillsByCategoryUseCase = new GetSkillsByCategoryUseCase(skillRepository);
export const getExpertSkillsUseCase = new GetExpertSkillsUseCase(skillRepository);

// ========== Use Cases - Experience ==========
export const getAllExperiencesUseCase = new GetAllExperiencesUseCase(experienceRepository);
export const getCurrentExperienceUseCase = new GetCurrentExperienceUseCase(experienceRepository);

// ========== Use Cases - Contact ==========
export const sendContactMessageUseCase = new SendContactMessageUseCase(contactRepository);

// ========== Use Cases - Social ==========
export const getAllSocialLinksUseCase = new GetAllSocialLinksUseCase(socialLinkRepository);
