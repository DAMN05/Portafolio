export type ProjectCategory = "all" | "web" | "3d" | "mobile" | "fullstack";

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
    public readonly completedAt?: string[],
    public readonly highlights?: string[],
  ) {}

  private parseCompletionDates(dates?: string[]): Date[] {
    if (!dates) return [];
    const normalize = (d: string) => d.trim().replace(/\.+$/g, "");
    const toDate = (d: string) => {
      const clean = normalize(d);
      const ym = /^\d{4}-\d{2}$/;
      const date = ym.test(clean) ? new Date(clean + "-01") : new Date(clean);
      return isNaN(date.getTime()) ? null : date;
    };
    return dates.map(toDate).filter((d): d is Date => d !== null);
  }

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
  get completionYear(): string[] | undefined {
    const dates = this.parseCompletionDates(this.completedAt);
    if (!dates || dates.length === 0) return undefined;
    return dates.map((d) => d.getFullYear().toString());
  }

  /**
   * Verifica si el proyecto es reciente (últimos 6 meses)
   */
  get isRecent(): boolean {
    const completionDates = this.parseCompletionDates(this.completedAt);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return completionDates.some((date) => date >= sixMonthsAgo);
  }

  /**
   * Obtiene el color según la categoría
   */
  getCategoryColor(): string {
    const colors: Record<ProjectCategory, string> = {
      all: "#6B7280",
      web: "#61DAFB",
      fullstack: "#7C3AED",
      "3d": "#FF6B6B",
      mobile: "#4B5563",
    };
    return colors[this.category] || "#6B7280";
  }

  /**
   * Obtiene el label de la categoría
   */
  getCategoryLabel(): string {
    const labels: Record<ProjectCategory, string> = {
      all: "Todos",
      web: "Web",
      fullstack: "Full Stack",
      "3d": "3D/WebGL",
      mobile: "Mobile",
    };
    return labels[this.category] || this.category;
  }
}
