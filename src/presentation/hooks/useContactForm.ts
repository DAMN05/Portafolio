// src/presentation/hooks/useContactForm.ts
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { sendContactMessageUseCase } from '@/infrastructure/di/container';
import { ContactFormData, ContactFormErrors, FormStatus } from '@/shared/types/contact.types';
import { validateContactForm, sanitizeInput } from '@/shared/utils/validators';
import { ContactMessageEntity } from '@/core/entities';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['name', 'subject', 'message'].includes(name) ? value : sanitizeInput(value)
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateContactForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      // Crear instancia de ContactMessageEntity
      const contactMessage = new ContactMessageEntity(
        '', // Generar un ID único si es necesario
        formData.name,
        formData.email,
        formData.subject,
        formData.message,
        new Date(),
        'pending'
      );

      // Enviar usando el caso de uso
      const result = await sendContactMessageUseCase.execute(contactMessage);

      if (result.success) {
        setStatus('success');
        setFormData(initialFormData);
      } else {
        setStatus('error');
        console.error('Error al enviar el mensaje:', result.error);
      }

      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error inesperado:', error);
      setStatus('error');

      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStatus('idle');
  };

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
    resetForm
  };
}