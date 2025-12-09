'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    console.log('🎬 Scroll animations hook inicializado');
    
    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      // Refresh ScrollTrigger después de que el contenido cargue
      ScrollTrigger.refresh();
      console.log('✅ ScrollTrigger refreshed');
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
};
