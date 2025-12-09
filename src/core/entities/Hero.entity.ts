// src/core/entities/Hero.entity.ts

export class HeroEntity {
  constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly description: string,
    public readonly avatarUrl: string,
    public readonly availability: boolean = true
  ) {}

  /**
   * Obtiene el mensaje de disponibilidad
   */
  get availabilityMessage(): string {
    return this.availability 
      ? 'Disponible para proyectos' 
      : 'No disponible actualmente';
  }

  /**
   * Obtiene el emoji de disponibilidad
   */
  get availabilityEmoji(): string {
    return this.availability ? '✨' : '⏸️';
  }

  /**
   * Verifica si hay URL de avatar válida
   */
  get hasAvatar(): boolean {
    return !!this.avatarUrl && this.avatarUrl.trim().length > 0;
  }

  /**
   * Obtiene el nombre desde el título
   */
  get firstName(): string {
    return this.title.split(' ')[0];
  }

  /**
   * Obtiene el apellido desde el título
   */
  get lastName(): string {
    const parts = this.title.split(' ');
    return parts.slice(1).join(' ');
  }

  /**
   * Obtiene las iniciales
   */
  get initials(): string {
    const parts = this.title.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  }
}
