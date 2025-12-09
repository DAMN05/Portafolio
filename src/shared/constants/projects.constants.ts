// src/shared/constants/projects.constants.ts

import { Project, ProjectsContent } from '@/shared/types/projects.types';

export const PROJECTS_CONTENT: ProjectsContent = {
  title: "Proyectos ",
  subtitle: "Algunos de mis trabajos más recientes"
};

export const PROJECTS_DATA: Project[] = [
  {
    
  id: 'OMI',
  title: 'OMI Stream Web Platform',
  shortDescription: 'Plataforma de streaming responsiva con exploración de catálogo, reproducción, favoritos, comentarios y subtítulos.',
  longDescription:
    'Plataforma completa de streaming construida con React, TypeScript y un backend en Node.js + Express. Permite registro de usuarios, exploración de películas, reproducción segura desde proveedores externos, sistema de favoritos, calificaciones, comentarios y subtítulos. Implementada siguiendo principios de UX/UI, heurísticas de Nielsen y pautas WCAG, con despliegue en Vercel y Render y base de datos en MongoDB Atlas.',
  category: 'fullstack',
  technologies: [
    'React',
    'TypeScript',
    'Vite',
    'Node.js',
    'Express',
    'MongoDB Atlas',
    'Cloudinary'
  ],
    images: [
      '/images/projects/OMI/omi2.png',
      '/images/projects/OMI/omi3.png',
      '/images/projects/OMI/omi4.png',
    ],
    thumbnail: '/images/projects/OMI/omi.png',
   //githubUrl: '',
  //liveUrl: '',
  featured: true,
  completedAt: '2024-12',
  highlights: [
    'Autenticación completa: registro, login, recuperación y borrado de cuenta',
    'Exploración y reproducción de películas desde API y Cloudinary',
    'Sistema de favoritos, calificaciones (1-5 estrellas) y CRUD de comentarios',
    'Subtítulos activables en español e inglés',
    'Frontend responsivo con 10 heurísticas de Nielsen y pautas WCAG',
    'Backend REST con endpoints seguros y documentación JSDoc',
    'Gestión del proyecto con sprints SCRUM en Taiga y control de versiones en GitHub'
  ]
  },
  {
  id: 'PORTAFOLIO',
  title: 'PORTAFOLIO 3D',
  shortDescription: 'Portfolio moderno para mostrar proyectos, habilidades y experiencia profesional.',
  longDescription:
    'Portfolio web desarrollado con React, TypeScript y Vite, diseñado para destacar proyectos, habilidades y experiencia profesional. Incluye animaciones, secciones personalizadas, filtrado de proyectos por categoría, integración con Three.js para experiencias 3D, y diseño responsivo siguiendo principios de UX/UI y accesibilidad. Desplegado en Vercel, con gestión de imágenes optimizada y código modular.',
  category: '3d',
  technologies: [
    'React',
    'TypeScript',
    'Vite',
    'Three.js',
    'TailwindCSS',
    'Framer Motion',
    'Vercel'
  ],
  images: [
    '/images/projects/PORTF/INICIO.png',
    '/images/projects/PORTF/AM.png',
    '/images/projects/PORTF/portfolio3.png'
  ],
  thumbnail: '/images/projects/PORTF/INICIO.png',
  //githubUrl: ''
  //liveUrl: '',
  featured: false,
  completedAt: '2025-01',
  highlights: [
    'Diseño responsivo y accesible',
    'Animaciones con Framer Motion',
    'Filtrado dinámico de proyectos',
    'Integración de experiencias 3D con Three.js',
    'Optimización de imágenes y performance',
    'Despliegue continuo en Vercel',
    'Código modular y escalable'
  ],
  },
    {
    id: 'todo-list',
    title: 'CheckNote Platform',
    shortDescription: 'Aplicación moderna para gestionar tareas con categorías, prioridades y subtareas.',
    longDescription:
      'Plataforma completa de gestión de tareas desarrollada con Next.js  y TypeScript. Incluye autenticación, creación y organización de tareas, filtros avanzados, subtareas, recordatorios y notas. El backend implementa una arquitectura basada en controladores, servicios y DAO para un acceso a datos limpio y escalable. Proyecto desplegado con frontend en Vercel, backend en Render y base de datos en MongoDB Atlas.',
    category: 'fullstack',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Node.js',
      'Express',
      'MongoDB',
      'DAO Pattern'
    ],
    images: [
      '/images/projects/CHECK/INICIO.png',
      '/images/projects/CHECK/LOGIN.png',
      '/images/projects/CHECK/KANBAN.png',
      '/images/projects/CHECK/CREAR.png'
    ],
    thumbnail: '/images/projects/CHECK/KANBAN.png',
   // githubUrl: '',
    //liveUrl: '',
    featured: false,
    completedAt: '2025-01',
    highlights: [
      'Gestión completa de tareas, categorías, prioridades y subtareas',
      'Implementación del patrón DAO para acceso a datos desacoplado',
      'Frontend moderno con Next.js 14 y TailwindCSS',
      'Arquitectura escalable basada en controladores, servicios y DAO',
      'Filtros avanzados por estado, prioridad y categoría',
      'Despliegue fullstack con Vercel, Render y MongoDB Atlas'
    ]
  },

 {
  id: 'inventory-AI-system',
  title: 'Stock Vision Technology (SVT) — Inventory AI System',
  shortDescription: 'Sistema web moderno y escalable para gestión de inventarios con IA conversacional, arquitectura de 3 capas y módulos completos para control de stock, proveedores, bodegas, kardex y reportes.',
  
  longDescription: `
Stock Vision Technology (SVT) es un sistema completo de gestión de inventarios desarrollado con un stack moderno (Next.js + FastAPI + PostgreSQL), integrado con IA conversacional mediante LLMs y MCP (Model Context Protocol). Diseñado siguiendo los principios y dominios del PMBOK 7, incorpora arquitectura de 3 capas, módulos transaccionales robustos, reportes PDF/Excel, control de kardex, autenticación con roles, gestión de bodegas y un prototipo de predicción de demanda mediante IA.

El proyecto fue desarrollado adoptando un ciclo de vida híbrido con foco en la entrega de valor, incorporando prácticas ágiles, EDT hasta nivel 3, matriz RACI, análisis de riesgos, KPIs técnicos y de negocio, estrategia de involucramiento, liderazgo distribuido y despliegue con Docker Compose.

SVT resuelve problemas comunes en la gestión de inventarios como errores manuales, falta de trazabilidad, ausencia de reportes confiables y poca automatización. Además, integra una interfaz conversacional que permite consultar productos y estados del inventario en lenguaje natural, haciendo el sistema más intuitivo y accesible.
  `,
  
  category: 'fullstack',
  technologies: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'TanStack Query',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Docker',
    'OpenAI API',
    'MCP'
  ],

  images: [
    '/images/projects/SVT/Inventario.png',
    '/images/projects/SVT/Productos.png',
    '/images/projects/SVT/IA.png',
  ],

  thumbnail: '/images/projects/SVT/Inventario.png',

  //githubUrl: '',
  //liveUrl: '',
  featured: true,
  completedAt: '2025-04',

  highlights: [
    'Interfaz conversacional con IA para consultas en lenguaje natural',
    'Arquitectura escalable de 3 capas (Frontend, Backend, DB)',
    'Módulos completos: usuarios, inventario, proveedores, bodegas y kardex',
    'Reportes en PDF/Excel (kardex, productos críticos, movimientos)',
    'Predicción de demanda usando prototipo con IA',
    'UX/UI responsiva diseñada para minimizar errores operativos',
    'Integración entre FastAPI ↔ Next.js mediante Axios Interceptors',
    'Despliegue con Docker Compose listo para producción',
    'Cumplimiento de principios y dominios del PMBOK 7'
  ],

  
},

