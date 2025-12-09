// src/core/entities/SkillCategory.entity.ts

export class SkillCategoryEntity {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly color: string,
    public readonly icon?: string,
    public readonly description?: string
  ) {}

  /**
   * Obtiene el color con opacidad
   */
  getColorWithOpacity(opacity: number): string {
    // Convierte hex a rgba
    const hex = this.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  /**
   * Verifica si el color es oscuro
   */
  get isDarkColor(): boolean {
    const hex = this.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calcula el brillo usando la fórmula de luminosidad
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness < 128;
  }

  /**
   * Obtiene el color del texto basado en el fondo
   */
  get textColor(): string {
    return this.isDarkColor ? '#FFFFFF' : '#000000';
  }
}
