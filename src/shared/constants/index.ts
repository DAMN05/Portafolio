
// Navigation Routes
export const ROUTES = {
    HOME: '/',
    ABOUT: '#about',
    PROJECTS: '#projects',
    CONTACT: '#contact',
  } as const;
  
  // Social Media Links (Actualiza con tus URLs)
  export const SOCIAL_LINKS = {
    GITHUB: 'https://github.com/tu-usuario',
    LINKEDIN: 'https://linkedin.com/in/tu-usuario',
    TWITTER: 'https://twitter.com/tu-usuario',
    EMAIL: 'mailto:tu-email@ejemplo.com',
  } as const;
  
  // Animation Durations
  export const ANIMATION = {
    DURATION: {
      FAST: 0.3,
      NORMAL: 0.5,
      SLOW: 0.8,
      VERY_SLOW: 1.2,
    },
    EASE: {
      DEFAULT: 'power2.out',
      SMOOTH: 'power3.inOut',
      BOUNCE: 'back.out(1.7)',
    },
  } as const;
  
  // Breakpoints (sincronizados con Tailwind)
  export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  } as const;
  
  // Project Categories
  export const PROJECT_CATEGORIES = [
    { value: 'all', label: 'Todos' },
    { value: 'web', label: 'Web' },
    { value: '3d', label: '3D' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'fullstack', label: 'Full Stack' },
  ] as const;
  
  // Skill Categories
  export const SKILL_CATEGORIES = [
    'frontend',
    'backend',
    '3d',
    'tools',
    'other',
  ] as const;
  
  // Email Configuration Keys
  export const EMAIL_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  } as const;
  
  // SEO Metadata
  export const SEO = {
    TITLE: 'Daniel Ramirez - Portfolio',
    DESCRIPTION: 'Portfolio profesional de desarrollo web con experiencias 3D interactivas',
    KEYWORDS: 'developer, portfolio, web development, 3D, React, Next.js',
    URL: 'https://tu-dominio.com',
    OG_IMAGE: '/og-image.jpg',
  } as const;
  
  // Contact Form Validation
  export const VALIDATION = {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
    },
    EMAIL: {
      REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    MESSAGE: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 500,
    },
  } as const;