{
  id: 'uv-weather-station',
  title: 'Estación Meteorológica Inteligente UV ',
  shortDescription:
    'Red de estaciones meteorológicas universitarias con módulos estadísticos y librerías científicas desarrolladas desde cero, comunicación entre nodos y una interfaz gráfica propia diseñada para investigación ambiental.',

  longDescription: `
Proyecto de investigación colaborativo entre el área de Electrónica y el equipo de Desarrollo de Software de la Universidad del Valle. El objetivo es crear una estación meteorológica base totalmente replicable, capaz de comunicarse con nodos secundarios instalados en distintas sedes de la universidad.

El equipo de software desarrolló desde cero un conjunto de librerías estadísticas y científicas en Python para el procesamiento de series temporales ambientales, cálculo de promedios móviles, tendencias, anomalías, rangos de variabilidad, picos y correlaciones climáticas. Esto evita depender de librerías de terceros y garantiza control total sobre el rendimiento, precisión y portabilidad del sistema.

Además, se está construyendo una interfaz gráfica propietaria, optimizada para hardware de bajo consumo, que permite visualizar datos en tiempo real, gráficas dinámicas, alertas y dashboards ambientales. También se está implementando un protocolo de comunicación entre nodos para que la estación principal pueda recibir y distribuir datos de otras estaciones remotas.

El proyecto se desarrolla mediante metodologías ágiles con sprints quincenales, reuniones interdisciplinarias constantes con el grupo de electrónica (responsables del hardware y sensores) y enfoque modular para facilitar su despliegue en múltiples campus.`,
  
  category: 'fullstack',
  
  technologies: [
    'Python',
    'Custom Scientific Libraries',
    'Custom Visualization Engine',
    'Socket Communication',
    'MQTT',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Docker',
    'Raspberry Pi',
    'ESP32'
  ],

  images: [
    '/images/projects/ET/interfaz.png',
    
  ],

  thumbnail: '/images/projects/ET/interfaz.png',

  //githubUrl: '',
  //liveUrl: '',
  featured: true,
  completedAt: 'En progreso',

  highlights: [
    'Librerías estadísticas y científicas desarrolladas totalmente desde cero',
    'Motor propio de visualización para gráficas y series temporales',
    'Arquitectura replicable para estaciones en múltiples campus universitarios',
    'Comunicación entre nodos mediante MQTT y sockets personalizados',
    'Procesamiento en tiempo real de datos ambientales desde sensores físicos',
    'Colaboración interdisciplinaria con el equipo de Electrónica',
    'Optimización para hardware de bajo consumo (Raspberry Pi / ESP32)',
    'Interfaz gráfica liviana, multiplataforma y diseñada desde cero',
    'Desarrollo bajo metodologías ágiles con sprints y revisión continua'
  ]
},

 {
  id: 'uv-video-platform',
  title: 'Plataforma de Videoconferencias UV',
  shortDescription:
    'Plataforma web moderna para videoconferencias, mensajería en tiempo real y gestión de usuarios, desarrollada con frontend responsivo, backend escalable y base de datos integrada.',

  longDescription: `
Proyecto académico de desarrollo fullstack enfocado en construir una plataforma de videoconferencias
capaz de ofrecer comunicación en tiempo real, gestión de usuarios, autenticación segura y módulos
básicos de mensajería. El sistema se diseñó aplicando arquitectura cliente-servidor, despliegue web
y metodologías ágiles.

El frontend implementa una interfaz moderna y responsiva para crear reuniones, unirse a salas y
administrar usuarios. El backend expone endpoints para autenticación, sesiones, reuniones y la
comunicación entre clientes. La base de datos almacena usuarios, salas y registros de actividad.
El desarrollo se evaluó según los criterios de la rúbrica MP3: funcionamiento, conexión entre
frontend–backend, despliegue en la web, gestión de datos y diseño visual.
  `,

  category: 'fullstack',

  technologies: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Express',
    'WebRTC',
    'Socket.IO',
    'MongoDB',
    'JWT',
    'Docker'
  ],

  images: [
    '/images/projects/NEXUN/INICIO.png',
    '/images/projects/NEXUN/SOBRENOS.png'
   
  ],

  thumbnail: '/images/projects/NEXUN/INICIO.png',

  //githubUrl: '',
  //liveUrl: ',
  featured: true,
  completedAt: '2025-02',

  highlights: [
    'Frontend responsivo con React + TypeScript y diseño moderno',
    'Backend en Node.js + Express con módulos de autenticación y gestión de salas',
    'Implementación de videollamadas usando WebRTC y transmisión en tiempo real',
    'Mensajería en tiempo real con Socket.IO',
    'Base de datos MongoDB para almacenamiento de usuarios, sesiones y reuniones',
    'Despliegue en Vercel (cliente) y Render (servidor)',
    'Arquitectura cliente-servidor totalmente funcional y conectada',
    
  ]
},

];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'fullstack', label: 'Web Full Stack' },
  { id: '3d', label: '3D' },
  
] as const;