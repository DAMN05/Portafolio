// src/presentation/components/sections/Projects/ProjectsSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Project, ProjectCategory } from '@/shared/types/projects.types';
import { PROJECTS_CONTENT, PROJECTS_DATA, PROJECT_CATEGORIES } from '@/shared/constants/projects.constants';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(project => project.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación del subtítulo
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animación de los filtros
      if (filterRef.current) {
        // Asegurar visibilidad inicial
        gsap.set(filterRef.current.children, { opacity: 1, y: 0 });
        
        gsap.from(filterRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true, // Solo animar una vez
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="section py-16 sm:py-20 lg:py-24 bg-dark px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 ref={titleRef} className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {PROJECTS_CONTENT.title}
          </h2>
          {PROJECTS_CONTENT.subtitle && (
            <p ref={subtitleRef} className="text-base sm:text-lg text-light-darker">
              {PROJECTS_CONTENT.subtitle}
            </p>
          )}
        </div>

        {/* Filters */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        >
          {PROJECT_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ProjectCategory)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base opacity-100 ${
                activeCategory === category.id
                  ? 'bg-primary text-white scale-105'
                  : 'bg-dark-lighter text-light-darker hover:bg-primary/20 hover:text-primary'
              }`}
              style={{ opacity: 1 }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="text-light-darker text-base sm:text-lg">
              No hay proyectos en esta categoría aún.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}