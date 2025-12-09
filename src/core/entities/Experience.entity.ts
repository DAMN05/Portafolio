// src/core/entities/Experience.entity.ts

export type ExperienceType = 'work' | 'education' | 'freelance';

export class ExperienceEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly company: string,
    public readonly location: string | undefined,
    public readonly type: ExperienceType,
    public readonly startDate: string,
    public readonly endDate: string | undefined,
    public readonly isCurrent: boolean,
    public readonly description: string,
    public readonly achievements: string[] = [],
    public readonly technologies: string[] = []
  ) {}

  /**
   * Calcula la duración en meses
   */
  get durationInMonths(): number {
    const start = new Date(this.startDate);
    const end = this.isCurrent ? new Date() : (this.endDate ? new Date(this.endDate) : new Date());
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    return months;
  }

  /**
   * Obtiene la duración formateada
   */
  get formattedDuration(): string {
    const months = this.durationInMonths;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    } else {
      return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    }
  }

  /**
   * Obtiene el rango de fechas formateado
   */
  get dateRange(): string {
    const startDate = new Date(this.startDate);
    const startFormatted = startDate.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short' 
    });

    if (this.isCurrent) {
      return `${startFormatted} - Presente`;
    }

    if (!this.endDate) {
      return startFormatted;
    }

    const endDate = new Date(this.endDate);
    const endFormatted = endDate.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short' 
    });

    return `${startFormatted} - ${endFormatted}`;
  }

  /**
   * Obtiene el año de inicio
   */
  get startYear(): number {
    return new Date(this.startDate).getFullYear();
  }

  /**
   * Obtiene el año de fin
   */
  get endYear(): number | null {
    if (this.isCurrent || !this.endDate) return null;
    return new Date(this.endDate).getFullYear();
  }

  /**
   * Obtiene el label del tipo de experiencia
   */
  get typeLabel(): string {
    const labels: Record<ExperienceType, string> = {
      work: 'Trabajo',
      education: 'Educación',
      freelance: 'Freelance'
    };
    return labels[this.type];
  }

  /**
   * Obtiene el color según el tipo
   */
  getTypeColor(): string {
    const colors: Record<ExperienceType, string> = {
      work: '#3B82F6',
      education: '#8B5CF6',
      freelance: '#10B981'
    };
    return colors[this.type];
  }
}
