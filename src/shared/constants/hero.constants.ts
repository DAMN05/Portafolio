// src/shared/constants/hero.constants.ts

import { HeroContent, Hero3DConfig } from '@/shared/types/hero.types';

export const HERO_CONTENT: HeroContent = {
  title: "Daniel Ramirez", 
  subtitle: "Full Stack Developer & 3D Enthusiast",
  description: "Especializado en desarrollo web moderno con React, Next.js y experiencias 3D interactivas. Transformo ideas en productos digitales de alta calidad.",
  primaryCTA: {
    text: "Ver Proyectos",
    href: "#projects",
    variant: "primary"
  },
  secondaryCTA: {
    text: "Contacto",
    href: "#contact",
    variant: "secondary"
  }
};

export const HERO_BADGE = {
  icon: "✨",
  text: "Disponible para proyectos"
};

export const HERO_STATS = [
  {
    value: "1+",
    label: "Años de experiencia"
  },
  {
    value: "7+",
    label: "Proyectos completados"
  },
  {
    value: "10+",
    label: "Clientes satisfechos"
  }
];

export const HERO_SCROLL_INDICATOR = {
  text: "Scroll",
  iconPath: "M19 14l-7 7m0 0l-7-7m7 7V3"
};

export const HERO_3D_CONFIG: Hero3DConfig = {
  particlesCount: 100,
  cameraPosition: [0, 0, 5],
  animationSpeed: 0.5,
  mouseInfluence: 0.1,
  avatarUrl: "https://models.readyplayer.me/690bb0ac672cca15c2fb4c23.glb",
  avatarPosition: [2.5, 0, 0]
};

export const HERO_ANIMATION_CONFIG = {
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.5
};

export const HERO_GRADIENT_OVERLAY = {
  from: "dark/95",
  via: "dark/70",
  to: "transparent"
};

export const AVATAR_LIGHTS_CONFIG = {
  ambient: {
    intensity: 0.5
  },
  directional: {
    position: [5, 5, 5] as [number, number, number],
    intensity: 1.2
  },
  spotlight: {
    position: [-5, 5, 0] as [number, number, number],
    intensity: 0.5,
    angle: 0.3,
    penumbra: 1,
    color: "#00d4ff"
  },
  pointLight: {
    position: [0, 2, 2] as [number, number, number],
    intensity: 0.5,
    color: "#ff00ff"
  }
};

export const AVATAR_PARTICLES_CONFIG = {
  size: 0.05,
  color: "#00d4ff",
  opacity: 0.6,
  rotationSpeed: 0.05,
  floatAmplitude: 0.5
};

export const AVATAR_FLOAT_CONFIG = {
  speed: 2,
  rotationIntensity: 0.3,
  floatIntensity: 0.6
};

export const AVATAR_STARS_CONFIG = {
  radius: 100,
  depth: 50,
  count: 1000,
  factor: 4,
  saturation: 0,
  speed: 1
};

export const AVATAR_SHADOWS_CONFIG = {
  position: [0, -1.5, 0] as [number, number, number],
  opacity: 0.6,
  blur: 3,
  far: 4,
  color: "#000033"
};

export const AVATAR_MOUSE_SENSITIVITY = {
  x: 1.2,
  y: 0.8,
  duration: 0.3
};

export const AVATAR_LOADER_CONFIG = {
  containerStyles: { background: 'rgba(0, 0, 0, 0.9)' },
  innerStyles: { background: '#00d4ff' },
  barStyles: { background: '#ff00ff', height: '3px' }
};