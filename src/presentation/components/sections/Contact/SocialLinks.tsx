"use client";

import { useEffect, useRef } from "react";
import {
  SOCIAL_LINKS,
  CONTACT_INFO,
} from "@/shared/constants/contact.constants";
import SocialIcon from "@/presentation/components/common/SocialIcon/SocialIcon";

export default function SocialLinks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
        if (linksRef.current.length > 0) {
          gsap.set(linksRef.current, { opacity: 1, y: 0 });

          gsap.from(linksRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      }, containerRef);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Info Cards */}
      <div className="space-y-4">
        <div className="surface-card card-interactive rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-[color:var(--text-muted)] mb-2">
            Email
          </h4>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-lg text-primary hover:underline"
          >
            {CONTACT_INFO.email}
          </a>
        </div>

        <div className="surface-card card-interactive rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-[color:var(--text-muted)] mb-2">
            Ubicación
          </h4>
          <p className="text-lg text-white">{CONTACT_INFO.location}</p>
        </div>

        <div className="surface-card card-interactive rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-[color:var(--text-muted)] mb-2">
            Disponibilidad
          </h4>
          <p className="text-lg text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {CONTACT_INFO.availability}
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="section-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
          Conéctate Conmigo
        </h4>
        <div className="flex flex-col gap-4">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.id}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card card-interactive opacity-100 group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Animated gradient background on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    social.id === "linkedin"
                      ? "linear-gradient(135deg, rgba(125,211,252,0.15) 0%, rgba(125,211,252,0.05) 100%)"
                      : "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)",
                }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  {/* Icon container with custom color */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor:
                        social.id === "linkedin"
                          ? "rgba(125,211,252,0.15)"
                          : "rgba(245,158,11,0.15)",
                      boxShadow:
                        social.id === "linkedin"
                          ? "0 0 20px rgba(125,211,252,0.22)"
                          : "0 0 20px rgba(245,158,11,0.22)",
                    }}
                  >
                    <SocialIcon
                      name={social.icon}
                      className="w-7 h-7 transition-all duration-300"
                      style={{
                        color: social.id === "linkedin" ? "#0A66C2" : "#8b5cf6",
                        filter: "drop-shadow(0 0 8px currentColor)",
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-lg transition-all duration-300">
                        {social.name}
                      </span>
                      {/* Badge */}
                      <span
                        className="badge opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundColor:
                            social.id === "linkedin"
                              ? "rgba(125,211,252,0.18)"
                              : "rgba(245,158,11,0.18)",
                          color:
                            social.id === "linkedin" ? "#7dd3fc" : "#fbbf24",
                        }}
                      >
                        Activo
                      </span>
                    </div>
                    <p className="text-[color:var(--text-muted)] text-sm font-medium transition-colors duration-300 group-hover:text-white">
                      {social.id === "linkedin"
                        ? "🚀 Ver perfil profesional"
                        : "💻 Ver proyectos y código"}
                    </p>
                  </div>
                </div>

                {/* Arrow with circle background */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-[color:var(--text-muted)] group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Download CV Button */}
      <a
        href={CONTACT_INFO.cvUrl}
        download
        className="surface-card card-interactive group relative block overflow-hidden rounded-2xl p-6"
      >
        {/* Animated gradient background on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)",
          }}
        />

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            {/* Icon container with accent color */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                backgroundColor: "rgba(255,193,7,0.15)",
                boxShadow: "0 0 20px rgba(255,193,7,0.3)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-7 h-7 transition-all duration-300"
                style={{
                  color: "#ffc107",
                  filter: "drop-shadow(0 0 8px currentColor)",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold text-lg transition-all duration-300">
                  Descargar CV
                </span>
                {/* Badge */}
                <span
                  className="badge opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.18)",
                    color: "#fbbf24",
                  }}
                >
                  PDF
                </span>
              </div>
              <p className="text-[color:var(--text-muted)] text-sm font-medium transition-colors duration-300 group-hover:text-white">
                📄 Curriculum vitae actualizado
              </p>
            </div>
          </div>

          {/* Arrow with circle background */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-[color:var(--text-muted)] group-hover:text-white transition-all duration-300 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}
