// src/core/entities/Contact.entity.ts

export class ContactMessageEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly subject: string,
    public readonly message: string,
    public readonly createdAt: Date = new Date(),
    public readonly status: 'pending' | 'sent' | 'failed' = 'pending'
  ) {
    // Validaciones básicas
    this.validateEmail(email);
    this.validateName(name);
    this.validateMessage(message);
  }

  /**
   * Valida el formato del email
   */
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  /**
   * Valida el nombre
   */
  private validateName(name: string): void {
    if (name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
  }

  /**
   * Valida el mensaje
   */
  private validateMessage(message: string): void {
    if (message.trim().length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }
  }

  /**
   * Verifica si el mensaje fue enviado exitosamente
   */
  get isSent(): boolean {
    return this.status === 'sent';
  }

  /**
   * Verifica si el mensaje falló
   */
  get hasFailed(): boolean {
    return this.status === 'failed';
  }

  /**
   * Obtiene la fecha formateada
   */
  get formattedDate(): string {
    return this.createdAt.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Crea una copia del mensaje con un nuevo estado
   */
  withStatus(status: 'pending' | 'sent' | 'failed'): ContactMessageEntity {
    return new ContactMessageEntity(
      this.id,
      this.name,
      this.email,
      this.subject,
      this.message,
      this.createdAt,
      status
    );
  }
}
