'use client';

import { useEffect } from 'react';

export const useScrollAnimations = () => {
  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      (async () => {
        const gsapMod = await import('gsap');
        const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
        const scrollMod = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
        if (mounted) {
          gsap.registerPlugin(ScrollTrigger);
          if (typeof ScrollTrigger.refresh === 'function') ScrollTrigger.refresh();
        }
      })();
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);
};
