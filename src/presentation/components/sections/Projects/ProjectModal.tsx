"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Project } from "@/shared/types/projects.types";
import Image from "next/image";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleClose = useCallback(() => {
    if (modalRef.current && overlayRef.current) {
      (async () => {
        const gsapMod = await import("gsap");
        const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
        const tl = gsap.timeline();
        tl.to(modalRef.current, {
          y: 30,
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
            onComplete: onClose,
          },
          "-=0.1",
        );
      })();
    }
  }, [onClose]);

  useEffect(() => {
    let tl: GSAPTimeline | undefined;
    if (isOpen && modalRef.current && overlayRef.current) {
      previousActiveElementRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      document.body.style.overflow = "hidden";

      (async () => {
        const gsapMod = await import("gsap");
        const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
        tl = gsap.timeline();
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }).from(
          modalRef.current,
          {
            y: 50,
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.15",
        );

        requestAnimationFrame(() => {
          closeButtonRef.current?.focus();
        });
      })();
    } else {
      document.body.style.overflow = "unset";
      setActiveImageIndex(0);
    }

    return () => {
      document.body.style.overflow = "unset";
      if (tl && typeof tl.kill === "function") tl.kill();
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose, isOpen]);

  if (!isOpen || !project) return null;

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.thumbnail];

  // Formatea el rango de fechas de `completedAt` (inicio → fin)
  const formattedCompletedAt = (() => {
    const raw = project.completedAt;
    if (!raw) return "";

    const normalize = (d: string) => d.trim().replace(/\.+$/g, "");
    const toDate = (d: string) => {
      const clean = normalize(d);
      const ym = /^\d{4}-\d{2}$/;
      const date = ym.test(clean) ? new Date(clean + "-01") : new Date(clean);
      return isNaN(date.getTime()) ? null : date;
    };

    const dates = Array.isArray(raw)
      ? (raw.map(toDate).filter(Boolean) as Date[])
      : ([toDate(String(raw))].filter(Boolean) as Date[]);

    if (dates.length === 0) return "";
    dates.sort((a, b) => a.getTime() - b.getTime());

    const fmt = (d: Date) =>
      d.toLocaleDateString("es-ES", { year: "numeric", month: "long" });
    if (dates.length === 1) return fmt(dates[0]);
    return `${fmt(dates[0])} — ${fmt(dates[dates.length - 1])}`;
  })();

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(6,10,18,0.92)] backdrop-blur-xl opacity-0"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="surface-card relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          type="button"
          className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[rgba(6,10,18,0.9)] transition-all duration-300 group hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
          aria-label="Cerrar modal"
        >
          <svg
            className="w-6 h-6 text-light group-hover:text-white transition-colors"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Image Gallery */}
          <div className="relative w-full h-80 md:h-96 bg-gradient-to-br from-primary/10 via-secondary/5 to-dark overflow-hidden">
            {project.featured && (
              <div className="absolute top-6 left-6 z-10">
                <span className="badge badge-accent text-sm font-bold flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Destacado
                </span>
              </div>
            )}

            {/* Main Image Display */}
            <div className="relative w-full h-full">
              <Image
                src={images[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={activeImageIndex === 0}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-dark/80 hover:bg-primary border border-light/10 hover:border-primary rounded-full transition-all duration-300 group"
                  aria-label="Imagen anterior"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-light group-hover:text-white transition-colors"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-dark/80 hover:bg-primary border border-light/10 hover:border-primary rounded-full transition-all duration-300 group"
                  aria-label="Imagen siguiente"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-light group-hover:text-white transition-colors"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeImageIndex
                        ? "w-8 bg-primary"
                        : "bg-light/30 hover:bg-light/50"
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Title */}
            <h2
              id="project-modal-title"
              className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-light via-primary to-secondary bg-clip-text text-transparent"
            >
              {project.title}
            </h2>

            {/* Category & Date */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="badge badge-accent flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V6H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
                {project.category}
              </span>
              <span className="badge flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedCompletedAt}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="section-heading text-xl font-bold mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Descripción
              </h3>
              <p className="section-subtitle text-base md:text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="section-heading text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Características Destacadas
                </h3>
                <div className="grid gap-3">
                  {project.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[color:var(--text-muted)]">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="section-heading text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Stack Tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="badge badge-accent cursor-default text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-light/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-center rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver Demo en Vivo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 border-2 border-primary hover:bg-primary/10 text-primary text-center rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ver en GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--primary), var(--secondary));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}
