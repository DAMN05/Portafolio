
import { IContactRepository } from '@/core/repositories';
import { ContactMessageEntity } from '@/core/entities';

export class SendContactMessageUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(message: ContactMessageEntity): Promise<{ success: boolean; error?: string }> {
    try {
      const success = await this.contactRepository.send(message);
      
      if (success) {
        await this.contactRepository.save(message.withStatus('sent'));
        return { success: true };
      } else {
        await this.contactRepository.save(message.withStatus('failed'));
        return { 
          success: false, 
          error: 'No se pudo enviar el mensaje. Intenta nuevamente.' 
        };
      }
    } catch (error) {
      console.error('Error in SendContactMessageUseCase:', error);
      return { 
        success: false, 
        error: 'Ocurrió un error inesperado. Por favor intenta más tarde.' 
      };
    }
  }
}
