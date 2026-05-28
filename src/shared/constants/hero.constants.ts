import { HeroContent } from "@/shared/types/hero.types";

export const HERO_CONTENT: HeroContent = {
  title: "Daniel Ramirez",
  subtitle: "Full Stack Developer ",
  description:
    "Especializado en desarrollo web moderno con React, Next.js . Transformo ideas en productos digitales de alta calidad.",
  primaryCTA: {
    text: "Ver Proyectos",
    href: "#projects",
    variant: "primary",
  },
  secondaryCTA: {
    text: "Contacto",
    href: "#contact",
    variant: "secondary",
  },
};

export const HERO_STATS = [
  {
    value: "1+",
    label: "Año de experiencia",
  },
  {
    value: "7+",
    label: "Proyectos completados",
  },
  {
    value: "10+",
    label: "Clientes satisfechos",
  },
];

export const HERO_ANIMATION_CONFIG = {
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.5,
};
