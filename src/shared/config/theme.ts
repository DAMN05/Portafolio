export const theme = {
    colors: {
      primary: '#3B82F6',      // Azul 
      secondary: '#8B5CF6',    // Púrpura 
      accent: '#F59E0B',       // Amarillo/Naranja 
      dark: '#0F172A',         // Fondo oscuro
      light: '#F8FAFC',        // Texto claro
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      section: '5rem',
    },
  } as const;
  
  export type Theme = typeof theme;