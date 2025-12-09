// src/presentation/components/sections/About/StatsCards.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stat } from '@/shared/types/about.types';

gsap.registerPlugin(ScrollTrigger);

interface StatsCardsProps {
  stats: Stat[];
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(stat.value);
    
    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Counter animado
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: function() {
          setCount(Math.round(this.targets()[0].val));
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [stat.value, index]);

  return (
    <div
      ref={cardRef}
      className="animate-card glass rounded-xl p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-light-darker text-xs sm:text-sm md:text-base">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
      {stats.map((stat, index) => (
        <StatCard key={stat.id} stat={stat} index={index} />
      ))}
    </div>
  );
}