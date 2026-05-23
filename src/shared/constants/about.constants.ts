import { AboutContent, Skill, Experience } from '@/shared/types/about.types';

export const ABOUT_CONTENT: AboutContent = {
  title: "Sobre Mí",
  description: [
    "Soy un desarrollador Full Stack en formación con una sólida base en análisis, diseño y desarrollo de aplicaciones web y de escritorio. Me apasiona crear experiencias digitales modernas, funcionales y visualmente atractivas, combinando tecnologías como React, Next.js, Three.js, Java y MySQL.",
    "Trabajo con un enfoque en código limpio, escalable y mantenible, aplicando principios de Programación Orientada a Objetos (POO), SOLID y Clean Architecture. Además, tengo experiencia utilizando herramientas como Visual Studio Code, NetBeans y MongoDB, además estoy familiarizado con metodologías ágiles.",
    "Mi objetivo es seguir creciendo como desarrollador, aportando soluciones eficientes e innovadoras a proyectos que integren tecnología, diseño y experiencia de usuario."
  ],
  stats: [
    {
      id: 'experience',
      label: 'Años de Experiencia',
      value: '1',
      suffix: '+',
    },
    {
      id: 'projects',
      label: 'Proyectos Completados',
      value: '7',
      suffix: '+',
    },
    {
      id: 'clients',
      label: 'Clientes Satisfechos',
      value: '15',
      suffix: '+',
    },
  ],
};

