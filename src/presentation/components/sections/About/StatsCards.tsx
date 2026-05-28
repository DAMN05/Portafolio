"use client";

import { useEffect, useRef, useState } from "react";
import { Stat } from "@/shared/types/about.types";

interface StatsCardsProps {
  stats: Stat[];
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(stat.value);
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const scrollMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger =
        scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            setCount(Math.round(counter.val));
          },
        });
      }, cardRef);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, [stat.value, index]);

  return (
    <div
      ref={cardRef}
      className="surface-card card-interactive rounded-2xl p-6 sm:p-8 text-center"
    >
      <div className="section-heading text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-[color:var(--text-muted)] text-xs sm:text-sm md:text-base">
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
