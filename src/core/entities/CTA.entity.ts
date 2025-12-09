// src/core/entities/CTA.entity.ts

export type CTAVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export class CTAEntity {
  constructor(
    public readonly text: string,
    public readonly href: string,
    public readonly variant: CTAVariant = 'primary',
    public readonly icon?: string,
    public readonly external: boolean = false,
    public readonly download?: string
  ) {
    this.validateHref(href);
  }

  /**
   * Valida que el href sea válido
   */
  private validateHref(href: string): void {
    if (!href || href.trim().length === 0) {
      throw new Error('CTA href cannot be empty');
    }
  }

  /**
   * Verifica si es un enlace interno (hash)
   */
  get isInternalLink(): boolean {
    return this.href.startsWith('#') || this.href.startsWith('/');
  }

  /**
   * Verifica si es un enlace de descarga
   */
  get isDownload(): boolean {
    return !!this.download;
  }

  /**
   * Obtiene el atributo target apropiado
   */
  get targetAttribute(): '_blank' | '_self' | undefined {
    if (this.external && !this.isInternalLink) return '_blank';
    return '_self';
  }

  /**
   * Obtiene los atributos rel apropiados
   */
  get relAttribute(): string | undefined {
    if (this.external && !this.isInternalLink) {
      return 'noopener noreferrer';
    }
    return undefined;
  }

  /**
   * Obtiene las clases CSS según la variante
   */
  getVariantClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300';
    
    const variantClasses: Record<CTAVariant, string> = {
      primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-primary/50',
      secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-lg',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-primary hover:bg-primary/10'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  /**
   * Verifica si debe mostrar icono
   */
  get hasIcon(): boolean {
    return !!this.icon;
  }
}
