// src/presentation/components/sections/About/SkillsGrid.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skill, SkillCategory, SkillLevel } from '@/shared/types/about.types';
import { SKILL_CATEGORIES } from '@/shared/constants/about.constants';
import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma
} from 'react-icons/fa';
import {
  TbBrandNextjs, TbBrandThreejs
} from 'react-icons/tb';
import {
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiGreensock, SiPython, SiFastapi
} from 'react-icons/si';
import { IconType } from 'react-icons';

gsap.registerPlugin(ScrollTrigger);

// Mapeo de iconos por ID de skill
const SKILL_ICONS: Record<string, IconType> = {
  react: FaReact,
  nextjs: TbBrandNextjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nodejs: FaNodeJs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  python: SiPython,
  fastapi: SiFastapi,
  threejs: TbBrandThreejs,
  r3f: FaReact, // React Three Fiber usa el icono de React
  gsap: SiGreensock,
  git: FaGitAlt,
  docker: FaDocker,
  figma: FaFigma,
};

interface SkillsGridProps {
  skills: Skill[];
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.05,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // Función auxiliar para obtener el color del badge según el nivel
  const getLevelBadgeColor = (level: string): string => {
    const colors: Record<string, string> = {
      'Básico': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'Intermedio': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Avanzado': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Experto': 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    };
    return colors[level] || colors['Intermedio'];
  };

  const SkillIcon = SKILL_ICONS[skill.id];

  return (
    <div
      ref={cardRef}
      className="animate-card glass rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border border-white/5 group"
    >
      {/* Icono */}
      <div 
        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
        style={{ 
          backgroundColor: `${skill.color}20`,
          color: skill.color || '#3B82F6'
        }}
      >
        {SkillIcon ? <SkillIcon /> : skill.name.charAt(0)}
      </div>

      {/* Nombre de la skill */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
        {skill.name}
      </h3>

      {/* Badge de nivel */}
      <div className="mb-3">
        <span 
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getLevelBadgeColor(skill.level)}`}
        >
          {skill.level}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-400 leading-relaxed">
        {skill.description}
      </p>
    </div>
  );
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const titleRef = useRef<HTMLHeadingElement>(null);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h3 
        ref={titleRef}
        className="section-title text-3xl md:text-4xl font-bold text-center mb-8"
      >
        Habilidades Técnicas
      </h3>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-dark-lighter text-light-darker hover:bg-primary/20'
          }`}
        >
          Todas
        </button>
        {SKILL_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as SkillCategory)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-dark-lighter text-light-darker hover:bg-primary/20'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}