'use client';

import { useEffect, useRef } from 'react';
import StatsCards from './StatsCards';
import SkillsGrid from './SkillsGrid';
import ExperienceTimeline from './ExperienceTimeline';
import { 
  ABOUT_CONTENT, 
  SKILLS_DATA, 
  EXPERIENCE_DATA 
} from '@/shared/constants/about.constants';

export default function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);


  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const scrollMod = await import('gsap/ScrollTrigger');
      const ScrollTrigger = scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
    })();

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
    };
  }, []);

  return (
    <section 
      id="about" 
      className="section-shell section-shell--alt px-4 sm:px-6 lg:px-8"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="section-kicker mb-5 justify-center">
            Sobre mí
          </div>
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
                  className="section-subtitle text-base sm:text-lg leading-relaxed text-justify"
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