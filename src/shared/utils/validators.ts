import { ContactFormData, ContactFormErrors } from '@/shared/types/contact.types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  } else if (data.name.trim().length > 50) {
    errors.name = 'El nombre no puede exceder 50 caracteres';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }

  if (!data.subject.trim()) {
    errors.subject = 'El asunto es requerido';
  } else if (data.subject.trim().length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres';
  } else if (data.subject.trim().length > 100) {
    errors.subject = 'El asunto no puede exceder 100 caracteres';
  }

  if (!data.message.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres';
  }

  return errors;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};