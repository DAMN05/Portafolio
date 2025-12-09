// src/infrastructure/repositories/ContactRepository.ts

import { IContactRepository } from '@/core/repositories';
import { ContactMessageEntity } from '@/core/entities';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/shared/constants/contact.constants';

export class ContactRepository implements IContactRepository {
  /**
   * Envía un mensaje de contacto usando EmailJS o API
   */
  async send(message: ContactMessageEntity): Promise<boolean> {
    try {
      if (!message.name || !message.email) {
        throw new Error(`Datos faltantes: name=${message.name}, email=${message.email}`);
      }
      
      console.log('Datos enviados a EmailJS:', {
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message
      });
      
      // Envío real con EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: message.name, // Cambiado de from_name a name
          email: message.email, // Cambiado de from_email a email
          subject: message.subject,
          message: message.message
        },
        EMAILJS_CONFIG.publicKey
      );
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  /**
   * Guarda un mensaje localmente (localStorage)
   */
  async save(message: ContactMessageEntity): Promise<void> {
    try {
      const messages = await this.getAll();
      messages.push(message);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('contact_messages', JSON.stringify(
          messages.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            createdAt: m.createdAt.toISOString(),
            status: m.status
          }))
        ));
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  /**
   * Obtiene mensajes guardados
   */
  async getAll(): Promise<ContactMessageEntity[]> {
    try {
      if (typeof window === 'undefined') return [];
      
      const stored = localStorage.getItem('contact_messages');
      if (!stored) return [];

      const data = JSON.parse(stored);
      return data.map((m: any) => new ContactMessageEntity(
        m.id,
        m.name,
        m.email,
        m.subject,
        m.message,
        new Date(m.createdAt),
        m.status
      ));
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }
}
