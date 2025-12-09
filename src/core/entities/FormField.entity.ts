// src/core/entities/FormField.entity.ts

export type FormFieldType = 'text' | 'email' | 'textarea' | 'tel' | 'url' | 'number';

export class FormFieldEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: FormFieldType,
    public readonly label: string,
    public readonly placeholder?: string,
    public readonly required: boolean = false,
    public readonly minLength?: number,
    public readonly maxLength?: number,
    public readonly pattern?: RegExp
  ) {}

  /**
   * Valida el valor del campo
   */
  validate(value: string): { isValid: boolean; error?: string } {
    // Campo requerido
    if (this.required && !value.trim()) {
      return {
        isValid: false,
        error: `${this.label} es requerido`
      };
    }

    // No requerido y vacío - es válido
    if (!this.required && !value.trim()) {
      return { isValid: true };
    }

    // Longitud mínima
    if (this.minLength && value.length < this.minLength) {
      return {
        isValid: false,
        error: `${this.label} debe tener al menos ${this.minLength} caracteres`
      };
    }

    // Longitud máxima
    if (this.maxLength && value.length > this.maxLength) {
      return {
        isValid: false,
        error: `${this.label} no puede exceder ${this.maxLength} caracteres`
      };
    }

    // Validación de email
    if (this.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return {
          isValid: false,
          error: 'Email inválido'
        };
      }
    }

    // Validación de teléfono
    if (this.type === 'tel') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return {
          isValid: false,
          error: 'Teléfono inválido'
        };
      }
    }

    // Validación de URL
    if (this.type === 'url') {
      try {
        new URL(value);
      } catch {
        return {
          isValid: false,
          error: 'URL inválida'
        };
      }
    }

    // Patrón personalizado
    if (this.pattern && !this.pattern.test(value)) {
      return {
        isValid: false,
        error: `${this.label} tiene formato inválido`
      };
    }

    return { isValid: true };
  }

  /**
   * Obtiene el tipo de input HTML
   */
  get inputType(): string {
    return this.type;
  }

  /**
   * Verifica si es un campo de texto largo
   */
  get isTextarea(): boolean {
    return this.type === 'textarea';
  }

  /**
   * Obtiene el placeholder o genera uno por defecto
   */
  getPlaceholder(): string {
    if (this.placeholder) return this.placeholder;
    
    const defaults: Record<FormFieldType, string> = {
      text: `Ingresa tu ${this.label.toLowerCase()}`,
      email: 'tu@email.com',
      textarea: `Escribe tu ${this.label.toLowerCase()}...`,
      tel: '+1 234 567 8900',
      url: 'https://ejemplo.com',
      number: '0'
    };
    
    return defaults[this.type] || '';
  }
}
