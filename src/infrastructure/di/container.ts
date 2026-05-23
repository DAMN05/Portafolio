import {
  ContactRepository,
} from '@/infrastructure/repositories';

import {
  SendContactMessageUseCase,
} from '@/core/usecases';

const contactRepository = new ContactRepository();

export const sendContactMessageUseCase = new SendContactMessageUseCase(contactRepository);
