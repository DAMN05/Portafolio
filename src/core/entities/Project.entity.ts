// src/core/entities/Project.entity.ts

export type ProjectCategory = 'all' | 'web' | '3d' | 'mobile' | 'fullstack';

export class ProjectEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly shortDescription: string,
    public readonly longDescription: string,
    public readonly category: ProjectCategory,
    public readonly technologies: string[],
    public readonly images: string[],
    public readonly thumbnail: string,
    public readonly githubUrl?: string,
    public readonly liveUrl?: string,
    public readonly featured: boolean = false,
    public readonly completedAt?: string,
    public readonly highlights?: string[]
  ) {}

  /**
   * Verifica si el proyecto tiene una URL pública
   */
  get hasLiveDemo(): boolean {
    return !!this.liveUrl;
  }

  /**
   * Verifica si el proyecto tiene repositorio público
   */
  get hasPublicRepo(): boolean {
    return !!this.githubUrl;
  }

  /**
   * Obtiene el año de completación
   */
  get completionYear(): string | undefined {
    if (!this.completedAt) return undefined;
    const date = new Date(this.completedAt);
    return date.getFullYear().toString();
  }

  /**
   * Verifica si el proyecto es reciente (últimos 6 meses)
   */
  get isRecent(): boolean {
    if (!this.completedAt) return false;
    const completionDate = new Date(this.completedAt);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return completionDate >= sixMonthsAgo;
  }

  /**
   * Obtiene el color según la categoría
   */
  getCategoryColor(): string {
    const colors: Record<ProjectCategory, string> = {
      all: '#6B7280',
      web: '#61DAFB',
      fullstack: '#7C3AED',
      '3d': '#FF6B6B',
      mobile: '#4B5563'
    };
    return colors[this.category] || '#6B7280';
  }

  /**
   * Obtiene el label de la categoría
   */
  getCategoryLabel(): string {
    const labels: Record<ProjectCategory, string> = {
      all: 'Todos',
      web: 'Web',
      fullstack: 'Full Stack',
      '3d': '3D/WebGL',
      mobile: 'Mobile'
    };
    return labels[this.category] || this.category;
  }
}
