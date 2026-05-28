"use client";

import { useEffect, useRef, useState } from "react";
import { Experience } from "@/shared/types/about.types";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

function TimelineItem({
  experience,
  index,
  isLast,
}: {
  experience: Experience;
  index: number;
  isLast: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const achievementsId = `experience-${experience.id}-achievements`;
  const technologiesId = `experience-${experience.id}-technologies`;

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const scrollMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger =
        scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(itemRef.current, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(dotRef.current, {
          scale: 0,
          duration: 0.4,
          delay: 0.3,
          scrollTrigger: {
            trigger: dotRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (!isLast && lineRef.current) {
          gsap.from(lineRef.current, {
            scaleY: 0,
            duration: 0.6,
            delay: 0.4,
            transformOrigin: "top",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }, itemRef);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, [index, isLast]);

  const formatDate = (date?: string) => {
    if (!date) return "";
    const normalize = (d: string) => d.trim().replace(/\.+$/g, "");
    const toDate = (d: string) => {
      const clean = normalize(d);
      const ym = /^\d{4}-\d{2}$/;
      const parsed = ym.test(clean) ? new Date(clean + "-01") : new Date(clean);
      return isNaN(parsed.getTime()) ? null : parsed;
    };
    const parsed = toDate(date);
    if (!parsed) return "";
    return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "short" });
  };

  return (
    <div className="relative">
      {/* Dot y Línea - Mobile: izquierda, Desktop: centro */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
        <div
          ref={dotRef}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
            experience.isCurrent ? "bg-primary" : "bg-secondary"
          } z-10 ring-4 ring-[rgba(6,10,18,0.9)]`}
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
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Espaciado para mobile */}
        <div className="w-12 md:hidden" />

        {/* Card container - Siempre alineado a la izquierda */}
        <div
          className={`
          flex-1 md:w-5/12 md:flex-none
          ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}
        `}
        >
          <div className="surface-card card-interactive rounded-2xl p-5 sm:p-6">
            {/* Header con título y badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h4 className="section-heading text-lg sm:text-xl font-bold text-white flex-1">
                {experience.title}
              </h4>
              {experience.isCurrent && (
                <span className="badge badge-accent text-xs">✨ Actual</span>
              )}
            </div>

            {/* Empresa, ubicación y fechas en una línea */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[color:var(--text-muted)] mb-4">
              <span className="text-primary font-semibold">
                {experience.company}
              </span>
              {experience.location && (
                <>
                  <span>•</span>
                  <span>📍 {experience.location}</span>
                </>
              )}
              <span>•</span>
              <span>
                📅 {formatDate(experience.startDate)} - {" "}
                {experience.isCurrent
                  ? "Presente"
                  : experience.endDate
                  ? formatDate(experience.endDate)
                  : ""}
              </span>
            </div>

            {/* Descripción - más corta y concisa */}
            <p className="text-[color:var(--text-muted)] mb-4 text-sm sm:text-base leading-relaxed">
              {experience.description}
            </p>

            {/* Highlights - solo los primeros 3 para no saturar */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex flex-wrap gap-2">
                  {experience.highlights.slice(0, 4).map((highlight, i) => (
                    <span
                      key={i}
                      className="text-xs text-[color:var(--text-muted)] flex items-center gap-1.5"
                    >
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
                <h5 className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                  Responsabilidades clave
                </h5>
                <ul
                  id={achievementsId}
                  className="text-xs sm:text-sm text-[color:var(--text-muted)] space-y-1.5"
                >
                  {(showAllAchievements
                    ? experience.achievements
                    : experience.achievements.slice(0, 3)
                  ).map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">
                        ▸
                      </span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
                {experience.achievements.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllAchievements(!showAllAchievements)}
                    aria-expanded={showAllAchievements}
                    aria-controls={achievementsId}
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
                        <span>
                          Ver {experience.achievements.length - 3} más
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Tecnologías - Expandible */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div>
                <div id={technologiesId} className="flex flex-wrap gap-1.5">
                  {(showAllTechnologies
                    ? experience.technologies
                    : experience.technologies.slice(0, 6)
                  ).map((tech, i) => (
                    <span key={i} className="badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                {experience.technologies.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                    aria-expanded={showAllTechnologies}
                    aria-controls={technologiesId}
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
                        <span>
                          Ver {experience.technologies.length - 6} tecnologías
                          más
                        </span>
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

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const scrollMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger =
        scrollMod.ScrollTrigger || scrollMod.default || scrollMod;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }, titleRef);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h3
        ref={titleRef}
        className="section-title text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
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