export const SKILLS_DATA: Skill[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 'Avanzado',
    description: '+2 años, usado en proyectos reales. Experiencia con hooks, context, y performance optimization.',
    yearsOfExperience: '2+',
    color: '#61DAFB',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    level: 'Avanzado',
    description: '+2 años desarrollando aplicaciones full-stack con SSR, SSG, y API routes.',
    yearsOfExperience: '2+',
    color: '#ffffffff',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 'Avanzado',
    description: '+1 año usando TypeScript para aplicaciones escalables con tipado robusto.',
    yearsOfExperience: '1+',
    color: '#3178C6',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 'Avanzado',
    description: '+2 años creando interfaces responsive y modernas con utility-first CSS.',
    yearsOfExperience: '2+',
    color: '#06B6D4',
  },
  
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 'Avanzado',
    description: '+1 año desarrollando APIs REST y servicios backend con arquitectura limpia.',
    yearsOfExperience: '1+',
    color: '#339933',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    level: 'Avanzado',
    description: '+1 año creando APIs escalables con middleware personalizados y mejores prácticas.',
    yearsOfExperience: '1+',
    color: '#ffffffff',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    level: 'Avanzado',
    description: '+1 año trabajando con bases de datos NoSQL, agregaciones y optimización de queries.',
    yearsOfExperience: '1+',
    color: '#47A248',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    level: 'Intermedio',
    description: '+1 año trabajando con bases de datos relacionales, SQL avanzado y migraciones.',
    yearsOfExperience: '1+',
    color: '#4169E1',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    level: 'Avanzado',
    description: '+1 año desarrollando APIs, procesamiento de datos y librerías científicas personalizadas.',
    yearsOfExperience: '1+',
    color: '#3776AB',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    level: 'Avanzado',
    description: '+1 año creando APIs REST modernas, rápidas y con documentación automática.',
    yearsOfExperience: '1+',
    color: '#009688',
  },
  
  {
    id: 'threejs',
    name: 'Three.js',
    category: '3d',
    level: 'Intermedio',
    description: '+1 año creando experiencias 3D interactivas, iluminación y animaciones complejas.',
    yearsOfExperience: '1+',
    color: '#908c8cff',
  },
  
  {
    id: 'gsap',
    name: 'GSAP',
    category: '3d',
    level: 'Intermedio',
    description: '+1 año creando animaciones fluidas y profesionales con ScrollTrigger.',
    yearsOfExperience: '1+',
    color: '#88CE02',
  },
  
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 'Avanzado',
    description: '+2 años usando control de versiones, branching strategies y resolución de conflictos.',
    yearsOfExperience: '2+',
    color: '#F05032',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    level: 'Intermedio',
    description: '+1 año containerizando aplicaciones y orquestando servicios con docker-compose.',
    yearsOfExperience: '1+',
    color: '#2496ED',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    level: 'Avanzado',
    description: '+2 años diseñando interfaces UI/UX, prototipos interactivos y sistemas de diseño.',
    yearsOfExperience: '2+',
    color: '#F24E1E',
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'inventory-AI-system',
    title: 'Frontend Developer',
    company: 'SVT Company',
    location: 'Presencial',
    type: 'work',
    startDate: '2025-04',
    isCurrent: true,
    description: 'Desarrollo de un sistema de gestión de inventario moderno que combina tecnologías web robustas (FastAPI + Next.js) con el poder de los LLMs (Large Language Models) y MCP (Model Context Protocol) para crear una experiencia intuitiva, conversacional y personalizada.',
    highlights: [
      '🤖 Interfaz conversacional impulsada por IA',
      '💬 Consultas en lenguaje natural sobre productos',
      '🎯 Personalización automática con MCP',
      '🚀 Arquitectura escalable lista para producción'
    ],
    achievements: [
      'Desarrollé la interfaz conversacional impulsada por IA que permite consultas en lenguaje natural',
      'Implementé sistema de personalización automática usando Model Context Protocol (MCP)',
      'Creé componentes reutilizables en Next.js + React para gestión de productos y stock',
      'Integré OpenAI API para procesamiento de lenguaje natural en operaciones de inventario',
      'Colaboré en arquitectura escalable lista para producción con Docker y Docker Compose',
      'Diseñé UX/UI moderna y responsive para operaciones de inventario intuitivas'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'OpenAI API', 'MCP', 'Tailwind CSS', 'Docker', 'FastAPI', 'Python'],
  },
  {
  id: 'uv-weather-station',
  title: 'Fullstack & Scientific Developer — Estación Meteorológica Inteligente UV',
  company: 'Universidad del Valle — Grupo de Electrónica & Software',
  location: 'Presencial / Colaborativo',
  type: 'education',
  startDate: '2025-01',
  isCurrent: true,

  description:
    'Proyecto interdisciplinario para el desarrollo de una estación meteorológica replicable con comunicación entre nodos, análisis estadístico en tiempo real y librerías científicas creadas desde cero en Python. El equipo de software desarrolla la arquitectura, los módulos estadísticos, la interfaz gráfica y el sistema de comunicación entre la estación principal y nodos remotos.',

  highlights: [
    '🌦️ Procesamiento de datos ambientales en tiempo real',
    '📊 Librerías estadísticas propias sin dependencias externas',
    '🔗 Comunicación entre nodos vía MQTT y sockets',
    '🖥️ Interfaz gráfica multiplataforma desarrollada desde cero',
    '🏛️ Proyecto colaborativo con el área de Electrónica',
    '⚡ Optimización para hardware de bajo consumo (Raspberry Pi y ESP32)',
    '🧪 Proyecto investigativo con enfoque en replicabilidad multi-sede'
  ],

  achievements: [
    'Desarrollé librerías estadísticas en Python para procesar series temporales ambientales sin usar dependencias externas',
    'Implementé un motor gráfico propio para visualizar tendencias, alertas y variabilidad climática en tiempo real',
    'Construí el sistema de comunicación entre nodo principal y nodos remotos usando MQTT y sockets personalizados',
    'Diseñé la arquitectura modular del sistema para facilitar su replicación en distintas sedes universitarias',
    'Colaboré directamente con el grupo de Electrónica para integrar sensores de temperatura, humedad, presión y viento',
    'Estructuré la interfaz gráfica optimizada para hardware de bajo consumo y uso académico',
    'Participé en sprints ágiles con reuniones interdisciplinarias y entregas iterativas del módulo estadístico'
  ],

  technologies: [
    'Python',
    'Custom Statistical Libraries',
    'Custom Visualization Engine',
    'MQTT',
    'Socket Communication',
    'Raspberry Pi',
    'ESP32',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Docker',
    'FastAPI'
  ]
},

  {
  id: 'uv-video-platform',
  title: 'Fullstack Developer — Plataforma de Videoconferencias UV',
  company: 'Universidad del Valle',
  location: 'Remoto / Presencial',
  type: 'education',
  startDate: '2025-02',
  isCurrent: false,

  description:
    'Desarrollo fullstack de una plataforma de videoconferencias con comunicación en tiempo real, gestión de usuarios, salas virtuales, autenticación segura, transmisión audiovisual con WebRTC y mensajería instantánea. Implementada con arquitectura cliente-servidor, despliegue web y metodologías ágiles.',

  highlights: [
    '🎥 Videollamadas en tiempo real con WebRTC',
    '💬 Chat instantáneo con Socket.IO',
    '🔐 Autenticación segura y manejo de roles',
    '🌐 Arquitectura fullstack desplegada en la web',
    '🗂️ Gestión completa de salas y sesiones',
    '🚀 UI responsiva y moderna con React + Tailwind'
  ],

  achievements: [
    'Diseñé e implementé el frontend responsivo usando React, TypeScript y Tailwind CSS',
    'Construí el backend en Node.js + Express para manejar autenticación, salas y usuarios',
    'Integré WebRTC para habilitar videollamadas en tiempo real entre múltiples clientes',
    'Desarrollé el sistema de mensajería en tiempo real usando Socket.IO',
    'Implementé una base de datos NoSQL con MongoDB para almacenar usuarios, reuniones y registros',
    'Desplegué el sistema completo usando Vercel (cliente) y Render (servidor)',
    'Aseguré la comunicación cliente-servidor mediante JWT y buenas prácticas de arquitectura REST',
    'Participé en sprints ágiles siguiendo la rúbrica MP3 para implementación, diseño visual y funcionamiento'
  ],

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
  ]
},

];

export const SKILL_CATEGORIES = [
  { id: 'frontend', label: 'Frontend', color: '#3B82F6' },
  { id: 'backend', label: 'Backend', color: '#8B5CF6' },
  { id: '3d', label: '3D & Animation', color: '#F59E0B' },
  { id: 'tools', label: 'Tools', color: '#10B981' },
] as const;