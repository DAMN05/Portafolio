'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTypingEffect } from '@/presentation/hooks/useTypingEffect';
import { 
  HERO_CONTENT,  
  HERO_STATS, 
  HERO_ANIMATION_CONFIG
} from '@/shared/constants/hero.constants';

export const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { displayText: typedTitle, isComplete: titleComplete } = useTypingEffect({
    text: HERO_CONTENT.title,
    speed: 80,
    delay: 500,
  });

  useEffect(() => {
    let tl: GSAPTimeline | undefined;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      tl = gsap.timeline({ delay: HERO_ANIMATION_CONFIG.delay });
      tl.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          descriptionRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          statsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    })();

    return () => {
      if (tl && typeof tl.kill === 'function') tl.kill();
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="hero-shell relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="container-custom relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="surface-card relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/10" />
              <Image
                src="/images/Perfil/Foto.png"
                alt="Foto de perfil de Daniel Ramirez"
                fill
                priority
                sizes="(max-width: 1024px) 320px, 420px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 text-center lg:text-left max-w-3xl lg:max-w-none">
            {/* Título principal con efecto typing */}
            <div className="space-y-3 sm:space-y-4">
              <h1 ref={titleRef} className="section-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">
                  {typedTitle}
                  {!titleComplete && (
                    <span className="inline-block w-1 h-[0.8em] ml-1 bg-primary animate-pulse"></span>
                  )}
                </span>
              </h1>
              <h2 ref={subtitleRef} className="text-balance text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-[color:var(--text-muted)]">
                {HERO_CONTENT.subtitle}
              </h2>
            </div>

            {/* Descripción */}
            <p ref={descriptionRef} className="section-subtitle text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
              {HERO_CONTENT.description}
            </p>

            {/* CTAs - Modernos y con jerarquía clara */}
              <div ref={buttonsRef} className="flex flex-col lg:flex-row flex-wrap gap-4 sm:gap-5 items-center lg:items-start justify-center lg:justify-start">
              {/* CTA Primario - Máxima jerarquía con efectos visuales */}
              <a
                href={HERO_CONTENT.primaryCTA.href}
                className="btn btn-primary w-full lg:w-auto relative overflow-hidden flex items-center gap-3"
                aria-label={HERO_CONTENT.primaryCTA.text}
                role="button"
                title={HERO_CONTENT.primaryCTA.text}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {HERO_CONTENT.primaryCTA.text}
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>

              {/* CTA Secundario - Diseño glassmorphism */}
              <a
                href={HERO_CONTENT.secondaryCTA.href}
                className="btn btn-secondary w-full lg:w-auto flex items-center gap-2"
                aria-label={HERO_CONTENT.secondaryCTA.text}
                role="button"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {HERO_CONTENT.secondaryCTA.text}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Stats rápidos - Diseño moderno con cards */}
            <div ref={statsRef} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 pt-8 sm:pt-10">
              {HERO_STATS.map((stat, index) => (
                <div key={index} className="surface-card card-interactive flex flex-col items-center lg:items-start min-w-[100px] sm:min-w-[140px] lg:min-w-[160px] p-3 sm:p-4 lg:p-5 rounded-2xl text-center lg:text-left">
                  <div className="badge-pill mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs lg:text-sm text-[color:var(--text-muted)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
