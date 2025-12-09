// src/presentation/components/sections/About/AboutSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatsCards from './StatsCards';
import SkillsGrid from './SkillsGrid';
import ExperienceTimeline from './ExperienceTimeline';
import { 
  ABOUT_CONTENT, 
  SKILLS_DATA, 
  EXPERIENCE_DATA 
} from '@/shared/constants/about.constants';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);


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

      // Animación de las descripciones
      descriptionRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.from(ref, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      className="section py-16 sm:py-20 lg:py-24 bg-dark-lighter/30 px-4 sm:px-6 lg:px-8"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 
            ref={titleRef}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center"
          >
            {ABOUT_CONTENT.title}
          </h2>
          
          <div className="space-y-4 sm:space-y-5">
            {ABOUT_CONTENT.description.map((paragraph, index) => (
              <p
                  key={index}
                  ref={(el) => {
                  descriptionRefs.current[index] = el;
                  }}
                  className="text-base sm:text-lg text-light-darker leading-relaxed text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={ABOUT_CONTENT.stats} />

        {/* Skills Grid */}
        <div className="mb-16 sm:mb-20">
          <SkillsGrid skills={SKILLS_DATA} />
        </div>

        {/* Experience Timeline */}
        <ExperienceTimeline experiences={EXPERIENCE_DATA} />
      </div>
    </section>
  );
}