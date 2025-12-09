// src/core/entities/SocialLink.entity.ts

export class SocialLinkEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly url: string,
    public readonly icon: string,
    public readonly color: string,
    public readonly username?: string
  ) {
    this.validateUrl(url);
  }

  /**
   * Valida el formato de la URL
   */
  private validateUrl(url: string): void {
    try {
      new URL(url);
    } catch {
      throw new Error('Invalid URL format');
    }
  }

  /**
   * Verifica si es un link de email
   */
  get isEmail(): boolean {
    return this.url.startsWith('mailto:');
  }

  /**
   * Verifica si es un link de teléfono
   */
  get isPhone(): boolean {
    return this.url.startsWith('tel:');
  }

  /**
   * Obtiene el dominio del URL
   */
  get domain(): string | null {
    if (this.isEmail || this.isPhone) return null;
    try {
      const urlObj = new URL(this.url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return null;
    }
  }

  /**
   * Verifica si debe abrirse en nueva pestaña
   */
  get shouldOpenInNewTab(): boolean {
    return !this.isEmail && !this.isPhone;
  }

  /**
   * Obtiene el atributo target apropiado
   */
  get targetAttribute(): '_blank' | '_self' {
    return this.shouldOpenInNewTab ? '_blank' : '_self';
  }

  /**
   * Obtiene los atributos rel apropiados para enlaces externos
   */
  get relAttribute(): string {
    return this.shouldOpenInNewTab ? 'noopener noreferrer' : '';
  }
}
