'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '../../common/Button/Button';
import { useScrollProgress } from '@/presentation/hooks/useScrollProgress';
import { useTypingEffect } from '@/presentation/hooks/useTypingEffect';
import { 
  HERO_CONTENT, 
  HERO_BADGE, 
  HERO_STATS, 
  HERO_3D_CONFIG,
  HERO_ANIMATION_CONFIG,
  HERO_GRADIENT_OVERLAY
} from '@/shared/constants/hero.constants';

// ✅ Carga dinámica del AvatarScene SOLO en el cliente
const AvatarScene = dynamic(() => import('../../3d/AvatarScene'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark/90 to-dark-lighter/90">
      <div className="text-light/60 animate-pulse">Cargando avatar 3D...</div>
    </div>
  )
});

export const HeroSection = () => {
  const scrollProgress = useScrollProgress();
  const [isMounted, setIsMounted] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Efecto de typing para el título
  const { displayText: typedTitle, isComplete: titleComplete } = useTypingEffect({
    text: HERO_CONTENT.title,
    speed: 80,
    delay: 500,
  });

  useEffect(() => {
    // Asegurar que se monta inmediatamente sin delay
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: HERO_ANIMATION_CONFIG.delay });
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
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Canvas 3D como fondo absoluto - z-0 para estar detrás */}
      {isMounted && (
        <div className="absolute inset-0 w-full h-full z-0 lg:opacity-100 opacity-70">
          <AvatarScene scrollProgress={scrollProgress} avatarUrl={HERO_3D_CONFIG.avatarUrl} />
        </div>
      )}

      {/* Overlay de gradiente para legibilidad del texto - z-5 */}
      {/* Móvil: degradado radial centrado con efecto de profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.85)_100%)] lg:bg-gradient-to-r lg:from-dark/95 lg:via-dark/70 lg:to-transparent z-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80 lg:hidden z-5" />
      
      {/* Contenido sobre el canvas - z-10 para estar encima */}
      <div className="container-custom relative z-10 py-20 sm:py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Columna izquierda - Texto */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge animado */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs sm:text-sm font-medium backdrop-blur-sm">
                {HERO_BADGE.icon} {HERO_BADGE.text}
              </span>
            </div>

            {/* Título principal con efecto typing */}
            <div className="space-y-3 sm:space-y-4">
              <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">
                  {typedTitle}
                  {!titleComplete && (
                    <span className="inline-block w-1 h-[0.8em] ml-1 bg-primary animate-pulse"></span>
                  )}
                </span>
              </h1>
              <h2 ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text leading-snug">
                {HERO_CONTENT.subtitle}
              </h2>
            </div>

            {/* Descripción */}
            <p ref={descriptionRef} className="text-base sm:text-lg text-light/70 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {HERO_CONTENT.description}
            </p>

            {/* CTAs - Modernos y con jerarquía clara */}
            <div ref={buttonsRef} className="flex flex-col lg:flex-row flex-wrap gap-4 sm:gap-5 items-center lg:items-start">
              {/* CTA Primario - Máxima jerarquía con efectos visuales */}
              <a
                href={HERO_CONTENT.primaryCTA.href}
                className="group relative w-full lg:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-primary to-primary-dark rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-primary/60 hover:scale-105 text-base sm:text-lg overflow-hidden"
              >
                {/* Efecto de brillo animado */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                
                {/* Contenido del botón */}
                <span className="relative z-10 flex items-center gap-3">
                  {HERO_CONTENT.primaryCTA.text}
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-xl bg-primary/30 blur-xl group-hover:bg-primary/50 transition-all duration-300 -z-10"></span>
              </a>

              {/* CTA Secundario - Diseño glassmorphism */}
              <a
                href={HERO_CONTENT.secondaryCTA.href}
                className="group relative w-full lg:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-primary/60 rounded-xl font-semibold text-white hover:text-primary transition-all duration-300 backdrop-blur-md text-center text-base sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {HERO_CONTENT.secondaryCTA.text}
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" 
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
                <div 
                  key={index} 
                  className="group relative flex-1 min-w-[100px] sm:min-w-[140px] lg:min-w-[160px] p-3 sm:p-5 lg:p-6 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-primary/40 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                >
                  {/* Efecto de brillo en esquina */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-light/70 group-hover:text-light/90 font-medium transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Borde animado inferior */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-primary-light group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Espacio para el avatar (ya está en el fondo) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
