// src/presentation/components/sections/Projects/ProjectCard.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/shared/types/projects.types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="animate-card glass rounded-xl overflow-hidden group cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-accent text-dark text-xs font-bold rounded-full">
              Destacado
            </span>
          </div>
        )}
        
        {/* Placeholder para imagen - reemplazar con <Image /> cuando tengas las imágenes */}
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
           <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold">Ver Detalles</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-light-darker text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-light/5 text-light-darker text-xs rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary text-center rounded-lg text-sm font-semibold transition-colors"
            >
              Demo
            </a>
          ) : (
            <button
              disabled
              className="flex-1 px-4 py-2 bg-primary/10 text-primary/40 text-center rounded-lg text-sm font-semibold cursor-not-allowed"
            >
              Demo
            </button>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-4 py-2 bg-light/10 hover:bg-light/20 text-light text-center rounded-lg text-sm font-semibold transition-colors"
            >
              GitHub
            </a>
          ) : (
            <button
              disabled
              className="flex-1 px-4 py-2 bg-light/5 text-light/30 text-center rounded-lg text-sm font-semibold cursor-not-allowed"
            >
              GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
}