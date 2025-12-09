// src/core/entities/Stat.entity.ts

export class StatEntity {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly value: string,
    public readonly suffix?: string,
    public readonly prefix?: string,
    public readonly animationDuration: number = 2000
  ) {}

  /**
   * Obtiene el valor completo con prefix y suffix
   */
  get fullValue(): string {
    const prefixStr = this.prefix || '';
    const suffixStr = this.suffix || '';
    return `${prefixStr}${this.value}${suffixStr}`;
  }

  /**
   * Obtiene el valor numérico (si es un número)
   */
  get numericValue(): number | null {
    const cleanValue = this.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanValue);
    return isNaN(num) ? null : num;
  }

  /**
   * Verifica si el valor es numérico
   */
  get isNumeric(): boolean {
    return this.numericValue !== null;
  }

  /**
   * Obtiene la duración de animación en segundos
   */
  get animationDurationSeconds(): number {
    return this.animationDuration / 1000;
  }

  /**
   * Crea un array de valores intermedios para animación
   */
  getAnimationSteps(steps: number = 20): number[] {
    if (!this.isNumeric || this.numericValue === null) return [];
    
    const target = this.numericValue;
    const stepSize = target / steps;
    
    return Array.from({ length: steps }, (_, i) => 
      Math.round(stepSize * (i + 1))
    );
  }
}
