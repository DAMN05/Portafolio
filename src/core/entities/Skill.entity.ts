// src/core/entities/Skill.entity.ts

export type SkillCategory = 'frontend' | 'backend' | '3d' | 'tools' | 'other';
export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';

export class SkillEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: SkillCategory,
    public readonly level: SkillLevel,
    public readonly description: string,
    public readonly color: string,
    public readonly yearsOfExperience?: string,
    public readonly icon?: string
  ) {}

  /**
   * Obtiene el color del badge según el nivel
   */
  get levelBadgeColor(): string {
    const colors: Record<SkillLevel, string> = {
      'Básico': 'bg-gray-500/20 text-gray-300',
      'Intermedio': 'bg-blue-500/20 text-blue-300',
      'Avanzado': 'bg-green-500/20 text-green-300',
      'Experto': 'bg-purple-500/20 text-purple-300'
    };
    return colors[this.level];
  }

  /**
   * Verifica si la habilidad es de nivel experto
   */
  get isExpert(): boolean {
    return this.level === 'Experto';
  }

  /**
   * Verifica si la habilidad es de nivel avanzado o superior
   */
  get isAdvanced(): boolean {
    return this.level === 'Avanzado' || this.level === 'Experto';
  }

  /**
   * Obtiene el label de la categoría
   */
  getCategoryLabel(): string {
    const labels: Record<SkillCategory, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      '3d': '3D/WebGL',
      tools: 'Herramientas',
      other: 'Otros'
    };
    return labels[this.category];
  }
}
