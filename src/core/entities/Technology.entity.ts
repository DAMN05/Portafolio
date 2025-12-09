// src/core/entities/Technology.entity.ts

export class TechnologyEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly icon?: string,
    public readonly color?: string,
    public readonly url?: string,
    public readonly version?: string
  ) {}

  /**
   * Obtiene el nombre con versión si existe
   */
  get displayName(): string {
    return this.version ? `${this.name} ${this.version}` : this.name;
  }

  /**
   * Verifica si tiene documentación
   */
  get hasDocumentation(): boolean {
    return !!this.url;
  }

  /**
   * Obtiene las iniciales de la tecnología
   */
  get initials(): string {
    return this.name
      .split(/[\s-_]/)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  /**
   * Verifica si es una tecnología de JavaScript
   */
  get isJavaScript(): boolean {
    const jsRelated = ['react', 'vue', 'angular', 'nextjs', 'node', 'typescript', 'javascript'];
    return jsRelated.some(tech => this.name.toLowerCase().includes(tech));
  }

  /**
   * Verifica si es un framework
   */
  get isFramework(): boolean {
    const frameworks = ['react', 'vue', 'angular', 'next', 'nuxt', 'svelte', 'express', 'fastify'];
    return frameworks.some(fw => this.name.toLowerCase().includes(fw));
  }

  /**
   * Obtiene el color por defecto según la categoría si no tiene color
   */
  getColor(): string {
    if (this.color) return this.color;
    
    const categoryColors: Record<string, string> = {
      frontend: '#3B82F6',
      backend: '#8B5CF6',
      database: '#10B981',
      devops: '#F59E0B',
      testing: '#EF4444'
    };
    
    return categoryColors[this.category.toLowerCase()] || '#6B7280';
  }
}
