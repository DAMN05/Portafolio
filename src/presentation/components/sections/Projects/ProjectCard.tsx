"use client";

import { useEffect, useRef } from "react";
import { Project } from "@/shared/types/projects.types";
import Image from "next/image";

const CATEGORY_LABELS: Record<Project["category"], string> = {
  all: "Todos",
  "3d": "3D",
  fullstack: "Full Stack",
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  onOpenModal,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (cardRef.current) {
        cardRef.current.style.opacity = "1";
        cardRef.current.style.transform = "none";
      }
      return;
    }
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
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }, cardRef);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="surface-card card-interactive group relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-[1.75rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,rgba(125,211,252,0.16),rgba(245,158,11,0.08))]">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span className="badge">{CATEGORY_LABELS[project.category]}</span>
          {project.featured && (
            <span className="badge badge-accent">Destacado</span>
          )}
        </div>

        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full items-end p-4">
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              aria-haspopup="dialog"
              aria-label={`Ver detalles de ${project.title}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              Ver detalles
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-2">
          <h3
            id={`project-${project.id}-title`}
            className="section-heading text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]"
          >
            {project.title}
          </h3>

          <p className="text-sm leading-6 text-[color:var(--text-muted)] line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span key={i} className="badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn btn-primary w-full text-center"
              aria-label={`Abrir demo de ${project.title}`}
            >
              Demo
            </a>
          ) : (
            <button
              disabled
              className="btn btn-ghost w-full cursor-not-allowed opacity-50"
            >
              Demo
            </button>
          )}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn btn-secondary w-full text-center"
              aria-label={`Abrir repositorio de ${project.title}`}
            >
              GitHub
            </a>
          ) : (
            <button
              disabled
              className="btn btn-ghost w-full cursor-not-allowed opacity-50"
            >
              GitHub
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
