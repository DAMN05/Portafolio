// src/presentation/components/sections/About/ExperienceTimeline.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from '@/shared/types/about.types';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTimelineProps {
  experiences: Experience[];
}

function TimelineItem({ experience, index, isLast }: { 
  experience: Experience; 
  index: number;
  isLast: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del item
      gsap.from(itemRef.current, {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación del dot
      gsap.from(dotRef.current, {
        scale: 0,
        duration: 0.4,
        delay: 0.3,
        scrollTrigger: {
          trigger: dotRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animación de la línea
      if (!isLast && lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          duration: 0.6,
          delay: 0.4,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, itemRef);

    return () => ctx.revert();
  }, [index, isLast]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="relative">
      {/* Dot y Línea - Mobile: izquierda, Desktop: centro */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
        <div
          ref={dotRef}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
            experience.isCurrent ? 'bg-primary' : 'bg-secondary'
          } z-10 ring-4 ring-dark`}
        />
        {!isLast && (
          <div
            ref={lineRef}
            className="w-0.5 h-full bg-gradient-to-b from-primary to-secondary"
          />
        )}
      </div>

      {/* Content - Mobile: todo a la derecha, Desktop: zigzag */}
      <div
        ref={itemRef}
        className={`flex items-start mb-8 md:mb-12 ${
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Espaciado para mobile */}
        <div className="w-12 md:hidden" />
        
        {/* Card container - Siempre alineado a la izquierda */}
        <div className={`
          flex-1 md:w-5/12 md:flex-none
          ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}
        `}>
          <div className="glass rounded-xl p-5 sm:p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            {/* Header con título y badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h4 className="text-lg sm:text-xl font-bold text-white flex-1">{experience.title}</h4>
              {experience.isCurrent && (
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-semibold">
                  ✨ Actual
                </span>
              )}
            </div>
            
            {/* Empresa, ubicación y fechas en una línea */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-light-darker mb-4">
              <span className="text-primary font-semibold">{experience.company}</span>
              {experience.location && (
                <>
                  <span>•</span>
                  <span>📍 {experience.location}</span>
                </>
              )}
              <span>•</span>
              <span>📅 {formatDate(experience.startDate)} - {experience.isCurrent ? 'Presente' : formatDate(experience.endDate!)}</span>
            </div>

            {/* Descripción - más corta y concisa */}
            <p className="text-light-darker mb-4 text-sm sm:text-base leading-relaxed">
              {experience.description}
            </p>

            {/* Highlights - solo los primeros 3 para no saturar */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex flex-wrap gap-2">
                  {experience.highlights.slice(0, 4).map((highlight, i) => (
                    <span key={i} className="text-xs text-light-darker flex items-center gap-1.5">
                      <span className="text-primary">✓</span>
                      <span>{highlight}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Logros - Expandible */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-light uppercase tracking-wide mb-2">Responsabilidades clave</h5>
                <ul className="text-xs sm:text-sm text-light-darker space-y-1.5">
                  {(showAllAchievements ? experience.achievements : experience.achievements.slice(0, 3)).map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
                {experience.achievements.length > 3 && (
                  <button
                    onClick={() => setShowAllAchievements(!showAllAchievements)}
                    className="mt-2 text-xs text-primary hover:text-primary-light font-semibold flex items-center gap-1 transition-colors"
                  >
                    {showAllAchievements ? (
                      <>
                        <span>▲</span>
                        <span>Ver menos</span>
                      </>
                    ) : (
                      <>
                        <span>▼</span>
                        <span>Ver {experience.achievements.length - 3} más</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Tecnologías - Expandible */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {(showAllTechnologies ? experience.technologies : experience.technologies.slice(0, 6)).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {experience.technologies.length > 6 && (
                  <button
                    onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                    className="mt-2 text-xs text-primary hover:text-primary-light font-semibold flex items-center gap-1 transition-colors"
                  >
                    {showAllTechnologies ? (
                      <>
                        <span>▲</span>
                        <span>Ver menos</span>
                      </>
                    ) : (
                      <>
                        <span>▼</span>
                        <span>Ver {experience.technologies.length - 6} tecnologías más</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Espaciadores para desktop */}
        <div className="hidden md:block md:w-2/12" />
        <div className="hidden md:block md:w-5/12" />
      </div>
    </div>
  );
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
      >
        Experiencia
      </h3>

      <div className="relative px-2 sm:px-0">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            experience={exp}
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
}